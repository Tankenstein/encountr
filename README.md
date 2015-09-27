![encountr](https://raw.github.com/Tankenstein/encountr/master/src/images/logo_large.svg)

encountr
========
**A simple and easy to use encounter manager for D&D.**
[![David](https://img.shields.io/david/Tankenstein/encountr.svg?style=flat-square)]()[![GitHub license](https://img.shields.io/github/license/Tankenstein/encountr.svg?style=flat-square)]()

### About

As a DM, in encounters i wrote down the order of entities, health etc on paper. Sometimes i lost track whose turn was it and paper didn't seem like the best solution for this. So i created this simple client-side application.

You can add entities, change their order (by dragging), remove them and change their health super easily.

Feel free to make feature requests!

### Contributing

encountr is built with React, es6 javascript, Redux and scss. It uses browserify as the module loader and gulp as the task runner. Feel free to make pull requests or feature requests, or report issues.

To build, first clone the repo and run `npm install`. Then use the following tasks to develop.

Useful gulp tasks:
+ `gulp watch`
  Watch the files under src/ and build them, compiling jsx and es6 with babel, bundling with browserify, linting with eslint, building scss.

+ `gulp build`
  Do the same as `gulp watch`, but only once.

+ `gulp build:production`
  Do the same as `gulp build`, but also minify the js bundle, sass bundle and html for production. This should be run only when building to production.

+ `gulp serve`
  Run a livereload server for easy development.

### License

encountr is licensed under MIT.