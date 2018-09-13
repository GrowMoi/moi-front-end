(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('NeuronController',
    function (data,
              $scope,
              $timeout,
              $auth,
              Advices,
              ModalService,
              SocialService,
              MediaAchievements,
              dataInventory) {

    var vmNeuron = this,
        ApiButtons = null,
        ApiContent = null,
        timeoutPromise = null,
        currentUser = $auth.user,
        lastIndexAdvice = parseInt(localStorage.getItem('neuron_advice')) || 0;
    vmNeuron.frameOptions = {
      type: 'content_max'
    };
    vmNeuron.userAchievements = dataInventory.achievements;

    /*jshint camelcase: false */
    function init(){
      vmNeuron.neuron = data;
      vmNeuron.buttonsOptions = {
        neuron: vmNeuron.neuron,
        content: vmNeuron.neuron.contents[0],
        readOnly: vmNeuron.neuron.read_only,
        onRegisterApi: onRegisterApiMoiButtons,
        externalAnimationIdle: true,
        buttons: {
          learn: true,
          search: true,
          share: true,
          recomendation: true,
          saveTask: true,
          showTasks: true,
          addFavorites: true
        },
        shareCallback: shareNeuron
      };

      vmNeuron.contentsOptions = {
        readOnly: !!vmNeuron.neuron.read_only,
        contents: vmNeuron.neuron.contents,
        settings: currentUser.content_preferences,
        maxLevel: 3,
        minLevel: 1,
        onSelect: onSelectItem,
        externalAnimationIdle: true,
        onRegisterApi: onRegisterApiContents,
        //set default theme
        theme:'moi_verde',
        isMoitheme: true
      };
      $timeout(showPassiveModal, 6000);
    }

    init();
    setTheme();

    function onRegisterApiMoiButtons(api) {
      ApiButtons = api;
      ApiButtons.finishedAnimation(function () {
        activeAnimation(ApiContent);
      });
    }

    function onRegisterApiContents(api) {
      ApiContent = api;
      ApiContent.finishedAnimation(function () {
        activeAnimation(ApiButtons);
      });
    }

    function activeAnimation(api) {
      if (!timeoutPromise) {
        timeoutPromise = $timeout(function(){
          timeoutPromise = null;
          if (api && api.activeAnimation) {
            api.activeAnimation();
          }
        }, 3000);
      }
    }

    function onSelectItem(content) {
      if (ApiButtons) {
        ApiButtons.contentSelected(content);
      }
    }

    $scope.$on('IdleStart', function() {
      ApiContent.activeAnimation();
    });

    $scope.$on('IdleEnd', function() {
      $timeout.cancel(timeoutPromise);
      timeoutPromise = null;
    });

    function showPassiveModal() {
      var dialogOptions = {
        templateUrl: 'templates/partials/modal-pasive-info.html',
        animation: 'animated flipInX',
        backdropClickToClose: true,
        model: {
          type: 'passive',
          message: Advices.neuron.messages[lastIndexAdvice]
        },
        onHide: saveIndexAdvice
      };
      ModalService.showModel(dialogOptions);
    }

    function saveIndexAdvice() {
      var nexIndexAdvice = (lastIndexAdvice < Advices.neuron.messages.length-1) ? lastIndexAdvice + 1 : 0;
      localStorage.setItem('neuron_advice', nexIndexAdvice);
    }

    function shareNeuron() {
      var data = {
        title: vmNeuron.neuron.contents[0].title,
        media: vmNeuron.neuron.contents[0].media[0],
        description: vmNeuron.neuron.contents[0].description
      };
      SocialService.showModal(data);
    }

    function setTheme() {
      if(vmNeuron.userAchievements.length > 0){
        angular.forEach(vmNeuron.userAchievements, function(achievement, index){
          if(achievement.active){
            var currentTheme = MediaAchievements[vmNeuron.userAchievements[index].number].settings.theme;
            vmNeuron.contentsOptions.theme = currentTheme;
            vmNeuron.contentsOptions.isMoitheme = currentTheme.includes('moi');
          }
        });
      }
    }
  });
})();
