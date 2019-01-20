# moi-front-end

## development
[![Circle CI](https://circleci.com/gh/GrowMoi/moi-front-end.svg?style=svg)](https://circleci.com/gh/GrowMoi/moi-front-end)
[![Code Climate](https://codeclimate.com/github/GrowMoi/moi-front-end/badges/gpa.svg)](https://codeclimate.com/github/GrowMoi/moi-front-end)

### development requirements

- ruby & bundler
- nodejs

### booting up

1. `git clone git@github.com:GrowMoi/moi-front-end.git`
2. `bundle`
4. `npm install && bower install`
5. `grunt serve`

### testing

we'll be using [mocha](http://mochajs.org/) + [chai](http://chaijs.com/) + [sinon](http://sinonjs.org)

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

aka protractor.

End-to-end specs are run against integration's backend server. Take a look at backend environments at https://github.com/GrowMoi/moi/wiki/Environment

we are using [chai-as-promised](http://chaijs.com/plugins/chai-as-promised) to resolve our promises on expectations

##### protractor:ci task

This task  and runs a simple express server which will serve protractor's tests

This task will:

1. build assets with `test` environment
2. build html templates with jade and store them inside /templates
3. run a simple _express_ server to serve the application

```
grunt protractor:ci
```

if you're running protractor locally, make sure you are also running the [backend](github.com/GrowMoi/moi) to answer requests. Will be looked for by default on `development` environment at [localhost:5000](https://github.com/GrowMoi/moi-front-end/blob/master/config/ngconstant-config.js#L15)

### for ios emulate install

    $ npm install -g ios-sim

### deploying

    $ bundle exec cap production deploy

### electron
  With each task will make a build of app and then serve with electron and it connect accordint environment selected.

    $ npm run electron (dev)
    $ npm run electron:staging (staging)
    $ npm run electron:production (production)

### electron-builder
  For create an installer you need pre-install [`electron-builder`](https://github.com/electron-userland/electron-builder) as a gobal package (npm install -g electron-builder)

  1. Create .env file according to environment in the root
  2. Run this tasks `grunt build:production` or `grunt build:staging` according to environment (You need use node v4.X) 
  3. Run `electron-builder build` (You need use current node version)

  Notes: When you run `electron-builder build` the app will create according you OS, if you need for different OS please take a look [here](https://www.electron.build/cli)


### resources

- [guidelines](https://github.com/GrowMoi/moi-front-end/blob/master/guidelines.md)
- [moi-backend](https://github.com/GrowMoi/moi)
