/** @jsx React.DOM */
"use strict";

let React                 = require('react');
let Row                   = React.createFactory(require('react-bootstrap').Row);
let Col                   = React.createFactory(require('react-bootstrap').Col);
let Input                 = React.createFactory(require('react-bootstrap').Input);
let Button                = React.createFactory(require('react-bootstrap').Button);

let TorrentActionCreators = require('../actions/TorrentActionCreators');

let MagnetSection = React.createClass({
  render: function() {
    return (
      <Row>
        <Col md={9}>
          <Input
            bsSize="large"
            type="text"
            placeholder="Magnet URI"
            onChange={this._onChange}
          />
        </Col>
        <Col md={3}>
          <Button bsStyle="success"
            bsSize="large"
            onClick={this._onClick}
            block>Submit Magnet
          </Button>
        </Col>
      </Row>
    )
  },
  _onChange: function (event, value) {
    this.setState({magnet: event.target.value});
  },
  _onClick: function(event) {
    TorrentActionCreators.addTorrentMagnet(this.state.magnet);
  }
});

module.exports = MagnetSection;
