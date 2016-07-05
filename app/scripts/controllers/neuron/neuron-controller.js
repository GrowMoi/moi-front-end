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
    vmNeuron.initAnimationRead = initAnimationRead;
    vmNeuron.initAnimationSearch = initAnimationSearch;

    /*jshint camelcase: false */
    vmNeuron.contentsPreferences = user.content_preferences;

    function init(){
      vmNeuron.neuron = data;
    }

    init();

    function initAnimationSearch() {
      vmNeuron.showGifSearch = true;
    }

    function initAnimationRead() {
      vmNeuron.showGifRead = true;
    }

    function finishedAnimationSearch() {
      $state.go('searches');
    }

    function finishedAnimationRead() {
      $scope.$broadcast('neuron:remove-content');
      vmNeuron.showGifRead = false;
    }
  });

})();
