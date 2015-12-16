/** @jsx React.DOM */
"use strict";

let React = require('react');

let TransferRate = React.createClass({
  render: function() {
    let uploadSpeed   = Math.round(this.props.uploadSpeed / 1000);
    let downloadSpeed = Math.round(this.props.downloadSpeed / 1000);
    return (
      <span>
        Rate (U/D): {uploadSpeed} / {downloadSpeed} KBps
      </span>
    );
  }
});

module.exports = TransferRate;
