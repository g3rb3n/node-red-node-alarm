module.exports = function(RED) {
  'use strict';

  function MapNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    var context = node.context();
    node.on('input', function(msg) {
      try {
        let key = 'map';
        let storage = 'file';
        let map = context.get(key, storage) || {};
        if (msg.map) {
            if (msg.map.delete) delete map[msg.topic];
            else if (msg.map.clear) map = {};
        }
        else {
            let value = JSON.parse(JSON.stringify(msg));
            if (map[msg.topic]) value = Object.assign(map[msg.topic], value);
            map[msg.topic] = value;
        }
        context.set(key, map, storage);
        let newMsg = {
          map: {data:map},
          payload: map,
          topic: 'map',
        };
        node.status({fill:'green', shape:'dot', text:'Loaded ' + Object.keys(map).length});
        node.send(newMsg);
      }
      catch (err) {
      node.status({fill:'black', shape:'dot', text:'Error ' + err});
      node.error(err);
      }
    })
  }
  RED.nodes.registerType('MapNode', MapNode);
}
