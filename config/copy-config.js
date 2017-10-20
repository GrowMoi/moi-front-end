(function() {
  'use strict';

  var copyConfig = {
    dist: {
      files: [{
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>',
        dest: '<%= yeoman.dist %>',
        src: [
          '<%= yeoman.images %>/**/*.{png,jpg,jpeg,gif,webp,svg}',
          '*.html',
          'templates/**/*.html',
          'fonts/*',
          'sounds/*',
          'videos/*'
        ]
      }, {
        expand: true,
        cwd: '.temp/<%= yeoman.images %>',
        dest: '<%= yeoman.dist %>/<%= yeoman.images %>',
        src: ['generated/*']
      }]
    },
    styles: {
      expand: true,
      cwd: '<%= yeoman.app %>/<%= yeoman.styles %>',
      dest: '<%= yeoman.app %>/<%= yeoman.styles %>/',
      src: '{,*/}*.css'
    },
    fonts: {
      expand: true,
      cwd: 'app/bower_components/ionic/release/fonts/',
      dest: '<%= yeoman.app %>/fonts/',
      src: '*'
    },
    vendor: {
      expand: true,
      cwd: '<%= yeoman.app %>/vendor',
      dest: '.temp/<%= yeoman.styles %>/',
      src: '{,*/}*.css'
    },
    app: {
      expand: true,
      cwd: '<%= yeoman.app %>',
      dest: '<%= yeoman.dist %>/',
      src: [
        '**/*',
        '!**/*.jade',
        '!**/*.(scss,sass,css)'
      ]
    },
    tmp: {
      expand: true,
      cwd: '.temp',
      dest: '<%= yeoman.dist %>/',
      src: '**/*'
    },
    staging: {
      expand: true,
      cwd: '.temp',
      dest: '<%= yeoman.app %>/',
      src: '**/*'
    },
    images: {
      expand: true,
      cwd: '<%= yeoman.app %>/<%= yeoman.images %>',
      dest: '<%= yeoman.dist %>/<%= yeoman.images %>',
      src: '**/*.{png,jpg,jpeg,gif,webp,svg}'
    }
  };

  return module.exports = copyConfig;
})();
