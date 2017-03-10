(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('NeuronController',
    function ($scope,
              $state,
              user,
              data) {

    var vmNeuron = this;
    vmNeuron.showGifSearch = false;
    vmNeuron.showGifRead = false;
    vmNeuron.finishedAnimationSearch = finishedAnimationSearch;
    vmNeuron.finishedAnimationRead = finishedAnimationRead;
    vmNeuron.loadedGif = loadedGif;
    vmNeuron.gifLearnActive = true;

    /*jshint camelcase: false */
    function init(){
      vmNeuron.neuron = data;

      vmNeuron.contentsOptions = {
        contents: vmNeuron.neuron.contents,
        settings: user.content_preferences,
        maxLevel: 3,
        minLevel: 1,
        onSelect: onSelectItem
      };

    }

    init();

    function finishedAnimationSearch() {
      $state.go('searches');
    }

    function finishedAnimationRead() {
      $scope.$broadcast('neuron:remove-content');
    }

    function onSelectItem(content) {
      vmNeuron.gifLearnActive = !content.read;
    }

    function loadedGif(key) {
      vmNeuron[key] = true;
    }
  });

})();
