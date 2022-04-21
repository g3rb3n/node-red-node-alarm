module.exports = function(RED) {
  'use strict';

  function MapDisableNode(config) {
  RED.nodes.createNode(this, config);
    var node = this;
    var context = node.context();
    node.on('input', function(msg) {
      try {
        let map = msg.map.data || context.get('map') || {};
        let disabled = context.get('disabled') || [];

        let all = Object.entries(map);
        if (msg.map.control) {
          if (msg.map.control.command == 'disable') {
            let modified = [];
            modified = all.filter((item) => item[1].alarm.state);
            modified.forEach((item) => {
              item[1].alarm.disabled = true;
            });
            disabled = modified;
          }
          else if (msg.map.control.command == 'enable') {
            let modified = [];
            modified = all.filter((item) => item[1].alarm.disabled);
            modified.forEach((item) => {
              item[1].alarm.disabled = false;
            });
            disabled = [];
          }
          context.set('disabled', disabled);
        }
        disabled.forEach((item) => {
          map[item[0]].alarm.disabled = true;
        });
        context.set('map', map);
        node.status({text:['Disabled', disabled.length, 'of', all.length].join(' ')});
        node.send({
          map: {
            data: map,
            diabled: disabled,
          },
          payload: map,
          topic: msg.topic,
        });
      }
      catch (err) {
        node.status({fill:'black', shape:'dot', text:'Error ' + err});
        node.error(err);
      }
    })
  }
  RED.nodes.registerType('MapDisableNode', MapDisableNode);
}
