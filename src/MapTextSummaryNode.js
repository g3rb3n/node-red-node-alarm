module.exports = function(RED) {
  'use strict';

  function MapTextSummaryNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on('input', function(msg) {
      try {
        let map = msg.map.data;
        let alarms = msg.map.alarms;
        let disabled = msg.map.disabled;
        let countAlarm = alarms.length;
        let countDisabled = disabled.length;
        let countAll = Object.keys(map).length;
        let countOk = countAll - countAlarm;
        if (countAlarm) {
            msg.payload = [countOk, 'of', countAll, 'OK\n'].join(' ');
        }
        else {
            msg.payload = ['All', countOk, 'OK\n'].join(' ');
        }
        if (countDisabled) {
            msg.payload += [countDisabled, 'of', countAll, 'disabled\n'].join(' ');
        }
        if (countAlarm) {
            alarms.forEach((alarm) => {
              msg.payload += alarm.payload + '\n'
            });
        }
        msg.map.countAlarm = countAlarm;
        node.status({text:msg.payload});
        node.send(msg);
      }
      catch (err) {
      node.status({fill:'black', shape:'dot', text:'Error ' + err});
      node.error(err);
      }
    })
  }
  RED.nodes.registerType('MapTextSummaryNode', MapTextSummaryNode);
}
