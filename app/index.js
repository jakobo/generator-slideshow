'use strict';

var yosay = require('yosay');
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var which = require('which');
var semver = require('semver');
var exec = require('child_process').exec;

var questions = require('./questions');
var base = require('./slideshow-base');

function doterize(str) {
  return str.replace(/_/g, '.');
}

var cliCheck = {
  gulp: true,
  compass: true,
  ruby: true
};

var SlideshowGenerator = module.exports = base.extend({
  init: function() {
    this.data = {
      examples: ''
    };
    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

    this.on('end', function() {
      this.installDependencies({
        bower: false,
        skipMessage: this.options['skip-message'],
        skipInstall: this.options['skip-install'],
        callback: function() {
          console.log(yosay('That\'s everything! Now, let me tell you how to use this.'));

          console.log(this.generateNextSteps({
            gulpOk: cliCheck.gulp,
            rubyOk: cliCheck.ruby,
            compassOk: cliCheck.compass
          }));
        }.bind(this)
      });
    }.bind(this));
  },
  welcome: function() {
    console.log(yosay('Welcome to Yeoman and yo-slideshow! Let\'s build a presentation!'));
  },
  checkGulp: function() {
    var done = this.async();
    which('gulp', function(err, path) {
      if (!path) {
        console.log(chalk.red('Hmm, I can\'t seem to find gulp. We will talk about that in a moment...'));
        cliCheck.gulp = false;
      }
      else {
        console.log(chalk.green('Oh yeah! You have gulp!'));
      }
      done();
    });
  },
  checkRuby: function() {
    var done = this.async();
    which('ruby', function(err, path) {
      if (!path) {
        console.log(chalk.red('Oh, you are missing tuby on your system. I\'ll include some instructions'));
        console.log(chalk.red('at the end for how to install ruby...'));
        cliCheck.ruby = false;
        return done();
      }
      exec("ruby -e 'print \"#{RUBY_VERSION}-p#{RUBY_PATCHLEVEL}\"'", function(err, stdout, stderr) {
        if (err || stderr.toString()) {
          console.log(chalk.red('I couldn\'t verify the ruby version. You need ruby 2.0.0 or higher.'));
          console.log(chalk.red('I\'ll include some instructions for installing ruby when we\'re done...'));
          cliCheck.ruby = false;
          return done();
        }

        var version = stdout.toString();
        if (!semver.satisfies(version, '^2.0.0')) {
          console.log(chalk.red('Your ruby is a bit old, we will need 2.0.0 or higher.'));
          console.log(chalk.red('I\'ll include some instructions for installing ruby when we\'re done...'));
          cliCheck.ruby = false;
          cliCheck.oldRuby = true;
        }
        else {
          console.log(chalk.green('Awesome! You have ruby ^2.0.0 for compass!'));
        }
        return done();
      });
    });
  },
  checkCompass: function() {
    var done = this.async();
    which('compass', function(err, path) {
      if (!path) {
        console.log(chalk.red('Compass seems to be missing. I\'ll include instructions for installing'));
        console.log(chalk.red('that ruby gem when we\'re done...'));
        cliCheck.compass = false;
      }
      else {
        console.log(chalk.green('Alright! You have the compass gem!'));
      }
      return done();
    });
  },
  askShimGulp: function() {
    var done = this.async();

    if (cliCheck.gulp) {
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
            console.log(yosay('I couldn\'t install gulp for you. But that\'s ok, let\'s continue!'));
            clicheck.gulp = false;
          }
          else {
            console.log(yosay('Phew! Okay, with that out of the way, let\'s talk about your presentation'));
            cliCheck.gulp = true;
          }
          return done();
        });
      }
      else {
        cliCheck.gulp = false;
        console.log(yosay('Okay, well we will include instructions for installing gulp later'));
        return done();
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
