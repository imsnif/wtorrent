"use strict";

import express from 'express';
import download from '../controllers/download';
import client from '../controllers/client'; 

export default class Router extends Object {
  constructor(config, controllers) { //TODO: find a better solution
    super()
    this.router = express.Router()
    this.router.get("/", function (req, res) {
      res.render('home')
    })
    Object.keys(controllers).forEach((name) => {
      _addController.call(this, name, controllers[name].routes)
    })
    this.router.use("/", express.static(config.staticRoute))
    return this.router
  }
}

function _addController (name, controller) {
  Object.keys(controller).forEach((path) => {
    _addRoute.call(this, name, path, controller[path])
  })
}

function _addRoute (name, path, route) {
  let method = route.method
  let action = route.action
  this.router[method](`/${name}${path}`, action);
}
