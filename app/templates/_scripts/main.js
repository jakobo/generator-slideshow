var config = require('../_config/slide_config');
var SlideDeck = require('./slides/slide-deck');
var funcs = require('./lib/funcs');
var Prism;

// enable any missing polyfills
if (!!document.body.classList && !!document.body.dataset) {
  require('./polyfills/classList.min');
  require('./polyfills/dataset.min');
}
if (!!window.history) {
  require('./polyfills/history.min');
}
if (!!window.matchMedia) {
  require('./polyfills/matchmedia');
}

// always enable console shims
require('console-shim');

// convert all our pre blocks of class prettyprint to highlight blocks
if (config.settings.usePrettify) {
  Prism = require('./lib/prism');
  Prism.highlightAll();
}

// analytics if enabled
if (config.settings.analytics) {
  (function() {
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', config.settings.analytics]);
    _gaq.push(['_trackPageview']);

    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  }());
}

// do not specify an el, but do specify a config
module.exports = new SlideDeck(null, config);
