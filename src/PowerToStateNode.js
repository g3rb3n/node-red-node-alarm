module.exports = function(RED) {
  'use strict';

  function PowerToStateNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', function(msg) {
      try{
        let value = parseFloat(msg.payload);
        let state = value > (config.threshold || 0);
        msg.payload = state;
        let color = state ? 'green' : 'red';
        let status = state ? 'On' : 'Off';
        node.status({fill:color, shape:'dot', text:`${status} ${value} W`});
        node.send(msg);
      }
      catch (err) {
        node.error(err);
      }
    })
  }
  RED.nodes.registerType('PowerToStateNode', PowerToStateNode);
}
