"use strict";

export default{
  download: {
    create: {
      module: `${__dirname}/controllers/download`,
      args: [ { $ref: "dashboard" } ],
      isConstructor: true
    }
  },
  client: {
    create: {
      module: `${__dirname}/controllers/client`,
      args: [ { $ref: "dashboard" } ],
      isConstructor: true
    }
  }
};
