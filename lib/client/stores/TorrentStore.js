"use strict";

let TorrentAppDispatcher  = require('../dispatcher/TorrentAppDispatcher')
let TorrentConstants      = require('../constants/TorrentConstants')
let TorrentActionCreators = require('../actions/TorrentActionCreators')
let EventEmitter          = require('events').EventEmitter
let assign                = require('object-assign')
let parseTorrent          = require('parse-torrent')
let socket                = require('../utils/socketConnection')

let ActionTypes  = TorrentConstants.ActionTypes;
let CHANGE_EVENT = 'change';

let _torrents = {};

let TorrentStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
    socket.on('torrent', TorrentActionCreators.updateTorrent.bind(TorrentActionCreators));
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  get: function(id) {
    return _torrents[id];
  },
  getAll: function() {
    return _torrents;
  },
});

TorrentStore.dispatchToken = TorrentAppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.SUBMIT_TORRENT:
      if (action.magnetUri) {
        let torrentData = parseTorrent(action.magnetUri)
        if (!_torrents[torrentData.infoHash]) { // TODO: add indication to the user
          _torrents[torrentData.infoHash] = { 
            status: "pending", 
            timeRemaining: 0,
            progress: 0,
            name: torrentData.dn || "???",
            uploadSpeed: 0,
            downloadSpeed: 0,
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
}.bind(TorrentStore));

module.exports = TorrentStore;
