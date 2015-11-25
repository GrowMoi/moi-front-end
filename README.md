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

#### e2e specs

aka protractor

please take a look at [chai-as-promised](http://chaijs.com/plugins/chai-as-promised)

### for ios emulate install

- npm install -g ios-sim
