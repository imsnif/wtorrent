/** @jsx React.DOM */
"use strict";

let React = require('react');

let Button = React.createFactory(require('react-bootstrap').Button);
let Glyphicon = React.createFactory(require('react-bootstrap').Glyphicon);

let DisabledButton = React.createClass({
  render: function() {
      return (
        <Button bsStyle="danger" disabled>
          <Glyphicon glyph="ban-circle" />
        </Button>
      );
  }
});

module.exports = DisabledButton;
