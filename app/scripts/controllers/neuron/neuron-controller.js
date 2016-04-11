(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('NeuronController',
    function ($scope,
              user,
              data) {

    var vm = this;
    vm.learn = learn;
    /*jshint camelcase: false */
    vm.contentsPreferences = user.content_preferences;

    function init(){
      vm.neuron = data;
    }

    init();

    function learn(){
      $scope.$broadcast('neuron:remove-content');
    }

  });

})();
