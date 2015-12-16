"use strict";

let parseTorrent = require('parse-torrent')

module.exports = function DownloadController (dashboard) {
  return {
    "/:torrent_id": {
      method: "get",
      action: function(req, res) {
        let download = dashboard.get(req.params.torrent_id);
        if (!download) return res.json({err: "No such torrent"});
        res.setHeader("Content-disposition", `attachment; filename="${download.state.name}.zip"`);
        res.setHeader("Content-type", "application/zip");
        let downloadStream
        try { downloadStream = download.stream() } catch (err) { return res.json({err: err}) }
        downloadStream.pipe(res);
      }
    },
    "/add": {
      method: "post",
      action: function(req, res) {
        let magnetUri = req.body.magnet_uri
        try { parseTorrent(magnetUri) } catch(err) { return cb(err) } // Verify magnet URI
        dashboard.add(magnetUri, res.end.bind(res))
      }
    },
    "/delete": {
      method: "post",
      action: function(req, res) {
        dashboard.remove(req.body.torrent_id, res.end.bind(res))
      }
    }
  }
}
