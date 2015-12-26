(function() {
  'use strict';

  var jadeConfig = {
    compile: {
      options: {
        data: {
          debug: true
        }
      },
      files: [ {
        expand: true,
        src: 'templates/**/*.jade',
        dest: '<%= yeoman.dist %>',
        cwd: '<%= yeoman.app %>',
        ext: '.html'
      } ]
    },
    test: {
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
    },
    staging: {
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
  };

  return module.exports = jadeConfig;
})();
