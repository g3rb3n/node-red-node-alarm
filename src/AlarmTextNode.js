module.exports = function(RED) {
  'use strict';

  function AlarmTextNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', function(msg) {
      try {
        let alarm = msg.alarm;
        if (!alarm.status) alarm.status = alarm.state ? 'ALARM' : 'OK';
        if (!alarm.statusText) {
          if (!alarm.comparison) {
            alarm.comparison = alarm.state ? alarm.comparisonAlarm : alarm.comparisonOkay;
          }
          alarm.statusText = [alarm.value, alarm.unit, alarm.comparison, alarm.threshold, alarm.unit].join(' ');
        }
        let text = [alarm.status, alarm.device, alarm.statusText].join(' ');
        msg.payload = text;
        if (alarm.state) node.status({fill:'red', shape:'dot', text});
        else node.status({fill:'green', shape:'dot', text});
        node.send(msg);
      }
      catch (err) {
        node.status({fill:'black', shape:'dot', text:'Error ' + err});
        node.error(err);
      }
    })
  }
  RED.nodes.registerType('AlarmTextNode', AlarmTextNode);
}
