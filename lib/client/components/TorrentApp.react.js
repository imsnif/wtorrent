/** @jsx React.DOM */
"use strict";

let React          = require('react');

let MagnetSection  = React.createFactory(require('./MagnetSection.react.js'));
let ClientSection  = React.createFactory(require('./ClientSection.react.js'));
let TorrentSection = React.createFactory(require('./TorrentSection.react.js'));

Object.values = function (obj) { return Object.keys(obj).map( function (key) { return obj[key] }) }  

let TorrentApp = React.createClass({

  render: function() {
    return (
      <div className="torrents-app container">
        <MagnetSection/>
        <ClientSection/>
        <TorrentSection/>
      </div>
    );
  }

});

module.exports = TorrentApp;
