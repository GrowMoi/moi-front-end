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
          apiHost: 'http://localhost:5000'
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
          apiHost: '//moi-staging.herokuapp.com'
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
          apiHost: 'http://moi-backend.shiriculapo.com'
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
          apiHost: 'http://moi-integration.herokuapp.com'
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
