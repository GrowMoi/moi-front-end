(function() {
  'use strict';

  var jadeConfig = {
    options: {
      module: 'moi.templates',
      dest: '<%= yeoman.app %>/scripts/templates.js',
      jade: {
      }
    },
    app: {
      files: [ {
        expand: true,
        src: 'templates/**/*.jade',
        cwd: '<%= yeoman.app %>',
        ext: '.html'
      } ]
    }
  };

  return module.exports = jadeConfig;
})();
