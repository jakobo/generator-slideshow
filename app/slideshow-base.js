var yeoman = require('yeoman-generator');

var MyBase = module.exports = yeoman.generators.Base.extend({
  ask: function ask(questions, tmpl, transform) {
    var done = this.async();
    this.prompt(questions, function (props) {
      var save;
      for (var name in props) {
        index(this.data, transform(name), props[name])
      }
      done();
    }.bind(this));
  },
  cp: function cp(f) {
    this.copy(f, f);
  },
  tmpl: function tmpl(f, t) {
    this.template(f, f, t || this.data);
  }
});

function index(obj, search, value) {
  if (typeof search == 'string') {
    return index(obj, search.split('.'), value);
  }
  else if (search.length == 1 && typeof value !== 'undefined') {
    return obj[search[0]] = value;
  }
  else if (search.length == 0) {
    return obj;
  }
  else {
    if (typeof obj[search[0]] === 'object') {
      return index(obj[search[0]], search.slice(1), value);
    }
    else if (typeof obj[search[0]] === 'undefined') {
      if (typeof value === 'undefined') {
        return null;
      }
      else {
        obj[search[0]] = {};
        return index(obj[search[0]], search.slice(1), value);
      }
    }
    else {
      if (typeof value !== 'undefined') {
        throw new Error('cannot set with dot notation into existing value');
      }
      return index(obj[search[0]], search.slice(1), value);
    }
  }
}
