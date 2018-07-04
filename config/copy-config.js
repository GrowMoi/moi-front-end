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
    bower: {
      expand: true,
      cwd: 'node_modules',
      dest: '<%= yeoman.app %>/bower_components/',
      src: [
        "ionic-sdk/release/css/ionic.css",
        "animate.css/animate.css",
        "dragular/dist/dragular.min.css",
        "angular/angular.js",
        "angular-animate/angular-animate.js",
        "angular-sanitize/angular-sanitize.js",
        "angular-ui-router/release/angular-ui-router.js",
        "ionic-sdk/release/js/ionic.js",
        "ionic-sdk/release/js/ionic-angular.js",
        "angular-cookie/angular-cookie.js",
        "ng-token-auth/dist/ng-token-auth.js",
        "ng-videosharing-embed/build/ng-videosharing-embed.min.js",
        "dragular/dist/dragular.min.js",
        "angular-socialshare/dist/angular-socialshare.min.js",
        "ng-idle/angular-idle.js",
        "moment/moment.js",
        "bucky/bucky.js",
        "chart.js/dist/Chart.js",
        "Chart.PieceLabel.js/src/Chart.PieceLabel.js"
      ]
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
        '!**/*.{scss,sass}',
        '!**/*.html',
        'index.html'
       ]
    },
    js: {
      expand: true,
      cwd: '<%= yeoman.app %>',
      dest: '<%= yeoman.dist %>/',
      src: [
        '**/**/*.js',
        '!scripts/templates.js'
       ]
    },
    templates: {
      expand: true,
      cwd: '<%= yeoman.app %>',
      dest: '<%= yeoman.dist %>/',
      src: [
        'scripts/templates.js'
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
