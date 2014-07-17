module.exports = {
  // Slide settings
  settings: {
    title: '<%= deck.title %>',
    subtitle: '',
    eventInfo: {
     title: '<%= deck.event %>',
     date: '<%= deck.date %>'
    },
    useBuilds: <%= config.builds %>, // Default: true. False will turn off slide animation builds.
    usePrism: <%= config.prism %>,   // Default: true
    enableSlideAreas: <%= config.clicks %>, // Default: true. False turns off the click areas on either slide of the slides.
    enableTouch: <%= config.touch %>, // Default: true. If touch support should enabled. Note: the device must support touch.
    analytics: '<%= analytics %>', // Enable your analytics for the googles
    favIcon: '', // TODO
    fonts: [
      'Open Sans:regular,semibold,italic,italicsemibold',
      'Source Code Pro'
    ],
  },

  // Author information
  presenters: [{
    name: '<%= you.name %>',
    company: '<%= you.position %><br><%= you.company %>',
    linkedin: '<%= you.linkedin %>',
    gplus: '<%= you.gplus %>',
    twitter: '<%= you.twitter %>',
    www: '<%= you.www %>',
    github: '<%= you.github %>'
  }]
};
