"use strict";

import TorrentAppDispatcher  from '../dispatcher/TorrentAppDispatcher'
import {ActionTypes }        from '../constants/TorrentConstants'
import TorrentActionCreators from '../actions/TorrentActionCreators'
import { EventEmitter }      from 'events'
import assign                from 'object-assign'
import parseTorrent          from 'parse-torrent'
import socket                from '../utils/socketConnection'

let CHANGE_EVENT = 'change';

let _torrents = {};

function _handleAction (action) {
  switch(action.type) {
    case ActionTypes.SUBMIT_TORRENT:
      if (action.magnetUri) {
        let torrentData = parseTorrent(action.magnetUri)
        if (!_torrents[torrentData.infoHash]) { // TODO: add indication to the user
          _torrents[torrentData.infoHash] = { 
            status: "pending", 
            name: torrentData.dn || "???",
          }
          this.emitChange()
        }
      }
      break;
    case ActionTypes.DELETE_TORRENT:
      _torrents[action.torrentId].status = "pending"
      this.emitChange()
      break;
    case ActionTypes.UPDATE_TORRENT:
      let torrent = action.torrent
      if (torrent) {
        if (torrent.status === "Deleted") {
          delete _torrents[torrent.id];
        } else {
          _torrents[torrent.id] = torrent;
        }
        this.emitChange();
      }
    default:
      // do nothing
  }
}

export default new class TorrentStore extends EventEmitter {
  constructor() {
    super()
    this.dispatchToken = TorrentAppDispatcher.register(_handleAction.bind(this))
  }
  emitChange () {
    this.emit(CHANGE_EVENT);
  }
  addChangeListener (callback) {
    this.on(CHANGE_EVENT, callback);
    socket.on('torrent', TorrentActionCreators.updateTorrent.bind(TorrentActionCreators));
  }
  removeChangeListener (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  get (id) {
    return _torrents[id];
  }
  getAll () {
    return _torrents;
  }
};
