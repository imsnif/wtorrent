"use strict";

module.exports = {
  throttleUpload: function (value) {
    $.ajax({
      url: "/client/throttleUpload",
      type: "POST",
      data: {value}
    })
  },
  throttleDownload: function (value) {
    $.ajax({
      url: "client/throttleDownload",
      type: "POST",
      data: {value}
    })
  }
}
