"use strict";

let TorrentAppDispatcher = require('../dispatcher/TorrentAppDispatcher');
let TorrentConstants     = require('../constants/TorrentConstants');

let ActionTypes = TorrentConstants.ActionTypes;

module.exports = {

  updateThrottleUpload: function (value) {
    if (value !== "undefined") {
      $.ajax({
        url: "/client/throttleUpload",
        type: "POST",
        data: {value}
      })
    }
  },
  updateThrottleDownload: function (value) {
    if (value !== "undefined") {
      $.ajax({
        url: "/client/throttleDownload",
        type: "POST",
        data: {value}
      })
    }
  },
  updateClient: function(data) {
    TorrentAppDispatcher.dispatch({
      type: ActionTypes.UPDATE_CLIENT,
      data 
    })
  }
};
