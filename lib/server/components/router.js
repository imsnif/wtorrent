"use strict";

let express = require('express');

function Router (controllers, config) {
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

Router.prototype._addController = function _addController (name, controller) {
  Object.keys(controller).forEach((path) => {
    this._addRoute(name, path, controller[path])
  })
}

Router.prototype._addRoute = function _addRoute (name, path, route) {
  let method = route.method
  let action = route.action
  this.router[method](`/${name}${path}`, action);
};

module.exports = Router;
