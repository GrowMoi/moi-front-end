(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('TreeController', function ($scope,
                                          $rootScope,
                                          data,
                                          PreloadAssets,
                                          AdviceService) {
    var treeModel = this;
    treeModel.neurons = data.tree;
    treeModel.meta = data.meta;
    treeModel.isBasicLevel = data.meta.depth < 5;
    var $backgroundSound = angular.element(document.querySelector('#backgroundSound'));
    treeModel.frameOptions = {
      type: 'marco_arbol',
      advices: getAdvices(),
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
      treeModel.urlVineta = PreloadAssets.shouldPreloadVideo(data);
      if(treeModel.urlVineta) {
        $backgroundSound[0].autoplay = false;
        treeModel.showTree = false;
      }else{
        treeModel.showTree = true;
      }
    }

    function getAdvices(){
      if (data.meta.depth === 1 && !localStorage.getItem('tree_advice0')){
        return AdviceService.getStatic('tree', 0);
      }else if ( data.meta.depth === 2 && !localStorage.getItem('tree_advice1')){
        return AdviceService.getStatic('tree', 1);
      }else if (localStorage.getItem('tree_advice1')){
        return AdviceService.getRandom('tree');
      }
    }
  });

})();
