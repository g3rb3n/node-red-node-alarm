module.exports = function(RED) {
  'use strict';

  function BooleanToValueNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', function(msg) {
      try {
        let state = msg.payload;
        msg.payload = state === true ? config.true : config.false;
        if (!msg.payload) throw Error(`Can not handle payload ${msg.payload}`);
        node.status({
          fill: state ? 'green' : 'red',
          shape: 'dot',
          text: msg.payload
        });
        node.send(msg);
      }
      catch (error) {
        node.error(error);
        node.status({
          fill: 'black',
          shape: 'dot',
          text: error
        });
      }
    })
  }
  RED.nodes.registerType('BooleanToValueNode', BooleanToValueNode);
}
