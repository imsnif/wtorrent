"use strict";

import TorrentAppDispatcher from '../dispatcher/TorrentAppDispatcher';
import {ActionTypes} from '../constants/TorrentConstants';

import clientApi from '../utils/client-api';

export default {
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
