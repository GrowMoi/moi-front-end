(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('NeuronController',
    function (data,
              $scope,
              $timeout,
              $auth) {

    var vmNeuron = this,
        ApiButtons = null,
        ApiContent = null,
        timeoutPromise = null;
    vmNeuron.frameOptions = {
      type: 'content_max',
      advices: [
        {
          position:'top-right',
          description: 'Elije el contenido que más te guste y dale doble clic para desplegarlo'
        },
        {
          position:'top-right',
          description: 'Cuando envies al test 4 contenidos, podrás comprobar tus conocimientos y hacer crecer tu árbol'
        }
      ]
    };

    /*jshint camelcase: false */
    function init(){
      vmNeuron.neuron = data;

      vmNeuron.buttonsOptions = {
        neuron: vmNeuron.neuron,
        content: vmNeuron.neuron.contents[0],
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
        }
      };

      vmNeuron.contentsOptions = {
        contents: vmNeuron.neuron.contents,
        settings: $auth.user.content_preferences,
        maxLevel: 3,
        minLevel: 1,
        onSelect: onSelectItem,
        externalAnimationIdle: true,
        onRegisterApi: onRegisterApiContents
      };
    }

    initAdvices();
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
        vmNeuron.frameOptions.advices[1].show = false;
        ApiButtons.contentSelected(content);
      }
    }

    function initAdvices(){
      var firstAdvice = localStorage.getItem('first_neuron_advice');
      if(!firstAdvice){
        localStorage.setItem('first_neuron_advice', 'true');
        vmNeuron.frameOptions.advices[0].show = true;
      }

      var secondAdvice = localStorage.getItem('second_neuron_advice');
      var firstContentAdvice = localStorage.getItem('first_content_advice');
      if(!secondAdvice && firstContentAdvice){
        localStorage.setItem('second_neuron_advice', 'true');
        vmNeuron.frameOptions.advices[1].show = true;
      }
    }

    $scope.$on('IdleStart', function() {
      ApiContent.activeAnimation();
    });

    $scope.$on('IdleEnd', function() {
      $timeout.cancel(timeoutPromise);
      timeoutPromise = null;
    });

    $scope.$on('neuron:remove-content', function(){
      vmNeuron.frameOptions.advices[1].show = false;
    });
  });
})();
