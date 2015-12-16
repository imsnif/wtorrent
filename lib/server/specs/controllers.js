"use strict";

module.exports = {
  download: {
    create: {
      module: "../controllers/download",
      args: [ { $ref: "dashboard" } ]
    }
  },
  client: {
    create: {
      module: "../controllers/client",
      args: [ { $ref: "dashboard" } ]
    }
  }
};
