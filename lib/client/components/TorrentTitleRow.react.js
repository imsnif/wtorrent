/** @jsx React.DOM */
"use strict";

let prettyMs = require('pretty-ms');

let React          = require('react');
let Row            = React.createFactory(require('react-bootstrap').Row);
let Col            = React.createFactory(require('react-bootstrap').Col);
let ProgressBar    = React.createFactory(require("react-bootstrap").ProgressBar);

let ReactPropTypes = React.PropTypes;

let TorrentTitleRow = React.createClass({
  propTypes: {
    torrent: ReactPropTypes.object
  },
  render: function() {
    let torrent     = this.props.torrent;
    let timeRemaining = prettyMs(Math.round(torrent.timeRemaining), { compact: true });
    let progress = Math.floor(torrent.progress * 100);
    return (
      <Row>
        <Col md={3}>
          <ProgressBar 
            striped
            bsStyle="success"
            now={progress}
            label="%(percent)s%"
          />
        </Col>
        <Col md={6}><strong>{torrent.name}</strong></Col>
        <Col md={3}>Time remaining: {timeRemaining}</Col>
      </Row>
    );
  }
});

module.exports = TorrentTitleRow;
