"use strict";

// TODO: move elsewhere
export default class Config extends Object {
  constructor (){
    super()
    this.storagePath = "/var/wtorrent",
    this.port = process.env.PORT || 8080,
    this.staticRoute = `${process.cwd()}/public`
  }
}
