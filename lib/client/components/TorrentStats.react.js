/** @jsx React.DOM */
"use strict";

let React           = require('react');
let Row             = React.createFactory(require('react-bootstrap').Row);
let Col             = React.createFactory(require('react-bootstrap').Col);

let ReactPropTypes = React.PropTypes;

let TorrentStats = React.createClass({
  propTypes: {
    torrent: ReactPropTypes.object
  },
  render: function() {
    let torrent     = this.props.torrent;
    let uploadSpeed = torrent.uploadSpeed ? 
      Math.round(torrent.uploadSpeed / 1000) + "KBps" :
      "0KBps"
    let downloadSpeed = torrent.downloadSpeed ? 
      Math.round(torrent.downloadSpeed / 1000) + "KBps" :
      "0KBps"
    let ratio = torrent.uploaded && torrent.downloaded ? 
      (torrent.uploaded / torrent.downloaded).toFixed(2) :
      0
    return (
      <Row>
        <Col md={3}>Download Speed: {downloadSpeed}</Col>
        <Col md={3}>Upload Speed: {uploadSpeed}</Col>
        <Col md={2} mdOffset={3}>Share Ratio: {ratio}</Col>
      </Row>
    );
  }
});

module.exports = TorrentStats;
