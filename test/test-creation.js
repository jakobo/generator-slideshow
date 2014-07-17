/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('slideshow generator', function () {
  // 15s test window
  this.timeout(15000);
  
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('slideshow:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      'README.md',
      '_config',
      '_scripts',
      '_scss',
      'css',
      'gulpfile.js',
      'images',
      'index.html',
      'js',
      'package.json'
    ];

    var questions = require('../app/questions');
    var questionMock = {};

    for (var name in questions) {
      for (var i = 0, len = questions[name].length; i < len; i++) {
        questionMock[questions[name][i].name] = questions[name][i].default;
      }
    }

    helpers.mockPrompt(this.app, questionMock);
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });

  it('creates expected files and installs grunt', function (done) {
    var expected = [
      // add files you expect to exist here.
      // others are already covered
      'package.json'
    ];

    var questions = require('../app/questions');
    var questionMock = {};

    for (var name in questions) {
      for (var i = 0, len = questions[name].length; i < len; i++) {
        questionMock[questions[name][i].name] = questions[name][i].default;
      }
    }

    // override
    questionMock.shimGulp = true;

    helpers.mockPrompt(this.app, questionMock);
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
