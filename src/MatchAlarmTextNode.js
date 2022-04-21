module.exports = function(RED) {
  'use strict';

  function MatchAlarmTextNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', function(msg) {
      try {
        if (!msg.alarm) msg.alarm = {};
        let alarm = msg.alarm;
        let status = null;
        let comparison = null;
        if (config.comparison == '==') {
          alarm.state = alarm.value == config.match;
          status = alarm.state ? 'ALARM' : 'OK';
          comparison = alarm.state ? 'matches' : 'does not match';
        }
        if (config.comparison == '==') {
          alarm.state = alarm.value != config.match;
          status = alarm.state ? 'ALARM' : 'OK';
          comparison = alarm.state ? 'does not match' : 'matches';
        }
        let text = [status, alarm.device, alarm.value, alarm.unit, comparison, config.match, alarm.unit].join(' ');
        msg.payload = text;
        if (alarm.state) node.status({fill: 'red', shape: 'dot', text});
        else node.status({fill: 'green', shape: 'dot', text});
        node.send(msg);
      }
      catch (err) {
        node.status({fill: 'black', shape:'dot', text: 'Error ' + err});
        node.error(err);
      }
    })
  }
  RED.nodes.registerType('MatchAlarmTextNode', MatchAlarmTextNode);
}
