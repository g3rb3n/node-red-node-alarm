module.exports = function(RED) {
  'use strict';

  function StateThresholdAlarmNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.thresholdMilliseconds = config.thresholdSeconds * 1000;
    node.payload = config.payload == 'true';
    node.on('input', function(msg) {
      try{
        if (!msg.alarm) msg.alarm = {};
        let alarm = msg.alarm;
        let now = new Date();
        let match = msg.payload == node.payload;
        var context = node.context();
        let lastOtherState = context.get('lastOtherState');
        let previousPayload = context.get('previousPayload');

        if (!lastOtherState || !match) {
          lastOtherState = now;
          context.set('lastOtherState', now);
        }

        if (!match) {
          node.status({fill:'green',shape:'dot',text:'OK ' + msg.payload + ' is not ' + node.payload});
          if (previousPayload !== msg.payload) {
            context.set('previousPayload', msg.payload);
            node.send(msg);
          }
          return;
        }
        let seconds = (now - lastOtherState) / 1000;
        if (now - lastOtherState > node.thresholdMilliseconds) {
          alarm.state = true;
          alarm.status = `${msg.payload} for more than ${node.thresholdSeconds} seconds`;
          node.status({fill:'red',shape:'dot',text:`ALARM ${msg.payload} for ${Math.round(seconds)} s`});
          if (previousPayload !== msg.payload) {
            context.set('previousPayload', msg.payload);
            node.send(msg);
          }
          return;
        }
        node.status({fill:'yellow',shape:'dot',text:`OK ${msg.payload} for ${Math.round(seconds)} s`});
      }
      catch (err) {
        node.error(err);
      }
    })
  }
  RED.nodes.registerType('StateThresholdAlarmNode', StateThresholdAlarmNode);
}
