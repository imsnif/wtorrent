"use strict";

let TorrentAppDispatcher = require('../dispatcher/TorrentAppDispatcher');
let TorrentConstants     = require('../constants/TorrentConstants');

let clientApi = require('../utils/client-api.js')

let ActionTypes = TorrentConstants.ActionTypes;

module.exports = {

  updateThrottleUpload: function (value) {
    if (value !== "undefined") {
      clientApi.throttleUpload(value)
    }
  },
  updateThrottleDownload: function (value) {
    if (value !== "undefined") {
      clientApi.throttleDownload(value)
    }
  },
  updateClient: function(data) {
    TorrentAppDispatcher.dispatch({
      type: ActionTypes.UPDATE_CLIENT,
      data 
    })
  }
};
