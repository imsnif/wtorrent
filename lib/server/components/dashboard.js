"use strict";

let EventEmitter = require('events').EventEmitter
let util         = require('util')
let parseTorrent = require('parse-torrent')
let async        = require('async')

function Dashboard (opts) {
  this.Download    = opts.Download
  this.client      = opts.client
  this._downloads  = {} // { <torrentId>: <Download Object> }
  this.reportTimer = setInterval(this._report.bind(this), 1000)
}

util.inherits(Dashboard, EventEmitter);

/**
 * Adds a download to the dashboard and starts it 
 *
 * @param {string} magnetUri
 * @param {function} cb
 */
Dashboard.prototype.add = function add (magnetUri, cb) { //Add download to dashboard and start it
  try { parseTorrent(magnetUri) } catch(err) { return cb(err) } // Verify magnet URI
  let dl = new this.Download(magnetUri);
  dl.on("update", this.emit.bind(this, "torrent"));
  dl.start(() => {
    this._downloads[dl.state.id] = dl;
    cb();
  });
}

/**
 * Remove download from dashboard
 *
 * @param {string} torrentId
 * @param {function} cb
 */
Dashboard.prototype.remove = function remove (torrentId, cb) {
  let dl = this._downloads[torrentId];
  if (!dl) return setImmediate(cb)
  dl.destroy((err) => {
    delete this._downloads[torrentId];
    cb(err)
  });
}

/**
 * Get the download object or undefined if not present
 *
 * @param {string} torrentId
 * @param {function} cb
 */
Dashboard.prototype.get = function get (torrentId) {
  return this._downloads[torrentId];
}

/**
 * Throttle the global upload limit in KB
 *
 * @param {number} value
 */
Dashboard.prototype.throttleUpload = function throttleUpload (value) { // Value in KB
  if (!Number(value)) return
  this.client.throttleUpload(value * 1000);
}

/**
 * Throttle the global download limit in KB
 *
 * @param {number} value
 */
Dashboard.prototype.throttleDownload = function throttleDownload (value) { // Value in KB
  this.client.throttleDownload(value * 1000);
}

/**
 * Destroy dashboard object and all downloads associated with it
 *
 * @param {Function} cb
 */
Dashboard.prototype.destroy = function destroy (cb) {
  async.forEach(Object.keys(this._downloads), function(id, next) {
    this_.downloads[id].destroy(next)
  }, function(err) {
    if (err) return cb(err)
    clearInterval(this.reportTimer)
    this.client.destroy(() => {
      this.removeAllListeners()
      cb()
    })
  })
}

Dashboard.prototype._report = function _report() {
  let state = {
    downloadSpeed    : this.client.downloadSpeed(),
    uploadSpeed      : this.client.uploadSpeed(),
    downloadThrottle : this.client.downloadThrottleRate || "N/A",
    uploadThrottle   : this.client.uploadThrottleRate || "N/A"
  }
  this.emit("update", state)
}

module.exports = Dashboard;
