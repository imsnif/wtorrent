"use strict";

let wire = require("wire");

wire({
  config: {
    storagePath: "/var/wtorrent",
    port: process.env.PORT || 8080,
    staticRoute: `${process.cwd()}/public`
  },
  $imports: [
    './specs/torrent-dashboard',
    './specs/utils',
    './specs/api-server'
  ],
}, {require})
