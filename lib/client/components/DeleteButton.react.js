/** @jsx React.DOM */
"use strict";

let React = require('react');
let Button = React.createFactory(require('react-bootstrap').Button);
let Glyphicon = React.createFactory(require('react-bootstrap').Glyphicon);

let TorrentActionCreators = require('../actions/TorrentActionCreators');

let DeleteButton = React.createClass({
  render: function() {
    return (
      <span>
        <Button bsStyle="danger" onClick={this._onClick}>
          <Glyphicon glyph="remove" />
        </Button>
      </span>
    );
  },
  _onClick: function() {
    TorrentActionCreators.deleteTorrent(this.props.torrentId);
  }
});

module.exports = DeleteButton;
