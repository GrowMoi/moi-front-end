# moi-front-end

## development
[![Circle CI](https://circleci.com/gh/GrowMoi/moi-front-end.svg?style=svg)](https://circleci.com/gh/GrowMoi/moi-front-end)

### development requirements

- ruby & bundler
- nodejs

### booting up

1. `git clone git@github.com:GrowMoi/moi-front-end.git`
2. `bundle`
3. `npm install -g cordova`
4. `npm install && bower install`
5. `grunt serve`

### testing

we'll be using [mocha](http://mochajs.org/) + [chai](http://chaijs.com/) + [sinon](sinonjs.org)

run test suite with

```
grunt test
```

#### unit specs

aka karma

```
grunt karma:continuous
```

#### e2e specs

aka protractor. End-to-end specs are run against integration's backend server. Take a look at backend environments at https://github.com/GrowMoi/moi/wiki/Environment

we are using [chai-as-promised](http://chaijs.com/plugins/chai-as-promised) to resolve our promises on expectations

##### protractor:ci task

This task builds assets with `test` environment and runs a simple express server which will serve protractor's tests

```
grunt protractor:ci
```

### for ios emulate install

- npm install -g ios-sim
