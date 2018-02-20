(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('TreeController', function ($scope,
                                          $rootScope,
                                          $auth,
                                          $timeout,
                                          data,
                                          PreloadAssets,
                                          AdviceService,
                                          ModalService,
                                          TreeService,
                                          NeuronAnimateService) {
    var treeModel = this;
    treeModel.neurons = data.tree;
    treeModel.meta = data.meta;
    var progressTree = TreeService.progressTree(treeModel.meta);
    treeModel.userLevel = progressTree.userLevel;
    treeModel.percentage = progressTree.percentage;
    treeModel.isBasicLevel = data.meta.depth < 5;
    var $backgroundSound = angular.element(document.querySelector('#backgroundSound'));
    var currentUser = $auth.user;
    var successAnswers = localStorage.getItem('successAnswers');

    treeModel.frameOptions = {
      type: 'marco_arbol',
      advices: getAdvices(),
      showBackButton: true
    };

    if(successAnswers > 0){
      treeModel.cssPoint = {
        '-webkit-animation': 'rotate 2s linear',
        'animation':'rotate 2s linear',
        'animation-iteration-count': successAnswers
      };
    }

    initVineta();

    treeModel.finishedAnimation = function() {
      $scope.$apply(function(){treeModel.showTree = true;});
      $backgroundSound[0].play();
      $backgroundSound[0].autoplay = true;
      localStorage.setItem('vinetas_animadas',JSON.stringify({'depth': data.meta.depth}));
      //show only when a user is new
      if(data.meta.depth === 1){
        showWelcomeModal();
      }
    };

    function initVineta() {
      treeModel.urlVineta = PreloadAssets.shouldPreloadVideo(data);
      if(treeModel.urlVineta) {
        $backgroundSound[0].autoplay = false;
        treeModel.showTree = false;
      }else{
        treeModel.showTree = true;
        if(treeModel.neurons.root.in_desired_neuron_path){ //jshint ignore:line
          $timeout(NeuronAnimateService.specialCallToAction, 2000);
        }else{
          $timeout(NeuronAnimateService.callToAction, 6000);
        }
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

    function showWelcomeModal(){
      var dialogContentModel = {
        message:'Bienvenido '+currentUser.username+'. Este es tu árbol Moi. '+
                'Contiene grandes conocimientos y solo de ti depende su crecimiento. '+
                'Sigue tu curiosidad y descubre como hacer que se desarrolle hasta su '+
                'máxima expresión.',
        callbacks: {
          btnCenter: ModalService.destroy
        },
        labels: {
          btnCenter: 'Ok'
        }
      };

      var dialogOptions = {
        templateUrl: 'templates/partials/modal-alert-content.html',
        model: dialogContentModel
      };
      ModalService.showModel(dialogOptions);
    }

  });

})();
