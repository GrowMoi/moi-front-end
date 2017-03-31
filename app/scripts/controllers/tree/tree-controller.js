(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('TreeController', function ($scope, $rootScope, data, PreloadAssets, VIDEOS) {
    var treeModel = this;
    treeModel.neurons = data.tree;
    treeModel.meta = data.meta;
    treeModel.isBasicLevel = data.meta.depth < 5;
    var videos = VIDEOS.paths;
    var vinetaLevels = [1, 4, 6, 8];
    var preloadMovies = false;
    initVineta();

    treeModel.finishedAnimation = function() {
      $scope.$apply(function(){treeModel.showTree = true;});
      localStorage.setItem('vinetas_animadas',JSON.stringify({'depth': data.meta.depth}));
    };

    function initVineta() {
      var getConfigVineta = JSON.parse(localStorage.getItem('vinetas_animadas'));
      var isDiferentLevel = getConfigVineta ? getConfigVineta.depth !== data.meta.depth : false;
      if(vinetaLevels.indexOf(data.meta.depth) !== -1 && (!getConfigVineta || isDiferentLevel)) {
        $rootScope.$broadcast('moiSound:kill-sound');
        treeModel.showTree = false;
        preloadVideos();
      }else{
        treeModel.showTree = true;
      }
    }

    function preloadVideos() {
      videos = videos.map(function(vdo) {
        return vdo.substring(4);
      });
      PreloadAssets.cache({'videos': videos}).then(function(){
        preloadMovies = true;
      });
    }

  });

})();
