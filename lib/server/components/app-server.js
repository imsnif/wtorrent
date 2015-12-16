"use strict";

let express    = require('express');
let exphbs     = require('express-handlebars');
let http       = require('http');
let bodyParser = require('body-parser');
let io         = require('socket.io');

function AppServer (router, dashboard, config) {
  this.dashboard = dashboard;
  this.app       = express();
  this.config    = config;

  this.app.use(bodyParser.json());
  this.app.use(bodyParser.urlencoded({extended: true}));
  this.app.engine("handlebars", exphbs({defaultLayout: "main"}));
  this.app.set("view engine", "handlebars");
  this.app.disable("etag");

  this.app.use("/", router)
}

AppServer.prototype.init = function init () {
  let server = http.createServer(this.app).listen(this.config.port, () => {
    console.log(`Wtorrent listening on port ${this.config.port}`);
  });
  this.io = io.listen(server);
  this.dashboard.on("torrent", this.io.emit.bind(this.io, "torrent"));
  this.dashboard.on("update", this.io.emit.bind(this.io, "client"));
}

module.exports = AppServer;
