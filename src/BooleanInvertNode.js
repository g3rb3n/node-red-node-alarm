module.exports = function(RED) {
  'use strict';

  function BooleanInvertNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', function(msg) {
      try {
        msg.payload = !msg.payload;
        node.status({
          fill: msg.payload ? 'green' : 'red',
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
  RED.nodes.registerType('BooleanInvertNode', BooleanInvertNode);
}
