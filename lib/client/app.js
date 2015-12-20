"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import TorrentApp from './components/TorrentApp.react';

console.log("React is:", React)
console.log("TorrentApp is:", TorrentApp)
window.React = React; // export for http://fb.me/react-devtools

ReactDOM.render(
  <TorrentApp />,
  document.getElementById('react-app')
);
