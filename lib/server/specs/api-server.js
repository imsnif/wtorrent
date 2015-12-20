"use strict";

module.exports = {
  controllers: {
    wire: './specs/controllers'
  },
  router: {
    create: {
      module: "./components/router",
      args: [ 
        { $ref: "controllers" }, 
        { $ref: "config" }
      ]
    }
  },
  appServer: {
    create: {
      module: "./components/app-server",
      args: [
        { $ref: "router" },
        { $ref: "dashboard" },
        { $ref: "config" }
      ]
    },
    init: "init"
  }
};
