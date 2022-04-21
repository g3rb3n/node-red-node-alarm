module.exports = function(RED) {
  'use strict';

  function ExtractValueNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', function(msg) {
      try {
        if (!msg.alarm) msg.alarm = {};
        let alarm = msg.alarm;
        alarm.value = msg.payload;
        alarm.unit = config.unit;
        if (config.property) {
          for (let part of config.property.split('.')) {
            alarm.value = alarm.value[part];
          }
        }
        msg.payload = alarm.value;
        if (alarm.value.unit) alarm.unit = alarm.value.unit;
        if (alarm.value.value) alarm.value = alarm.value.value;
        node.status({fill:'green', shape:'dot', text:alarm.value + ' ' + alarm.unit});
        node.send(msg);
      }
      catch (err) {
        node.status({fill:'black', shape:'dot', text:'Error ' + err});
        node.error(err);
      }
    })
  }
  RED.nodes.registerType('ExtractValueNode', ExtractValueNode);
}
