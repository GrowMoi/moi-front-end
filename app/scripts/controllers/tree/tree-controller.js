(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('TreeController', function ($scope,
                                          $auth,
                                          $timeout,
                                          data,
                                          ModalService,
                                          TreeService,
                                          NeuronAnimateService,
                                          SocialService,
                                          TestService,
                                          AdvicesPage,
                                          AdvicesPageEn,
                                          TreeAnimateService,
                                          MoiAnimationService) {

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
    var language = $auth.user.language;
    treeModel.percentageTooltip = language === 'es' ? 'Has descubierto el ' +treeModel.percentage+ '% de tu árbol Moi': 'You have discovered the ' +treeModel.percentage+ '% of your tree Moi';
    treeModel.learnTooltip = language === 'es' ? 'Tu nivel de aprendizaje es ' +treeModel.userLevel: 'Your level of learning is ' + treeModel.userLevel;
    var currentUser = $auth.user;
    var successAnswers = localStorage.getItem('successAnswers');
    var isShowingPassiveModal = false;
    var finishedAnimations = false;

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

    //show only when a user is new
    if(data.meta.depth === 1){
      showWelcomeModal();
    }
    //show only when a user reach level 9
    if(data.meta.depth === 9){
      TestService.goFinalTest(null, currentUser.name);
    }

    initAnimations();

    function initAnimations() {
      $timeout(animateWidgets, 2000);
    }

    function showWelcomeModal(){
      var language = $auth.user.language;
      var messageWelcome = language === 'es' ?'Bienvenido '+currentUser.username+'. Este es tu árbol Moi. '+
      'Contiene grandes conocimientos y solo de ti depende su crecimiento. '+
      'Sigue tu curiosidad y descubre como hacer que se desarrolle hasta su '+
      'máxima expresión.': 'Welcome '+currentUser.username+ '. This is your Moi tree. '+
      'It contains great knowledge and its growth depends on you. '+
      'Follow your curiosity and discover how to make it develop to its '+
      'full expression.';
      var dialogContentModel = {
        message: messageWelcome,
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
      var language = $auth.user.language;
      var data = language ==='es'? {
        title: 'Así se ve mi árbol Moi',
        description: 'Hasta aquí descubrí '+learntContents+' contenidos. Tu también puedes hacer crecer tus conocimientos con Moi Aprendizaje Social'
      }:{
        title: 'This is how my Moi tree looks',
        description: 'So far I discovered '+learntContents+' contents. You can also grow your knowledge with Moi Social Learning'
      };
      SocialService.showModal(data);
    }

    $scope.$on('IdleStart', showPassiveModal);

    function showPassiveModal() {
      var isActiveMessages = (localStorage.getItem('advicesOn') === 'true');
      var message = language === 'es' ? AdvicesPage.tree.messages[0] : AdvicesPageEn.tree.messages[0];
      if(!isShowingPassiveModal && treeModel.showTree && isActiveMessages && finishedAnimations){
        var dialogOptions = {
          templateUrl: 'templates/partials/modal-pasive-info.html',
          animation: 'animated flipInX',
          backdropClickToClose: true,
          model: {
            message: message,
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
      if(oldPercentage !== treeModel.percentage){
        TreeAnimateService.setTempData('percentageTree', treeModel.percentage);
        if(!!oldPercentage){
          var percentageTreeWidget = document.querySelector('.tree-percentage');
          var levelUserWidget = document.querySelector('.level-user');
          var barAnimation = 'pulse';
          animationLevelBadge();
          MoiAnimationService.animateWidget(levelUserWidget, barAnimation).then(function(){
            MoiAnimationService.animateWidget(percentageTreeWidget, barAnimation).then(function(){
              animateNeurons();
            });
          });
        }else{
          animateNeurons();
        }
      }else {
        animateNeurons();
      }
      handlePagesViewed();
    }

    function animationLevelBadge(){
      var oldLevel = TreeAnimateService.getTempData('levelUser');
      if(oldLevel !== treeModel.userLevel){
        TreeAnimateService.setTempData('levelUser', treeModel.userLevel);
        if(!!oldLevel){
          var levelUserCountWidget = document.querySelector('.counter-container');
          var numberAnimation = 'zoomIn';
          MoiAnimationService.animateWidget(levelUserCountWidget, numberAnimation);
        }
      }
    }

    function animateNeurons(){
      if(treeModel.neurons.root.in_desired_neuron_path){ //jshint ignore:line
        $timeout(NeuronAnimateService.specialCallToAction, 1000);
      }
      $timeout(NeuronAnimateService.callToAction, 1000);
      finishedAnimations = true;
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

    function handlePagesViewed(){
      var currentPage = 'tree';
      var pagesViewed = JSON.parse(localStorage.getItem('pagesViewed'));
      if(!pagesViewed[currentPage]){
        //show passive model messages when enter for first time into the page
        showPassiveModal();
      }
      pagesViewed[currentPage] = true;
      localStorage.setItem('pagesViewed', JSON.stringify(pagesViewed));
    }

  });

})();
