module.exports = function(RED) {
  'use strict';

  function MapFilterNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', function(msg) {
      try {
        let all = Object.values(msg.map.data);
        let alarms = all.filter((item) => item.alarm.state && !item.alarm.disabled);
        let disabled = all.filter((item) => item.alarm.disabled);
        msg.payload = alarms;
        msg.map.alarms = alarms;
        msg.map.disabled = disabled;
        node.status({text:[alarms.length, 'alarms', disabled.length, 'disabled', all.length, 'total'].join(' ')});
        node.send(msg);
      }
      catch (err) {
        node.status({fill:'black', shape:'dot', text:'Error ' + err});
        node.error(err);
      }
    })
  }
  RED.nodes.registerType('MapFilterNode', MapFilterNode);
}
