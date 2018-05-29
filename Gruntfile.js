'use strict';

var path = require('path');
var spawn = process.platform === 'win32' ? require('win-spawn') : require('child_process').spawn;
var promise = require('bluebird');
var fs = promise.promisifyAll(require('fs'));
var folderImgs = 'app/images/';
var folderSnds = 'app/sounds/';
var folderVds = 'app/videos/';
var extImages = {
  png: true,
  jpg: true,
  jpeg: true,
  gif: true,
  svg: false
};
var extSounds = {
  mp3: true
};
var extVideos = {
  mp4: true
};

//get paths files into a folder
function readDir(dirName, extFile) {
  return fs.readdirAsync(dirName).map(function (fileName) {
    var route = path.join(dirName, fileName);
    return fs.statAsync(route).then(function(stat) {
      return stat.isDirectory() ? readDir(route) : route;
    });
  }).reduce(function (arrayFiles, currentFile) {
    var isString = typeof(currentFile) === 'string',
        ext = isString ? path.extname(currentFile).split('.').pop() : null,
        matchExt = isString && extFile ? extFile[ext] : true;
    return matchExt ? arrayFiles.concat(currentFile) : arrayFiles;
  }, []);
}

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    yeoman: require('./config/yeoman-config'),
    ngconstant: require('./config/ngconstant-config'),
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep', 'newer:copy:app']
      },
      html: {
          files: ['<%= yeoman.app %>/*.html'],
          tasks: ['newer:copy:app']
      },
      jadengtemplatecache: {
        files: ['<%= yeoman.app %>/**/*.jade'],
        tasks: ['jadengtemplatecache','newer:copy:templates']
      },
      js: {
        files: ['<%= yeoman.app %>/<%= yeoman.scripts %>/**/*.js',
                '!<%= yeoman.app %>/<%= yeoman.scripts %>/templates.js'],
        tasks: ['newer:copy:js', 'newer:jshint:all']
      },
      compass: {
        files: ['<%= yeoman.app %>/<%= yeoman.styles %>/**/*.{scss,sass}'],
        tasks: ['compass:server', 'newer:clean:css', 'autoprefixer', 'newer:copy:tmp']
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['ngconstant:development', 'newer:copy:app']
      },
      images: {
        files: ['<%= yeoman.app %>/<%= yeoman.images %>/**/*.{png,jpg,jpeg,gif,webp,svg}'],
        tasks: ['newer:copy:images']
      }
    },

    jadengtemplatecache: require('./config/jade-config'),

    // The actual grunt server settings
    connect: {
      server: {
        options:{
          port: 9000,
          hostname: 'localhost',
          base: '<%= yeoman.dist %>'
        }
      },
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      dist: {
        options: {
          base: '<%= yeoman.dist %>'
        }
      },
      coverage: {
        options: {
          port: 9002,
          open: true,
          base: ['coverage']
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/<%= yeoman.scripts %>/**/*.js',
        '!<%= yeoman.app %>/<%= yeoman.scripts %>/templates.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/unit/**/*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.temp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.temp',
      css: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.dist %>/styles'
          ]
        }]
      },
    },

    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/<%= yeoman.styles %>/',
          src: '{,*/}*.css',
          dest: '<%= yeoman.dist %>/<%= yeoman.styles %>/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      sass: {
        src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: require('./config/compass-config'),

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        staging: '.temp',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/<%= yeoman.styles %>/**/*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    cssmin: {
      options: {
        //root: '<%= yeoman.app %>',
        noRebase: true
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: require('./config/copy-config'),

    concurrent: require('./config/concurrent-config'),

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/<%= yeoman.styles %>/main.css': [
    //         '.temp/<%= yeoman.styles %>/**/*.css',
    //         '<%= yeoman.app %>/<%= yeoman.styles %>/**/*.css'
    //       ]
    //     }
    //   }
    // },
    uglify: {
      options: {
        mangle: false
      }
      // dist: {
      //   files: {
      //     '<%= yeoman.dist %>/<%= yeoman.scripts %>/scripts.js': [
      //       '<%= yeoman.dist %>/<%= yeoman.scripts %>/scripts.js'
      //     ]
      //   }
      // }
    },
    // concat: {
    //   dist: {}
    // },

    // Test settings
    // These will override any config options in karma.conf.js if you create it.
    karma: {
      options: {
        browsers: ['PhantomJS'],
        basePath: '',
        frameworks: ['mocha', 'chai', 'sinon'],
        files: [
          '<%= yeoman.app %>/bower_components/angular/angular.js',
          '<%= yeoman.app %>/bower_components/angular-mocks/angular-mocks.js',
          '<%= yeoman.app %>/bower_components/angular-animate/angular-animate.js',
          '<%= yeoman.app %>/bower_components/angular-sanitize/angular-sanitize.js',
          '<%= yeoman.app %>/bower_components/angular-ui-router/release/angular-ui-router.js',
          '<%= yeoman.app %>/bower_components/ionic/release/js/ionic.js',
          '<%= yeoman.app %>/bower_components/ionic/release/js/ionic-angular.js',
          '<%= yeoman.app %>/<%= yeoman.scripts %>/**/*.js',
          '<%= yeoman.app %>/templates/**/*.html',
          '<%= yeoman.test %>/unit/**/*.js'
        ],
        autoWatch: false,
        reporters: ['dots', 'coverage'],
        port: 8080,
        singleRun: false,
        colors: true,
        phantomjsLauncher: {
          exitOnResourceError: true
        },
        preprocessors: {
          // Update this if you change the yeoman config path
          '<%= yeoman.app %>/<%= yeoman.scripts %>/**/*.js': ['coverage'],
          '<%= yeoman.app %>/templates/**/*.html': ['ng-html2js']
        },
        coverageReporter: {
          reporters: [
            { type: 'html', dir: 'coverage/' },
            { type: 'text-summary' }
          ]
        },
        ngHtml2JsPreprocessor: {
           moduleName: 'moi.templates',
           stripPrefix: '<%= yeoman.app %>/'
        }
      },
      unit: {
        // Change this to 'Chrome', 'Firefox', etc. Note that you will need
        // to install a karma launcher plugin for browsers other than Chrome.
        browsers: ['PhantomJS'],
        background: true
      },
      continuous: {
        browsers: ['PhantomJS'],
        singleRun: true
      }
    },

    // ngAnnotate tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/concat/<%= yeoman.scripts %>',
          src: '*.js',
          dest: '<%= yeoman.dist %>/concat/<%= yeoman.scripts %>'
        }]
      }
    },

    // grunt-protractor-runner
    protractor: {
      options: {
        configFile: '<%= yeoman.test %>/e2e-tests.conf.js'
      },
      all: {}
    }

  });

  grunt.registerTask('protractor:ci', [
    'protractor:ci:standalone'
  ]);

  grunt.registerTask('protractor:ci:standalone', function (){
    var done = this.async(),
        gruntLog = function (data) { grunt.log.writeln(data); },
        gruntErr = function (data) { grunt.log.error(data); };

    var express = spawn(
      'node',
      ['server.js']
    );
    express.stdout.on('data', gruntLog);
    express.stderr.on('data', gruntErr);

    var protractor = spawn(
      path.resolve('./node_modules/protractor/bin/', 'protractor'),
      ['test/e2e-tests.conf.js']
    );
    protractor.stdout.on('data', gruntLog);
    protractor.stderr.on('data', gruntErr);
    protractor.on('close', function (code) {
      express.kill();
      code = code ? false : true;
      done(code);
    });
  });

  grunt.registerTask('watch:specs', function () {
    var karma = {
      files: ['<%= yeoman.app %>/<%= yeoman.scripts %>/**/*.js', '<%= yeoman.test %>/unit/**/*.js'],
      tasks: ['newer:jshint:test', 'karma:unit:run']
    };
    var protractor = {
      files: ['<%= yeoman.app %>/<%= yeoman.scripts %>/**/*.js', '<%= yeoman.test %>/e2e/**/*.js'],
      tasks: ['newer:jshint:test', 'protractor:ci']
    };

    grunt.config.set('watch', [karma, protractor]);

    return grunt.task.run(['watch']);
  });

  grunt.registerTask('imagespath', function(environment){
    var done = this.async();
    readDir(folderImgs, extImages).then(function(imgs){
      grunt.config.set('ngconstant.'+ environment + '.constants.IMAGES.paths', imgs);
      grunt.task.run(['ngconstant:'+ environment]);
      done();
    });
  });

  grunt.registerTask('soundspath', function(environment){
    var done = this.async();
    readDir(folderSnds, extSounds).then(function(snds){
      grunt.config.set('ngconstant.'+ environment + '.constants.SOUNDS.paths', snds);
      grunt.task.run(['ngconstant:'+ environment]);
      done();
    });
  });

  grunt.registerTask('videospath', function(environment){
    var done = this.async();
    readDir(folderVds, extVideos).then(function(snds){
      grunt.config.set('ngconstant.'+ environment + '.constants.VIDEOS.paths', snds);
      grunt.task.run(['ngconstant:'+ environment]);
      done();
    });
  });

  grunt.registerTask('test', [
    'wiredep',
    'clean',
    'concurrent:test',
    'autoprefixer',
    'karma:unit:start',
    'watch:specs'
  ]);

  grunt.registerTask('test:ci', [
    'jshint:all',
    'wiredep',
    'clean',
    'concurrent:test',
    'ngconstant:test',
    'imagespath:test',
    'soundspath:test',
    'videospath:test',
    'autoprefixer',
    'karma:continuous'
  ]);

  grunt.registerTask('test:precommit', [
    'jshint:all',
    'jshint:test',
    'wiredep',
    'clean',
    'concurrent:test',
    'ngconstant:test',
    'imagespath:test',
    'soundspath:test',
    'videospath:test',
    'autoprefixer',
    'karma:continuous'
  ]);

  grunt.registerTask('serve', function (target) {
    if (target === 'compress') {
      return grunt.task.run(['compress', 'connect:server','watch' ]);
    }
    grunt.task.run(['wiredep', 'init', 'connect:server','watch']);
  });

  grunt.registerTask('build', function() {
    return grunt.task.run(['init']);
  });

  grunt.registerTask('init', [
    'clean',
    'ngconstant:development',
    'imagespath:development',
    'soundspath:development',
    'videospath:development',
    'wiredep',
    'concurrent:server',
    'autoprefixer',
    'newer:copy:app',
    'newer:copy:js',
    'newer:copy:tmp'
  ]);


  grunt.registerTask('compress', [
    'clean',
    'ngconstant:production',
    'imagespath:production',
    'soundspath:production',
    'videospath:production',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'cssmin',
    'uglify',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('coverage',
    ['karma:continuous',
    'connect:coverage:keepalive'
  ]);

  grunt.registerTask('default', [
    'wiredep',
    'newer:jshint',
    'karma:continuous',
    'compress'
  ]);
};
