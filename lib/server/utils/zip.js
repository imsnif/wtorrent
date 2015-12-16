"use strict";

let Packer = require("zip-stream")
let fs     = require("fs")
let async  = require("async")
let path   = require("path")

function ZipFactory(config) {
  return Zip.bind(Zip, config.storagePath)
}

function Zip(storagePath, files) {
  this.basePath = storagePath 
  this.archive  = new Packer()
  this.files    = files
}

/**
 * Zip all the files in this archive and return them as a stream
 * 
 * @return {stream}
 */
Zip.prototype.stream = function stream () {
  async.eachSeries(this.files, (file, next) => {
    fs.readFile(path.join(this.basePath, file.path), (err, fileContents) => {
      this.archive.entry(fileContents, {name: `${file.path}`}, next)
    })
  }, (err) => {
    this.archive.finish()
  });
  return this.archive
}

module.exports = ZipFactory
