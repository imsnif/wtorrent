/** @jsx React.DOM */
"use strict";

let React = require('react');
let Button = React.createFactory(require('react-bootstrap').Button);
let Glyphicon = React.createFactory(require('react-bootstrap').Glyphicon);

let DownloadButton = React.createClass({
  render: function() {
    let link = this.props.link;
    if (this.props.enabled) {
      return (
        <span>
          <a href={link}>
            <Button bsStyle="danger" download>
              <Glyphicon glyph="cloud-download" />
            </Button>
          </a>
        </span>
      );
    } else {
      return (
        <span>
          <Button bsStyle="danger" disabled>
            <Glyphicon glyph="cloud-download" />
          </Button>
        </span>
      );
    };
  }
});

module.exports = DownloadButton;
