"use strict";

import wire from "wire";

wire({
  config: {
    storagePath: "/var/wtorrent",
    port: process.env.PORT || 8080,
    staticRoute: `${process.cwd()}/public`
  },
  $imports: [
    `${__dirname}/specs/torrent-dashboard`,
    `${__dirname}/specs/utils`,
    `${__dirname}/specs/api-server`
  ],
  $plugins: [
    { module: 'wire/debug', trace: true }
  ]
}, {require})
