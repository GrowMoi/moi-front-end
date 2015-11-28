(function () {
  'use strict';

  return module.exports = function (grunt) {
    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-ng-constant');
    grunt.loadNpmTasks('grunt-contrib-jade');

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
              apiHost: '//moi-staging.herokuapp.com'
            }
          }
        }
      },

      jade: {
        compile: {
          options: {
            data: {
              debug: false
            }
          },
          files: [ {
            expand: true,
            src: 'templates/**/*.jade',
            dest: '<%= yeoman.app %>',
            cwd: '<%= yeoman.app %>',
            ext: '.html'
          } ]
        }
      }
    });

    grunt.registerTask('build', [
      'ngconstant:staging',
      'jade'
    ]);
  };
})();
