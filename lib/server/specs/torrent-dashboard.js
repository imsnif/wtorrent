"use strict";

module.exports = {
  $exports: { $ref: "dashboard" },
  Download: {
    create: {
      module: "./lib/server/components/download",
      args: [ 
        { $ref: "Zip" }, 
        { $ref: "config" },
        { $ref: "torrentClient" } 
      ]
    }
  },
  torrentClient: {
    create: {
      module: "webtorrent"
    }
  },
  dashboard: {
    create: {
      module: "./lib/server/components/dashboard",
      args: [{
        Download: { $ref: "Download" },
        client: { $ref: "torrentClient" }
      }]
    }
  }
};
