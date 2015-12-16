/** @jsx React.DOM */
"use strict";

let prettyMs = require('pretty-ms');

let React           = require('react');
let ListGroupItem   = React.createFactory(require('react-bootstrap').ListGroupItem);
let Row             = React.createFactory(require('react-bootstrap').Row);
let Col             = React.createFactory(require('react-bootstrap').Col);

let TorrentTitleRow = React.createFactory(require("./TorrentTitleRow.react.js"));
let TorrentStats    = React.createFactory(require("./TorrentStats.react.js"));
let TorrentControls = React.createFactory(require("./TorrentControls.react.js"));

let ReactPropTypes = React.PropTypes;

let TorrentListItem = React.createClass({
  propTypes: {
    torrent: ReactPropTypes.object
  },
  render: function() {
    let torrent     = this.props.torrent;
    return (
      <ListGroupItem bsStyle="success">
        <Row>
          <Col md={11}>
            <TorrentTitleRow
              torrent={this.props.torrent}
            />
            <TorrentStats
              torrent={this.props.torrent}
            />
          </Col>
          <Col md={1}>
            <TorrentControls
              torrent={this.props.torrent}
            />
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
});

module.exports = TorrentListItem;
