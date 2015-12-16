/** @jsx React.DOM */
"use strict";

let React = require('react');
let ReactDOM = require('react-dom');

let TorrentApp = React.createFactory(require('./components/TorrentApp.react'));
window.React = React; // export for http://fb.me/react-devtools

ReactDOM.render(
  <TorrentApp />,
  document.getElementById('react-app')
);
