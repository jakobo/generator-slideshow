# Running The Deck Locally
```
gem install compass
npm install
npm install -g gulp
open "http://localhost:8000" && gulp serve
```

If you would like to publish to github pages, the directories are labeled in a jekyll friendly manner. By default, directories beginning with an underscore will not be part of the public site (but do keep them part of your repository).

## Customize
* **_config/slide_config.js** contains information about this slide deck. It's used to populate the title slide, enable additional options such as tracking, etc
* **_scss/_theme.scss** allows you to create custom overrides for all the variables. Every variable used for visual presentation can be found in **_scss/_variables.scss**
* **index.html** is your slide deck. Good 'ole HTML5

# Credit
First off, this couldn't have been done without the amazing work of [Luke Mahe](https://twitter.com/lukemahe) and [Eric Bidelman](https://github.com/ebidel), with whom the foundation of this project couldn't have been possible. The original project is located at [https://code.google.com/p/io-2012-slides/](https://code.google.com/p/io-2012-slides/).

Second, if it wasn't for compass/gulp/yeoman/modern browsers, this wouldn't even be a thing. Thankfully, it's a thing.

Finally, to every person who's probably going to fork/alter/submit patches for this, thank you.

## License
* The generated slide template code is licensed under the [Apache License, 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)  
