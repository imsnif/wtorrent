"use strict";

module.exports = {
  Zip: {
    create: {
      module: "./lib/server/utils/zip",
      args: [ { $ref: "config" } ]
    }
  }
};
