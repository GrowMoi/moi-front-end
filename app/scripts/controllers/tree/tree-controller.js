(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('TreeController', function ($scope,
                                          $rootScope,
                                          data,
                                          PreloadAssets,
                                          VIDEOS) {
    var treeModel = this;
    treeModel.neurons = data.tree;
    treeModel.meta = data.meta;
    treeModel.isBasicLevel = data.meta.depth < 5;
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
      advices: [
        {
          position:'bottom-left',
          description: 'Da clic en la neurona gris para conocer sus contenidos'
        },
        {
          position:'bottom-right',
          description: 'Elije un nuevo fruto y el camino en el que quieres aprender'
        }
      ],
      showBackButton: true
    };


    initVineta();
    initAdvices();

    treeModel.finishedAnimation = function() {
      $scope.$apply(function(){treeModel.showTree = true;});
      localStorage.setItem('vinetas_animadas',JSON.stringify({'depth': data.meta.depth}));
    };

    function initVineta() {
      var getConfigVineta = JSON.parse(localStorage.getItem('vinetas_animadas'));
      var isDiferentLevel = getConfigVineta ? getConfigVineta.depth !== data.meta.depth : false;
      treeModel.urlVineta =  getVineta(data.meta.depth);
      if(treeModel.urlVineta !== '' && (!getConfigVineta || isDiferentLevel)) {
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

    function getVineta(depth){
      var vinetaSelected = vinetas.filter(function(item){return item.depth === depth && item.video;});
      return vinetaSelected[0] ? vinetaSelected[0].video : '';
    }

    function initAdvices(){
      var firstAdvice = localStorage.getItem('first_tree_advice');
      if(!firstAdvice && data.meta.depth === 1){
        localStorage.setItem('first_tree_advice', 'true');
        treeModel.frameOptions.advices[0].show = true;
      }

      var secondAdvice = localStorage.getItem('second_tree_advice');
      if(!secondAdvice && data.meta.depth === 2){
        localStorage.setItem('second_tree_advice', 'true');
        treeModel.frameOptions.advices[1].show = true;
      }
    }
  });

})();
