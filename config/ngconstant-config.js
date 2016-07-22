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
        }
      }
    },
    staging: {
      constants: {
        ENV: {
          name: 'staging',
          apiHost: '//moi-staging.herokuapp.com'
        }
      }
    },
    production: {
      constants: {
        ENV: {
          name: 'production',
          apiHost: 'http://moi-backend.shiriculapo.com'
        }
      }
    },
    test: {
      constants: {
        ENV: {
          name: 'test',
          apiHost: 'http://moi-integration.herokuapp.com'
        }
      }
    }
  };

  return module.exports = ngconstantConfig;
})();
