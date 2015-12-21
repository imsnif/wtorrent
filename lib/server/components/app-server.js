"use strict";

import { EventEmitter } from 'events';
import express    from 'express';
import exphbs     from 'express-handlebars';
import http       from 'http';
import bodyParser from 'body-parser';
import io         from 'socket.io';

export default class AppServer extends EventEmitter {
  constructor (router, dashboard, config) {
    super()
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
  init () {
    let server = http.createServer(this.app).listen(this.config.port, () => {
      console.log(`Wtorrent listening on port ${this.config.port}`);
    });
    this.io = io.listen(server);
    this.dashboard.on("torrent", this.io.emit.bind(this.io, "torrent"));
    this.dashboard.on("update", this.io.emit.bind(this.io, "client"));
  }
}
