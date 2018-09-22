(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('TreeController', function ($scope,
                                          $auth,
                                          $timeout,
                                          data,
                                          storage,
                                          PreloadAssets,
                                          ModalService,
                                          TreeService,
                                          NeuronAnimateService,
                                          StorageService,
                                          SocialService,
                                          TestService,
                                          AdvicesPage,
                                          TreeAnimateService) {

    var treeModel = this;
    treeModel.neurons = data.tree;
    treeModel.meta = data.meta;
    var progressTree = TreeService.progressTree(treeModel.meta);
    treeModel.percentageLevel = progressTree.userLevel.percentage;
    treeModel.userLevel = progressTree.userLevel.level;
    treeModel.percentage = progressTree.percentage;
    treeModel.isBasicLevel = data.meta.depth < 5;
    treeModel.sharedTree = sharedTree;
    treeModel.randomPositionsCss = getRandomPositionCss();
    var $backgroundSound = angular.element(document.querySelector('#backgroundSound'));
    var currentUser = $auth.user;
    var successAnswers = localStorage.getItem('successAnswers');
    var isShowingPassiveModal = false;

    treeModel.frameOptions = {
      type: 'marco_arbol',
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
      }else if(currentUser.username){
        storage.tree = {'vinetas_animadas': {'depth': data.meta.depth}};
        StorageService.update(storage);
      }

      initAnimations();

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
      if(treeModel.urlVineta && currentUser.username) {
        $backgroundSound[0].autoplay = false;
        treeModel.showTree = false;
      }else{
        treeModel.showTree = true;
        initAnimations();
      }
    }

    function initAnimations() {
      if(treeModel.neurons.root.in_desired_neuron_path){ //jshint ignore:line
        $timeout(NeuronAnimateService.specialCallToAction, 2000);
      }else{
        $timeout(NeuronAnimateService.callToAction, 6000);
      }
      $timeout(animateWidgets, 2000);
      $timeout(animateNeuronAndBranch, 2000);
    }

    function showWelcomeModal(){
      var dialogContentModel = {
        message:'Bienvenido '+currentUser.username+'. Este es tu árbol Moi. '+
                'Contiene grandes conocimientos y solo de ti depende su crecimiento. '+
                'Sigue tu curiosidad y descubre como hacer que se desarrolle hasta su '+
                'máxima expresión.',
        callbacks: {
          btnCenter: function(){
            dialogContentModel.closeModal();
          }
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
      var learntContents = treeModel.meta.current_learnt_contents; //jshint ignore:line
      var data = {
        title: 'Así se ve mi árbol Moi',
        description: 'Hasta aquí descubrí '+learntContents+' contenidos. Tu también puedes hacer crecer tus conocimientos con Moi Aprendizaje Social'
      };
      SocialService.showModal(data);
    }

    $scope.$on('IdleStart', showPassiveModal);

    function showPassiveModal() {
      var isActiveMessages = (localStorage.getItem('advicesOn') === 'true');
      if(!isShowingPassiveModal && treeModel.showTree && isActiveMessages){
        var dialogOptions = {
          templateUrl: 'templates/partials/modal-pasive-info.html',
          animation: 'animated flipInX',
          backdropClickToClose: true,
          model: {
            message: AdvicesPage.tree.messages[0],
            type: 'passive',
            cssClass: 'modal-bottomRight'
          },
          onHide: function() {
            isShowingPassiveModal = false;
          }
        };

        ModalService.showModel(dialogOptions);
        isShowingPassiveModal = true;
      }
    }

    function animateWidgets() {
      var oldPercentage = TreeAnimateService.getTempData('percentageTree');
      var oldLevel = TreeAnimateService.getTempData('levelUser');

      if(oldPercentage !== treeModel.percentage){
        TreeAnimateService.setTempData('percentageTree', treeModel.percentage);
        if(!!oldPercentage){
          var percentageTreeWidget = angular.element(document.querySelector('.tree-percentage'));
          var levelUserWidget = angular.element(document.querySelector('.level-user'));
          var barAnimation = 'pulse';
          TreeAnimateService.animateWidget(percentageTreeWidget, barAnimation);
          TreeAnimateService.animateWidget(levelUserWidget, barAnimation);
        }
      }

      if(oldLevel !== treeModel.userLevel){
        TreeAnimateService.setTempData('levelUser', treeModel.userLevel);
        if(!!oldLevel){
          var levelUserCountWidget = angular.element(document.querySelector('.counter-container'));
          var numberAnimation = 'zoomIn';
          TreeAnimateService.animateWidget(levelUserCountWidget, numberAnimation);
        }
      }
    }

    function animateNeuronAndBranch(){
      var keyNeuronSelected = TreeAnimateService.getTempData('neuronSelected');
      var $neuronElement = angular.element(document.querySelector('#'+keyNeuronSelected));
      var $branchElement = angular.element(document.querySelector('.'+keyNeuronSelected));
      var isDiscovered = $branchElement.hasClass('florecida');
      if(keyNeuronSelected !== '' && isDiscovered){
        var animationTypeNeuron = 'zoomIn';
        var animationTypeBranch = 'tada';
        TreeAnimateService.animateWidget($neuronElement, animationTypeNeuron);
        TreeAnimateService.animateWidget($branchElement, animationTypeBranch);
      }
    }

    function getRandomPositionCss() {
      var minRange = 5;
      var maxRange = 30;
      var totalClouds = 3;
      var randomPositionsCss = [];
      for (var i = 0; i < totalClouds; i ++) {
        var randomPercentage = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
        var cssPosition = { 'top': randomPercentage + '%' };
        randomPositionsCss.push(cssPosition);
      }
      return randomPositionsCss;
    }

  });

})();
