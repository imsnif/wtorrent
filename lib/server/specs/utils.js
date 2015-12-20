"use strict";

export default {
  Zip: {
    create: {
      module: `${__dirname}/utils/zip`,
      args: [ { $ref: "config" } ],
      isConstructor: true
    }
  }
};
