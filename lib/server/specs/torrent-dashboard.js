"use strict";

export default {
  $exports: { $ref: "dashboard" },
  Download: {
    create: {
      module: path.join(`${__dirname}/../components/download`),
      args: [ 
        { $ref: "Zip" }, 
        { $ref: "config" },
        { $ref: "torrentClient" } 
      ],
    }
  },
  torrentClient: {
    create: {
      module: "webtorrent",
      isConstructor: true
    }
  },
  dashboard: {
    create: {
      module: dashboardPath,
      args: [{
        Download: { $ref: "Download" },
        client: { $ref: "torrentClient" }
      }],
      isConstructor: true
    }
  }
};
