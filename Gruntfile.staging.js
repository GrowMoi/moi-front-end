(function () {
  'use strict';

  var path = require('path');
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

  return module.exports = function (grunt) {
    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-ng-constant');
    grunt.loadNpmTasks('grunt-jade-ng-template-cache');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.initConfig({
      copy: require('./config/copy-config'),
      jadengtemplatecache: require('./config/jade-config'),
      yeoman: require('./config/yeoman-config'),
      compass: require('./config/compass-config'),
      ngconstant: require('./config/ngconstant-config'),
      concurrent: require('./config/concurrent-config')
    });

    grunt.registerTask('imagespath:staging', function(){
      var done = this.async();
      readDir(folderImgs, extImages).then(function(imgs){
        grunt.config.set('ngconstant.staging.constants.IMAGES.paths', imgs);
        grunt.task.run(['ngconstant:staging']);
        done();
      });
    });

    grunt.registerTask('soundspath:staging', function(environment){
      var done = this.async();
      readDir(folderSnds, extSounds).then(function(snds){
        grunt.config.set('ngconstant.staging.constants.SOUNDS.paths', snds);
        grunt.task.run(['ngconstant:staging']);
        done();
      });
    });

    grunt.registerTask('videospath', function(environment){
      var done = this.async();
      readDir(folderVds, extVideos).then(function(snds){
        grunt.config.set('ngconstant.staging.constants.VIDEOS.paths', snds);
        grunt.task.run(['ngconstant:staging']);
        done();
      });
    });

    grunt.registerTask('build', [
      'ngconstant:staging',
      'imagespath:staging',
      'soundspath:staging',
      'videospath:staging',
      'concurrent:staging',
      'copy:staging'
    ]);
  };
})();
