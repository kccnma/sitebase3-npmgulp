# Sitebase npm gulp version

A npm gulp version of [Sitebase](https://github.com/kccnma/sitebase/). 2020 Update: upgraded to Gulp 4 via [Gulp Boilerplate](https://github.com/kieranphilipbrown/gulp-boilerplate) by [Kieran Brown](https://github.com/kieranphilipbrown).

[View demo](https://kccnma.github.io/sitebase3-npmgulp/)


## Local install instructions:
1. Make sure you have node and npm installed. See installation docs: (https://nodejs.org/en/). To confirm node and npm are installed:
```
    node -v
    npm -v
```
2. Make sure you have Gulp installed. To install Gulp globally (if you don't already have it). Full installation docs: (https://gulpjs.com/docs/en/getting-started/quick-start).
```
    npm install gulp-cli -g
```
- To confirm gulp is insalled:
```
    gulp --version
```
3. Once confirmed that you have npm and gulp installed, install the project files via npm:
```
    npm install
```
* a note: you might be prompted to run npm audit

## Local dev instructions:
Run gulp watcher:
```
gulp
```
Live reload should  initiate the project on http://localhost:3000. 

## Build instructions:

To build:
```
gulp build
```

### Update log:
* March 2020
    * updated gulp to v4

### Roadmap (future plans/goals):
* Add support for templating (e.g. nunjucks, jekyll, liquid, etc.)