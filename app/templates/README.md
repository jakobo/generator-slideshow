# Running The Deck Locally
```
gem install compass
npm install
npm install -g gulp
open "http://localhost:8000" && gulp serve
```

## Customize
* **_config/slide_config.js** contains information about this slide deck. It's used to populate the title slide, enable additional options such as tracking, etc
* **_scss/_theme.scss** allows you to create custom overrides for all the variables. Every variable used for visual presentation can be found in **_scss/_variables.scss**
* **index.html** is your slide deck. Good 'ole HTML5

# Credit
First off, this couldn't have been done without the amazing work of [Luke Mahe](https://twitter.com/lukemahe) and [Eric Bidelman](https://github.com/ebidel), with whom the foundation of this project couldn't have been possible.

Second, this project simply weds amazing polyfills with awesome CSS technology and the world is held together with modern build systems.

Finally, to every person who's probably going to fork/alter/submit patches for this, thank you.
