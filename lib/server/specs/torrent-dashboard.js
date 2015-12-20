"use strict";

module.exports = {
  $exports: { $ref: "dashboard" },
  Download: {
    create: {
      module: "./components/download",
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
      module: "./components/dashboard",
      args: [{
        Download: { $ref: "Download" },
        client: { $ref: "torrentClient" }
      }]
    }
  }
};
