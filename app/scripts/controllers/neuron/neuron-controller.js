(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('NeuronController',
    function ($scope,
              user,
              data) {

    var vm = this;
    vm.read = read;
    /*jshint camelcase: false */
    vm.contentsPreferences = user.content_preferences;

    function init(){
      vm.neuron = data;
    }

    init();

    function read(){
      $scope.$broadcast('neuron:remove-content');
    }

  });

})();
