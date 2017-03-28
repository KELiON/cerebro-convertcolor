'use strict';
const toRGB = require('hex-rgb');
const id = 'convertColor';
const icon = require('./icon.png');

/**
 * Validate hex color
 */
function isHex(hexCode) {
  return hexCode.match(/^convertColor #[a-fA-F0-9]+/);
}

/**
 * Validate RGB color
 */
function isRGB(RGBCode) {
  return RGBCode.match(/^convertColor rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
}

/**
 * Convert RGB to hex color
 */
function toHex(r,g,b) {
   let bin = r << 16 | g << 8 | b;
    return (function(h){
        return new Array(7-h.length).join("0")+h
    })(bin.toString(16).toUpperCase())
}

const plugin = ({term, display, actions}) => {
  var rgb = isRGB(term);
  var hex = isHex(term);

  if (term.match(/^convertColor/)) {

    if (rgb) { var color = `#${toHex(rgb[1], rgb[2], rgb[3])}` };
    if (hex) { var color = `rgb(${toRGB(hex.input.split(' ')[1]).join(',')})` };

    display({
      id,
      icon,
      title: `Your color: ${color == undefined ? '...' : color}`,
      onSelect: () => {
        actions.copyToClipboard(color);
        new Notification('Text Copied', {body: color, icon: icon});
      },
      getPreview: () => {
        return `<h1>Your color preview...</h1>
        <div style="background-color: ${color}; height: 150px; width: 100%; border: var(--main-border)"></div>`;
      }
    });
  }

};

module.exports = {
  fn: plugin,
  name: 'Convert code colors',
  keyword: 'convertColor'
}
