(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('TreeController', function ($scope,
                                          $rootScope,
                                          data,
                                          PreloadAssets,
                                          VIDEOS,
                                          AdviceService) {
    var treeModel = this;
    treeModel.neurons = data.tree;
    treeModel.meta = data.meta;
    treeModel.isBasicLevel = data.meta.depth < 5;
    var $backgroundSound = angular.element(document.querySelector('#backgroundSound'));
    var videos = VIDEOS.paths;
    var vinetas = [
      {
        depth: 1,
        video: 'videos/introMoi.mp4'
      },
      {
        depth: 4
      },
      {
        depth: 6
      },
      {
        depth: 8
      }
    ];
    var preloadMovies = false;
    treeModel.frameOptions = {
      type: 'marco_arbol',
      advices: (data.meta.depth >= 2 && localStorage.getItem('tree_advice1')) ?
              AdviceService.getRandom('tree') : AdviceService.getStatic('tree', data.meta.depth-1),
      showBackButton: true
    };


    initVineta();

    treeModel.finishedAnimation = function() {
      $scope.$apply(function(){treeModel.showTree = true;});
      $backgroundSound[0].play();
      $backgroundSound[0].autoplay = true;
      localStorage.setItem('vinetas_animadas',JSON.stringify({'depth': data.meta.depth}));
    };

    function initVineta() {
      var getConfigVineta = JSON.parse(localStorage.getItem('vinetas_animadas'));
      var isDiferentLevel = getConfigVineta ? getConfigVineta.depth !== data.meta.depth : false;
      treeModel.urlVineta =  getVineta(data.meta.depth);
      if(treeModel.urlVineta !== '' && (!getConfigVineta || isDiferentLevel)) {
        $backgroundSound[0].autoplay = false;
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

    function getVineta(depth){
      var vinetaSelected = vinetas.filter(function(item){return item.depth === depth && item.video;});
      return vinetaSelected[0] ? vinetaSelected[0].video : '';
    }
  });

})();
