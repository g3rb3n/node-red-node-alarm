module.exports = function(RED) {
  'use strict';

  function ExtractDeviceNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', function(msg) {
      try {
        if (!msg.alarm) msg.alarm = {};
        let alarm = msg.alarm;
        let topic = msg.topic;
        let parts = topic.split('/');
        let result = config.parts.split(' ').map((elem) => parts[parseInt(elem, 10)])
        alarm.device = result.join(' ');
        node.status({fill:'green',shape:'dot',text:alarm.device});
        node.send(msg);
      }
      catch (err) {
        node.status({fill:'black',shape:'dot',text:'Error ' + err});
        node.error(err);
      }
    })
  }
  RED.nodes.registerType('ExtractDeviceNode', ExtractDeviceNode);
}
