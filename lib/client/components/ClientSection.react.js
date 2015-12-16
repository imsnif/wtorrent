/** @jsx React.DOM */
"use strict";

let React           = require('react');
let ClientStore     = require('../stores/ClientStore');

let ListGroup       = React.createFactory(require('react-bootstrap').ListGroup);
let ListGroupItem   = React.createFactory(require('react-bootstrap').ListGroupItem);
let Row             = React.createFactory(require('react-bootstrap').Row);
let Col             = React.createFactory(require('react-bootstrap').Col);

let TransferRate    = React.createFactory(require('./TransferRate.react'));
let Throttle        = React.createFactory(require('./Throttle.react'));

function getStateFromStores() {
  return {
    clientData: ClientStore.getData()
  };
}

let ClientSection = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    ClientStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ClientStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <ListGroup>
        <ListGroupItem active>
          <Row>
            <Col md={3}>
              <TransferRate
                uploadSpeed   = {this.state.clientData.uploadSpeed}
                downloadSpeed = {this.state.clientData.downloadSpeed}
              />
            </Col>
            <Col md={3}>
              <Throttle
                uploadThrottle = {this.state.clientData.uploadThrottle}
                downloadThrottle = {this.state.clientData.downloadThrottle}
              />
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    );
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = ClientSection;
