var yeoman = require('yeoman-generator');
var chalk = require('chalk');

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
  },
  generateNextSteps: function generateNextSteps(options) {
    var y = chalk.yellow;
    var r = chalk.red;
    var w = function(x) { return x; };

    var output = [
      y('To build your slideshow (for publishing to github, etc):'),
      w('  gulp build'),
      y('To serve your slideshow locally:'),
      w('  gulp serve'),
    ];

    if (!options.gulpOk) {
      output = [].concat([
        r('Oh no! You do not seem to have a working gulp. Gulp is a great build utility'),
        r('and is needed in order to build your presentation if you want to make any'),
        r('style or JS modifications. You can install gulp globally by running:'),
        w('  npm install -g gulp')
      ], output);
    }

    if (!options.compassOk && !options.rubyOk) {
      output = [].concat([
        r('Yikes! You are missing a version of ruby that can run the latest'),
        r('compass. Without ruby and the compass gem, you will not be able to'),
        r('customize your CSS. If you would like to enable this functionality,'),
        r('you need to install ruby (we recommend googling for "rbenv"). Then,'),
        r('once you have ruby, you can run the following to install compass:'),
        w('  gem install compass')
      ], output);
    }
    else if (!options.compassOk && options.rubyOk) {
      output = [].concat([
        r('You do not have compass. You will not be able to customize your CSS'),
        r('without it. Installing compass is easy though. All you need run is:'),
        w('  gem install compass')
      ], output);
    }

    return output.join('\n');
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
