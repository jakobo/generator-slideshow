var rclass = /[\t\r\n\f]/g;

// https://github.com/jquery/jquery/blob/d837f119c3729565103005d5d7fa89e1dd8110cb/src/attributes/classes.js
module.exports.hasClass = function(el, selector) {
  var className = " " + selector + " ";
  if (el.nodeType === 1 && (" " + el.className + " ").replace(rclass, " ").indexOf(className) >= 0 ) {
    return true;
  }
  return false;
};

// http://stackoverflow.com/questions/3755227/cross-browser-javascript-getattribute-method
module.exports.getAttribute = function(el, attr) {
  var result = (el.getAttribute && el.getAttribute(attr)) || null;
  if(!result) {
    var attrs = el.attributes;
    var length = attrs.length;
    for(var i = 0; i < length; i++) {
      if(attrs[i].nodeName === attr) {
        result = attrs[i].nodeValue;
      }
    }
  }
  return result;
};

// a combination of these two great deprefixing solutions for JS
// http://davidwalsh.name/vendor-prefix
// http://leaverou.github.io/prefixfree/
var dummyDiv = document.createElement('div');
var prefix = (function () {
  var tally = {};
  var styles = window.getComputedStyle(document.documentElement, '');
  var pfx;
  var highest = {uses:0};
  var matches = [].slice.call(styles).join('\n').match(/^-.+$/gm);
  for (var i = 0, len = matches.length; i < len; i++) {
    pfx = matches[i].split('-')[1];
    tally[pfx] = ++tally[pfx] || 1;
  }
  for(pfx in tally) {
    if(highest.uses < tally[pfx]) {
      highest = {prefix: pfx, uses: tally[pfx]};
    }
  }

  return '-' + highest.prefix + '-';
})();

function camelize(str) {
  return str.replace(/-([a-z])/g, function($0, $1) { return $1.toUpperCase(); }).replace('-','');
}
function lcFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports.CSStoStyleProperty = function(property) {
  var style = dummyDiv.style;
  var attempts = [
    camelize(prefix + property),
    lcFirst(camelize(prefix + property)),
    camelize(prefix + property).toLowerCase(),
    property
  ];

  for (var i = 0, len = attempts.length; i < len; i++) {
    if (attempts[i] in style) {
      return attempts[i];
    }
  }

  return property;
};
