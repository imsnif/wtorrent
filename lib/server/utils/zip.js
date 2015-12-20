"use strict";

import Packer from 'zip-stream';
import fs     from 'fs';
import async  from 'async';
import path   from 'path';

export default function ZipFactory(config) {
  return Zip.bind(Zip, config.storagePath)
}

class Zip extends Object {
  constructor(storagePath, files) {
    super()
    this.basePath = storagePath 
    this.archive  = new Packer()
    this.files    = files
  }
  stream () {
    /**
     * Zip all the files in this archive and return them as a stream
     * 
     * @return {stream}
     */
    async.eachSeries(this.files, (file, next) => {
      fs.readFile(path.join(this.basePath, file.path), (err, fileContents) => {
        this.archive.entry(fileContents, {name: `${file.path}`}, next)
      })
    }, (err) => {
      this.archive.finish()
    });
    return this.archive
  }
}
