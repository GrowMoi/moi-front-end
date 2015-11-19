(function () {
  'use strict';

  return module.exports = function (grunt) {
    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-ng-constant');

    grunt.initConfig({
      yeoman: {
        app: 'app',
        scripts: 'scripts',
        styles: 'styles',
        images: 'images',
        test: 'test',
        dist: 'www'
      },

      ngconstant: {
        options: {
          space: '  ',
          wrap: '"use strict";\n\n {%= __ngModule %}',
          name: 'config',
          dest: '<%= yeoman.app %>/<%= yeoman.scripts %>/configuration.js'
        },
        staging: {
          constants: {
            ENV: {
              name: 'staging',
              apiHost: 'http://moi-staging.herokuapp.com'
            }
          }
        }
      },
    });

    grunt.registerTask('build', [
      'ngconstant:staging'
    ]);
  };
})();
