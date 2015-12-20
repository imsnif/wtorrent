"use strict";

import TorrentAppDispatcher from '../dispatcher/TorrentAppDispatcher';
import {ActionTypes} from '../constants/TorrentConstants';

export default {
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
    $.ajax({
      url: "download/delete",
      type: "POST",
      data: {torrent_id: torrentId}
    })
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
