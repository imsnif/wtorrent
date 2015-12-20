"use strict";

let TorrentAppDispatcher  = require('../dispatcher/TorrentAppDispatcher');
let TorrentConstants      = require('../constants/TorrentConstants');
let ClientActionCreators  = require('../actions/ClientActionCreators')
let EventEmitter          = require('events').EventEmitter;
let assign                = require('object-assign');
let socket                = require('../utils/socketConnection');

let ActionTypes  = TorrentConstants.ActionTypes;
let CHANGE_EVENT = 'change';

let _clientData = {
  downloadSpeed    : 0,
  uploadSpeed      : 0,
  downloadThrottle : 0,
  uploadThrottle   : 0
};

let ClientStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
    socket.on('client', ClientActionCreators.updateClient.bind(ClientActionCreators));
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getData: function(id) {
    return _clientData;
  },
});

ClientStore.dispatchToken = TorrentAppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.UPDATE_CLIENT:
      if (action.data) {
        _clientData = action.data;
        this.emitChange();
      }
    default:
      // do nothing
  }
}.bind(ClientStore));

module.exports = ClientStore;
