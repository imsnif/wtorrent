"use strict";

let TorrentAppDispatcher = require('../dispatcher/TorrentAppDispatcher');
let TorrentConstants     = require('../constants/TorrentConstants');

let ActionTypes = TorrentConstants.ActionTypes;

module.exports = {

  addTorrentMagnet: function (magnetUri) {
    TorrentAppDispatcher.dispatch({
      type: ActionTypes.SUBMIT_TORRENT,
      magnetUri: magnetUri
    });
    $.ajax({
      url: "/download/add",
      type: "POST",
      data: {magnet_uri: magnetUri}
    })
  },
  deleteTorrent: function (torrentId) {
    TorrentAppDispatcher.dispatch({
      type: ActionTypes.DELETE_TORRENT,
      torrentId 
    });
  },
  updateTorrent: function (torrent) {
    TorrentAppDispatcher.dispatch({
      type: ActionTypes.UPDATE_TORRENT,
      torrent
    })
  },
  updateClient: function(data) {
    TorrentAppDispatcher.dispatch({
      type: ActionTypes.UPDATE_CLIENT,
      data 
    })
  }
};
