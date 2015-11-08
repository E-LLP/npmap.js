/* global L */

'use strict'

var util = require('../util/util')
var NpmapIcon = L.Icon.extend({
  options: {
    'icon-only': false,
    'marker-color': '#000000',
    'marker-size': 'medium'
  },
  statics: {
    MAKI_TEMPLATE: 'url(https://a.tiles.mapbox.com/v3/marker/pin-{{size}}+{{color}}{{retina}}.png?access_token=pk.eyJ1IjoibnBzIiwiYSI6IkdfeS1OY1UifQ.K8Qn5ojTw4RV1GwBlsci-Q)'
  },
  initialize: function (options) {
    options = options || {}

    var size = options['marker-size'] || 'medium'
    var sizes = {
      pin: {
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
      icon: {
        large: {
          iconAnchor: [17, 19],
          iconSize: [24, 24],
          popupAnchor: [2, -12]
        },
        medium: {
          iconAnchor: [14, 13],
          iconSize: [18, 18],
          popupAnchor: [2, -12]
        },
        small: {
          iconAnchor: [11, 10],
          iconSize: [12, 12],
          popupAnchor: [2, -12]
        }
      }
    }

    L.Util.extend(options, sizes[(options['icon-only'] ? 'icon' : 'pin')][size])
    L.Util.setOptions(this, options)
  },
  createIcon: function (oldIcon) {
    var options = this.options
    var divIcon = L.DomUtil.create('div', 'npmapsymbollibrary-icon ' + options['marker-size'] + ' ' + options['marker-symbol'] + '-' + options['marker-size'] + (L.Browser.retina ? '-2x' : ''))
    var divMarker = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div')

    this._setIconStyles(divMarker, 'icon')

    if (!options['icon-only']) {
      divMarker.style.backgroundImage = util.handlebars(NpmapIcon.MAKI_TEMPLATE, {
        color: options['marker-color'].replace('#', ''),
        retina: L.Browser.retina ? '@2x' : '',
        size: options['marker-size'].slice(0, 1)
      })
    }

    divMarker.appendChild(divIcon)
    return divMarker
  },
  createShadow: function () {
    return null
  }
})

module.exports = function (options) {
  return new NpmapIcon(options)
}
