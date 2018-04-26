(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('TreeController', function ($scope,
                                          $rootScope,
                                          $auth,
                                          $timeout,
                                          data,
                                          storage,
                                          PreloadAssets,
                                          AdviceService,
                                          ModalService,
                                          TreeService,
                                          NeuronAnimateService,
                                          StorageService,
                                          SocialService,
                                          TestService) {

    var treeModel = this;
    treeModel.neurons = data.tree;
    treeModel.meta = data.meta;
    var progressTree = TreeService.progressTree(treeModel.meta);
    treeModel.percentageLevel = progressTree.userLevel.percentage;
    treeModel.userLevel = progressTree.userLevel.level;
    treeModel.percentage = progressTree.percentage;
    treeModel.isBasicLevel = data.meta.depth < 5;
    treeModel.sharedTree = sharedTree;
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
        '-webkit-animation': 'rotate 1s linear',
        'animation':'rotate 1s linear',
        'animation-iteration-count': successAnswers
      };
      treeModel.cssBar = {
        'transition': 'height '+successAnswers+'s ease-in-out'
      };
      localStorage.setItem('successAnswers', 0);
    }

    initVineta();

    treeModel.finishedAnimation = function() {
      $scope.$apply(function(){treeModel.showTree = true;});
      $backgroundSound[0].play();
      $backgroundSound[0].autoplay = true;
      if(storage.tree){
        if(storage.tree.vinetas_animadas){ //jshint ignore:line
          storage.tree.vinetas_animadas.depth = data.meta.depth; //jshint ignore:line
        }else {
          storage.tree.vinetas_animadas = {'depth': data.meta.depth}; //jshint ignore:line
        }
        StorageService.update(storage);
      }else {
        storage.tree = {'vinetas_animadas': {'depth': data.meta.depth}};
        StorageService.update(storage);
      }
      //show only when a user is new
      if(data.meta.depth === 1){
        showWelcomeModal();
      }
      //show only when a user reach level 9
      if(data.meta.depth === 9){
        TestService.goFinalTest(null, currentUser.name);
      }
    };

    function initVineta() {
      treeModel.urlVineta = PreloadAssets.shouldPreloadVideo(data, storage);
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
      var advicesSaved = storage.tree && storage.tree.advices;
      if (data.meta.depth === 1 && !(advicesSaved && advicesSaved[0])){
        return AdviceService.getStatic('tree', 0, storage);
      }else if ( data.meta.depth === 2 && !(advicesSaved && advicesSaved[1])){
        return AdviceService.getStatic('tree', 1, storage);
      }else if (advicesSaved && advicesSaved[1]){
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
          btnCenter: function(){dialogContentModel.closeModal();}
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

    function sharedTree(){
      var data = {
        title: 'Tree',
        description: 'Screenshot'
      };
      SocialService.showModal(data);
    }

  });

})();
