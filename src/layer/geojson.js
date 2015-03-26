/* global L */

'use strict';

var util = require('../util/util');

var GeoJsonLayer = L.GeoJSON.extend({
  includes: [
    require('../mixin/geojson')
  ],
  initialize: function(options) {
    L.Util.setOptions(this, this._toLeaflet(options));

    if (typeof options.data === 'object') {
      this._create(options, options.data);
    } else {
      var me = this,
        url = options.url;

      util.strict(url, 'string');
      util.loadFile(url, 'json', function(response) {
        if (response) {
          // TODO: Do a check to make sure the GeoJSON is valid, and fire error event if it isn't.
          me._create(options, response);
        } else {
          var obj = {
            message: 'There was an error loading the GeoJSON file.'
          };

          me.fire('error', obj);
          me.errorFired = obj;
        }
      });
    }
  },
  _create: function(options, data) {
    L.GeoJSON.prototype.initialize.call(this, data, options);

    //options.lineClickRadius = 9;
    //options.lineClickRadius = 30;

    if (options.lineClickRadius) {
      var features = [];

      this.eachLayer(function(layer) {
        if (layer.feature.geometry.type.toLowerCase().indexOf('line') > -1) {
          features.push(layer.feature);
        }
      });

      if (features.length) {
        var clickLayer = new L.FeatureGroup().addTo(this._map);

        options.style = {
          color: 'red',
          opacity: 0,
          weight: options.lineClickRadius
        };

        for (var i = 0; i < features.length; i++) {
          // Also store original _leaflet_id with new geometry so you can keep the FeatureGroup synced up.
          clickLayer.addLayer(new L.GeoJSON(features[i], options));
        }

        // Hook up to layer unload and hide events and remove clickLayer then too.
      }
    }

    this.fire('ready');
    this.readyFired = true;
    this._loaded  = true;
    return this;
  }
});

module.exports = function(options) {
  options = options || {};

  if (!options.type) {
    options.type = 'geojson';
  }

  if (options.cluster) {
    return L.npmap.layer._cluster(options);
  } else {
    return new GeoJsonLayer(options);
  }
};
