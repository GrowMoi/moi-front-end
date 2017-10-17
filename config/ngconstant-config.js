(function() {
  'use strict';

  var ngconstantConfig = {
    options: {
      space: '  ',
      wrap: '"use strict";\n\n {%= __ngModule %}',
      name: 'config',
      dest: '<%= yeoman.app %>/<%= yeoman.scripts %>/configuration.js'
    },
    development: {
      constants: {
        ENV: {
          name: 'development',
          apiHost: '//moi-staging.herokuapp.com',
          facebookKey: '',
          pusherKey: 'fcad096c62e8aadb4f04'
        },
        IMAGES: {
          paths: []
        },
        SOUNDS: {
          paths: []
        },
        VIDEOS: {
          paths: []
        }
      }
    },
    staging: {
      constants: {
        ENV: {
          name: 'staging',
          apiHost: '//moi-staging.herokuapp.com',
          facebookKey: process.env.FACEBOOK_KEY,
          pusherKey: process.env.PUSHER_KEY
        },
        IMAGES: {
          paths: []
        },
        SOUNDS: {
          paths: []
        },
        VIDEOS: {
          paths: []
        }
      }
    },
    production: {
      options: {
        dest: '<%= yeoman.dist %>/<%= yeoman.scripts %>/configuration.js'
      },
      constants: {
        ENV: {
          name: 'production',
          apiHost: 'http://moi-backend.growmoi.com',
          facebookKey: process.env.FACEBOOK_KEY,
          pusherKey: process.env.PUSHER_KEY
        },
        IMAGES: {
          paths: []
        },
        SOUNDS: {
          paths: []
        },
        VIDEOS: {
          paths: []
        }
      }
    },
    test: {
      constants: {
        ENV: {
          name: 'test',
          apiHost: 'http://moi-integration.herokuapp.com',
          facebookKey: ''
        },
        IMAGES: {
          paths: []
        },
        SOUNDS: {
          paths: []
        },
        VIDEOS: {
          paths: []
        }
      }
    }
  };

  return module.exports = ngconstantConfig;
})();
