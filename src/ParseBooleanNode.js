module.exports = function(RED) {
  'use strict';

  function ParseBooleanNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', function(msg) {
      try {
        if (msg.payload.equals(config.true)) msg.payload = true;
        else if (msg.payload.equals(config.false)) msg.payload = false;
        throw Error(`Can not handle payload ${msg.payload}`);
      }
      catch (err) {
        node.error(err);
      }
    })
  }
  RED.nodes.registerType('ParseBooleanNode', ParseBooleanNode);
}
