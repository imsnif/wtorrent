/** @jsx React.DOM */
"use strict";

let React = require('react');
let XEditable = React.createFactory(require('react-xeditable').EditableTextField);

let ClientActionCreators = require('../actions/ClientActionCreators');

let Throttle = React.createClass({
  render: function() {
    let uploadSpeed   = this._displayThrottle(this.props.uploadThrottle);
    let downloadSpeed = this._displayThrottle(this.props.downloadThrottle);
    return (
      <span>
        <span>Throttle (U/D): </span>
        <XEditable id="uploadThrottle" 
          value={uploadSpeed} 
          onUpdate={this._updateUpload} 
          name="upload" /> 
        <span> / </span>
        <XEditable id="downloadThrottle" 
          value={downloadSpeed} 
          onUpdate={this._updateDownload} 
          name="download" /> 
        <span> KBps </span>
      </span>
    );
  },
  _updateUpload: function(value) {
    ClientActionCreators.updateThrottleUpload(value)
  },
  _updateDownload: function(value) {
    ClientActionCreators.updateThrottleDownload(value)
  },
  _displayThrottle: function (value) {
    if (!Number(value)) return value
    return Math.floor(value / 1000)
  }
});

module.exports = Throttle;
