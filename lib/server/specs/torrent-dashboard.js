"use strict";

import path from "path";
let dashboardPath = path.join(`${__dirname}/../components/dashboard`) + ".js";
console.log("dpath is:", dashboardPath)

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
