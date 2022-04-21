module.exports = function(RED) {
  'use strict';

  function ThresholdAlarmTextNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', function(msg) {
      try {
        if (!msg.alarm) msg.alarm = {};
        let alarm = msg.alarm;
        alarm.threshold = config.threshold;
        if (config.comparison == '<') {
          alarm.comparisonAlarm = 'above';
          alarm.comparisonOk = 'not below';
          alarm.state = alarm.value < alarm.threshold;
        }
        if (config.comparison == '<=') {
          alarm.comparisonAlarm = 'above or equals';
          alarm.comparisonOk = 'not below or equals';
          alarm.state = alarm.value <= alarm.threshold;
        }
        if (config.comparison == '>') {
          alarm.comparisonAlarm = 'below';
          alarm.comparisonOk = 'not above';
          alarm.state = alarm.value > alarm.threshold;
        }
        if (config.comparison == '>=') {
          alarm.comparisonAlarm = 'below or equals';
          alarm.comparisonOk = 'not above or equals';
          alarm.state = alarm.value >= alarm.threshold;
        }
        alarm.status = alarm.state ? 'ALARM' : 'OK';
        alarm.comparison = alarm.state ? alarm.comparisonAlarm : alarm.comparisonOk;
        let text = [alarm.status, alarm.device, alarm.value, alarm.unit, alarm.comparison, alarm.threshold, alarm.unit].join(' ');
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
  RED.nodes.registerType('ThresholdAlarmTextNode', ThresholdAlarmTextNode);
}
