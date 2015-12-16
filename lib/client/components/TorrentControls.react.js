/** @jsx React.DOM */
"use strict";

let prettyMs = require('pretty-ms');

let React           = require('react');
let Row             = React.createFactory(require('react-bootstrap').Row);
let Col             = React.createFactory(require('react-bootstrap').Col);
let ButtonGroup     = React.createFactory(require('react-bootstrap').ButtonGroup);

let DownloadButton  = React.createFactory(require("./DownloadButton.react.js"));
let DeleteButton    = React.createFactory(require("./DeleteButton.react.js"));
let DisabledButton  = React.createFactory(require("./DisabledButton.react.js"));

let ReactPropTypes = React.PropTypes;

let TorrentControls = React.createClass({
  propTypes: {
    torrent: ReactPropTypes.object
  },
  render: function() {
    let torrent     = this.props.torrent
    let downloadLink = `/download/${torrent.id}`
    return (
      <span>
        <Row>
          <ButtonGroup>
            <DownloadButton 
              enabled={torrent.progress === 1 ? true : false} 
              link={downloadLink}
            />
            <DeleteButton
              torrentId={torrent.id}
            />
          </ButtonGroup>
        </Row>
        <Row>
          <ButtonGroup>
            <DisabledButton />
            <DisabledButton />
          </ButtonGroup>
        </Row>
      </span>
    );
  }
});

module.exports = TorrentControls;
