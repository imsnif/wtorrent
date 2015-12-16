"use strict";

module.exports = function ClientController (dashboard) {
  return {
    "/client/throttleUpload": {
      method: "post",
      action: function(req, res) {
        if (!Number(req.body.value)) return res.json({err: "Value must be numeric"})
        dashboard.throttleUpload(req.body.value);
        res.end();
      }
    },
    "/client/throttleDownload": {
      method: "post",
      action: function(req, res) {
        if (!Number(req.body.value)) return res.json({err: "Value must be numeric"})
        dashboard.throttleDownload(req.body.value);
        res.end();
      }
    }
  }
}
