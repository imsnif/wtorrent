"use strict";

module.exports = {
  Zip: {
    create: {
      module: "./utils/zip",
      args: [ { $ref: "config" } ]
    }
  }
};
