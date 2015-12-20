"use strict";

import express from 'express';

export default class Router extends Object {
  constructor(controllers, config) {
    super()
    this.router = express.Router()
    this.router.get("/", function (req, res) {
      res.render('home')
    })
    Object.keys(controllers).forEach((name) => {
      this._addController(name, controllers[name])
    })
    this.router.use("/", express.static(config.staticRoute))
    return this.router
  }
  _addController (name, controller) {
    Object.keys(controller).forEach((path) => {
      this._addRoute(name, path, controller[path])
    })
  }
  _addRoute (name, path, route) {
    let method = route.method
    let action = route.action
    this.router[method](`/${name}${path}`, action);
  }
}
