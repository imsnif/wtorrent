"use strict";

module.exports = {
  controllers: {
    wire: './lib/server/specs/controllers'
  },
  router: {
    create: {
      module: "./lib/server/components/router",
      args: [ 
        { $ref: "controllers" }, 
        { $ref: "config" }
      ]
    }
  },
  appServer: {
    create: {
      module: "./lib/server/components/app-server",
      args: [
        { $ref: "router" },
        { $ref: "dashboard" },
        { $ref: "config" }
      ]
    },
    init: "init"
  }
};
