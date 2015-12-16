"use strict";

let wire = require("wire");

wire({
  config: {
    storagePath: "/var/wtorrent",
    port: process.env.PORT || 8080,
    staticRoute: `${__dirname}/public`
  },
  $imports: [
    './lib/server/specs/torrent-dashboard',
    './lib/server/specs/utils',
    './lib/server/specs/api-server'
  ],
}, {require})
