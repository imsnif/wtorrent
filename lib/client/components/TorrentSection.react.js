/** @jsx React.DOM */
"use strict";

let React           = require('react');

let TorrentStore    = require('../stores/TorrentStore');

let ListGroup       = React.createFactory(require('react-bootstrap').ListGroup);
let TorrentListItem = React.createFactory(require('./TorrentListItem.react.js'));

function getStateFromStores() {
  return {
    torrents: TorrentStore.getAll()
  };
}

function getTorrentListItems(torrent) {
  return <TorrentListItem
      key={torrent.id}
      torrent={torrent}
    />
}

let TorrentSection = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    TorrentStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TorrentStore.removeChangeListener(this._onChange);
  },

  render: function() {
    let torrentListItems = Object.values(this.state.torrents).map(getTorrentListItems);
    return (
      <ListGroup>
        {torrentListItems}
      </ListGroup>
    );
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = TorrentSection;
