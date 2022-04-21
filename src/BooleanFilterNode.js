module.exports = function(RED) {
  'use strict';

  function BooleanFilterNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.pass = config.pass === 'true';
    node.on('input', function(msg) {
      try {
        node.log(JSON.stringify(node))
        node.log(JSON.stringify(config))
        let pass = msg.payload === node.pass;
        node.status({
          fill: msg.pass ? 'green' : 'red',
          shape: 'dot',
          text: pass ? 'pass' : 'block'
        });
        if (pass) node.send(msg);
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
  RED.nodes.registerType('BooleanFilterNode', BooleanFilterNode);
}
