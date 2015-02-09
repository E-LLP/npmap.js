/* global L */

'use strict';

var util, FaIcon;

util = require('../util/util');
FaIcon = L.Icon.extend({
  options: {
    /*
    iconSize: [35, 45],
    iconAnchor:   [17, 42],
    popupAnchor: [1, -32],
    shadowAnchor: [10, 12],
    shadowSize: [36, 16],
    className: 'awesome-marker',
    prefix: 'glyphicon',
    spinClass: 'fa-spin',
    extraClasses: '',
    icon: 'home',
    markerColor: 'blue',
    iconColor: 'white'
    */

    'marker-color': '#000000',
    'marker-size': 'medium'
  },
  statics: {
    //CSS_TEMPLATE: 'url(//a.tiles.mapbox.com/v4/marker/pin-{{size}}{{symbol}}+{{color}}{{retina}}.png?access_token=pk.eyJ1IjoibnBzIiwiYSI6IkdfeS1OY1UifQ.K8Qn5ojTw4RV1GwBlsci-Q)'
  },
  _sizes: {
    large: {
      iconAnchor: [17.5, 49],
      iconSize: [35, 55],
      popupAnchor: [2, -45]
    },
    medium: {
      iconAnchor: [14, 36],
      iconSize: [28, 41],
      popupAnchor: [2, -34]
    },
    small: {
      iconAnchor: [10, 24],
      iconSize: [20, 30],
      popupAnchor: [2, -24]
    }
  },
  initialize: function(options) {
    var size;

    options = options || {};
    size = options['marker-size'] || 'medium';
    L.Util.extend(options, this._sizes[size]);
    L.setOptions(this, options);
  },
  createIcon: function(oldIcon) {

/*

var div = document.createElement('div'),
    options = this.options;

if (options.icon) {
    div.innerHTML = this._createInner();
}

if (options.bgPos) {
    div.style.backgroundPosition =
        (-options.bgPos.x) + 'px ' + (-options.bgPos.y) + 'px';
}

this._setIconStyles(div, 'icon-' + options.markerColor);
return div;

*/


    var div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div'),
      options = this.options;

    //options.className = null;
    //options.html = null;
    this._setIconStyles(div, 'icon');
    div.style.backgroundImage = util.handlebars(FaIcon.CSS_TEMPLATE, {
      color: options['marker-color'].replace('#', ''),
      retina: L.Browser.retina ? '@2x' : '',
      size: options['marker-size'].slice(0, 1),
      symbol: options['marker-symbol'] ? '-' + options['marker-symbol'] : ''
    });
    return div;
  },
  createShadow: function() {
    return null;
  }
});

module.exports = function(options) {
  return new FaIcon(options);
};
