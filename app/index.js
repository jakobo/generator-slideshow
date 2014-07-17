'use strict';

var yosay = require('yosay');
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var which = require('which');

var questions = require('./questions');
var base = require('./slideshow-base');

function doterize(str) {
  return str.replace(/_/g, '.');
}

var gulpOk = true;

var SlideshowGenerator = module.exports = base.extend({
  init: function() {
    this.data = {
      examples: ''
    };
    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

    this.on('end', function() {
      this.installDependencies({
        skipMessage: this.options['skip-message'],
        skipInstall: this.options['skip-install'],
        callback: function() {
          var y = chalk.bold.yellow;
          var r = chalk.bold.red;
          var w = function(x) { return x; };
          var output;
          console.log(yosay('That\'s everything! Now, let me tell you how to use this.'));
          output = [
            y('To build your slideshow (for publishing to github, etc):'),
            w('  "gulp build"'),
            y('To serve your slideshow locally:'),
            w('  "gulp serve"'),
          ];
          if (!gulpOk) {
            output = [].concat([
              r('Oh no! You do not seem to have a working gulp. Gulp is a great build utility'),
              r('and is needed in order to build your presentation if you want to make any'),
              r('style or JS modifications. You can install gulp globally by running:'),
              w('  npm install -g gulp')
            ], output);
          }
          console.log(output.join('\n'));
        }
      });
    }.bind(this));
  },
  welcome: function() {
    console.log(this.yeoman);
  },
  askToShim: function() {
    var hasGulp = false;
    var done = this.async();
    try {
      hasGulp = which.sync('gulp');
    }
    catch(e) {}

    if (hasGulp) {
      return done();
    }

    this.prompt([{
      type: 'confirm',
      name: 'shimGulp',
      message: 'We noticed you don\'t have gulp globally installed. Would you like\nus to try installing it?',
      default: false
    }], function(props) {
      if (props.shimGulp) {
        this.npmInstall(['gulp'], {'g': true}, function(err) {
          if (err) {
            gulpOk = false;
          }
          console.log(yosay('Phew! Okay, with that out of the way, let\'s talk about your presentation'));
          done();
        });
      }
      else {
        gulpOk = false;
        console.log(yosay('Okay, well we will include instructions for installing gulp later'));
        done();
      }
    }.bind(this));
  },
  askAboutDeck: function() {
    this.ask(questions.deckQuestions, this.data, doterize);
  },
  askAboutYou: function() {
    this.ask(questions.aboutYouQuestions, this.data, doterize);
  },
  askAboutConfig: function() {
    this.ask(questions.configQuestions, this.data, doterize);
  },
  askAboutScaffold: function() {
    this.ask(questions.scaffoldQuestions, this.data, doterize);
  },
  loadExamples: function() {
    if (!this.data.config.examples) {
      return;
    }

    this.data.examples = this.readFileAsString(path.join(__dirname, 'templates/_examples.html'));
  },
  makeFolders: function() {
    this.mkdir('_config');
    this.mkdir('_scripts');
    this.mkdir('_scss');
    this.mkdir('css');
    this.mkdir('images');
    this.mkdir('js');
  },
  copyConfig: function() {
    this.cp('_config/compass.rb');
    this.tmpl('_config/slide_config.js');
  },
  copyScripts: function() {
    this.cp('_scripts/lib/funcs.js');
    this.cp('_scripts/lib/prism.js');
    this.cp('_scripts/polyfills/classList.min.js');
    this.cp('_scripts/polyfills/dataset.min.js');
    this.cp('_scripts/polyfills/history.min.js');
    this.cp('_scripts/polyfills/matchmedia.js');
    this.cp('_scripts/slides/slide-controller.js');
    this.cp('_scripts/slides/slide-deck.js');
    this.cp('_scripts/vendor/prism/prism.js');
    this.cp('_scripts/main.js');
  },
  copySass: function() {
    this.cp('_scss/vendor/prism/_prism.scss');
    this.cp('_scss/_base.scss');
    this.cp('_scss/_default.scss');
    this.cp('_scss/_theme.scss');
    this.cp('_scss/_variables.scss');
    this.cp('_scss/main.scss');
    this.cp('_scss/phone.scss');
  },
  copyPages: function() {
    this.tmpl('index.html');
  },
  copyBuild: function() {
    this.cp('gulpfile.js');
    this.cp('package.json');
    this.cp('README.md');
  }
});
