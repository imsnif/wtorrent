"use strict";

let EventEmitter = require('events').EventEmitter;
let util         = require('util');
let fs           = require('fs');
let path         = require('path');
let rmdir        = require('rmdir');

function DownloadFactory(Zip, config, client) {
  let storagePath = config.storagePath
  return Download.bind(Download, {Zip, storagePath, client});
}

function Download (opts, magnetUri) {
  this.Zip         = opts.Zip
  this.storagePath = opts.storagePath
  this.client      = opts.client
  this.magnetUri   = magnetUri
  this.state = {
    status: "Initializing"
  }
}

util.inherits(Download, EventEmitter);

/**
 * Start the download, update and report its state, subscribe to state changes
 * and set a report timer.
 *
 * @param  {Function} cb
 */
Download.prototype.start = function start (cb) {
  this.client.add(this.magnetUri, {path: this.storagePath}, (torrent) => {
    this.torrent = torrent
    this._updateState.call(this, torrent, "Downloading")
    this._report.call(this)
    this.torrent.on("download", this._updateState.bind(this, torrent, false))
    this.torrent.on("upload", this._updateState.bind(this, torrent, false))
    this.torrent.on("done", this._updateState.bind(this, torrent, "Done"))
    this.reportTimer = setInterval(this._report.bind(this), 1000)
    cb()
  });
}

/**
 * Streams the contents of the torrent as a zip file
 * @return {stream} 
 */
Download.prototype.stream = function stream () {
  if (this.state.status !== "Done") throw("Download not ready!")
  let zippedDownload = new this.Zip(this.torrent.files);
  return zippedDownload.stream();
}

/**
 * Destroy the download, clear the report timer, remove the file contents
 * saved to the disk and remove all listeners
 * 
 * @param  {Function} cb
 */
Download.prototype.destroy = function remove (cb) {
  this.client.remove(this.state.id, () => {
    this._updateState(null, "Deleted")
    clearInterval(this.reportTimer)
    rmdir(path.join(this.storagePath, this.torrent.name), () => {
      this._report.call(this)
      this.removeAllListeners()
      cb()
    })
  })
}

/**
 * Update the download state, updatedStatus should be false if it is not updated
 * 
 * @param  {Torrent} updatedTorrent
 * @param  {string} updatedTorrent
 */
Download.prototype._updateState = function _updateState (updatedTorrent, updatedStatus) {
  let torrent = updatedTorrent || this.torrent
  let status = updatedStatus || this.state.status
  this.state = {
      name          : torrent.name,
      id            : torrent.infoHash,
      progress      : torrent.progress,
      downloaded    : torrent.downloaded,
      uploaded      : torrent.uploaded,
      downloadSpeed : torrent.downloadSpeed(),
      uploadSpeed   : torrent.uploadSpeed(),
      timeRemaining : torrent.timeRemaining,
      status
  }
}

Download.prototype._report = function _report () {
  this.emit("update", this.state)
}

module.exports = DownloadFactory;
