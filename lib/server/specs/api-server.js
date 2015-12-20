"use strict";

export default {
  controllers: {
    wire: `${__dirname}/controllers`
  },
  router: {
    create: {
      module: `${__dirname}/../components/router`,
      args: [ 
        { $ref: "controllers" }, 
        { $ref: "config" }
      ],
      isConstructor: true
    }
  },
  appServer: {
    create: {
      module: `${__dirname}/../components/app-server`,
      args: [
        { $ref: "router" },
        { $ref: "dashboard" },
        { $ref: "config" }
      ],
      isConstructor: true
    },
    init: "init"
  }
};
