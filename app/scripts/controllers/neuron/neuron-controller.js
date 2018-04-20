(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('NeuronController',
    function (data,
              $scope,
              $timeout,
              $auth,
              AdviceService,
              storage,
              SocialService) {

    var vmNeuron = this,
        ApiButtons = null,
        ApiContent = null,
        timeoutPromise = null;
    var positionAdvice = ((storage.neuron && storage.neuron.advices[0]) && (storage.content && storage.content.advices[0])) ? 1 : 0;
    vmNeuron.frameOptions = {
      type: 'content_max',
      advices: AdviceService.getStatic('neuron', positionAdvice, storage)
    };

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
        settings: $auth.user.content_preferences,
        maxLevel: 3,
        minLevel: 1,
        onSelect: onSelectItem,
        externalAnimationIdle: true,
        onRegisterApi: onRegisterApiContents
      };
    }

    init();

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
        hideAdvice();
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

    $scope.$on('neuron:remove-content', hideAdvice);

    function hideAdvice(){
      var advicesSaved = storage.neuron && storage.neuron.advices;
      if(vmNeuron.frameOptions.advices.length > 0 && (advicesSaved && advicesSaved[1])){
        vmNeuron.frameOptions.advices[0].show = false;
      }
    }

    function shareNeuron() {
      var data = {
        title: vmNeuron.neuron.contents[0].title,
        media: vmNeuron.neuron.contents[0].media[0],
        description: vmNeuron.neuron.contents[0].description
      };
      SocialService.showModal(data);
    }
  });
})();
