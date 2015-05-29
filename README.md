encountr
--------

A simple and easy to use encounter manager for D&D.

## About

As a DM, in encounters i wrote down the order of entities, health etc on paper. Sometimes i lost track whose turn was it and paper didn't seem like the best solution for this. So i created this simple client-side application.

You can add entities, change their order (by dragging), remove them and change their health super easily.

Feel free to make feature requests!

## Known issues

Dragging to reorder is a bit iffy at the moment.

## Contributing

encountr is built with React and es6 javascript. It uses browserify as the module loader and gulp as the task runner. It doesn't have documentation in the code yet (as i made this the quick and dirty way, in a couple of hours). The code is nicely structured and understandable anyhow. Feel free to make pull requests or feature requests.

To build, first clone the repo and run `npm install`. Then use the following taks to develop.

Gulp tasks:
+ `gulp watch`
  Watch the files under /src/ and build them, using babel to transpile jsx and es6, and browserify to bundle them.

+ `gulp build`
  Do the same as `gulp watch`, but only once.

+ `gulp build:production`
  Do the same as `gulp build`, but also minify the js bundle for production. This should be run only when building to production.

## License

encountr is licensed under MIT.