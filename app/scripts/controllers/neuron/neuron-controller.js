(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('NeuronController',
    function ($scope,
              data) {

    var vm = this;
    vm.learn = learn;

    function init(){
      vm.neuron = data;
    }

    init();

    function learn(){
      $scope.$broadcast('neuron:remove-content');
    }

  });

})();
