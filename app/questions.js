module.exports.deckQuestions = [{
  name: 'deck_title',
  message: 'What is your presentation\'s title?',
  default: 'All About Kittens'
},{
  name: 'deck_event',
  message: 'What is the event this is for?',
  default: 'KittenConf'
},{
  name: 'deck_date',
  message: 'When is the presentation?',
  default: 'Jan 23, 1999'
}];

module.exports.aboutYouQuestions = [{
  name: 'you_position',
  message: 'What is your position/title?',
  default: 'Lead Cat Herder'
},{
  name: 'you_company',
  message: 'What is your company of employment?',
  default: 'Kiten Corp LLC'
},{
  name: 'you_gplus',
  message: 'What is your Google+ URL?',
  default: 'plus.google.com/+YourName'
},{
  name: 'you_twitter',
  message: 'What is your Twitter handle?',
  default: '@handleName'
},{
  name: 'you_linkedin',
  message: 'What is your LinkedIn URL?',
  default: 'linkedin.com/in/YourName'
},{
  name: 'you_www',
  message: 'What is your website?',
  default: 'http://www.example.com'
},{
  name: 'you_github',
  message: 'What is your github name?',
  default: 'githubuser123'
}];

module.exports.configQuestions = [{
  name: 'analytics',
  message: 'What is your Google Analytics ID (if you want stats)?',
  default: ''
},{
  type: 'confirm',
  name: 'config_builds',
  message: 'Do you want slide animation build support?',
  default: true
},{
  type: 'confirm',
  name: 'config_prism',
  message: 'Do you want code highlighting support?',
  default: true
},{
  type: 'confirm',
  name: 'config_touch',
  message: 'Do you want touch support (experimental)?',
  default: true
}];

module.exports.scaffoldQuestions = [{
  type: 'confirm',
  name: 'config_examples',
  message: 'Would you like to prepopulate with example slides?',
  default: true
}];
