/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('slideshow generator', function () {
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
});
