(function() {
  'use strict';
  angular.module('moi.controllers')
    .controller('InventoryController', function() {
      var vm = this;

      vm.buttonsOptions = {
        neuron: null,
        content: null,
        buttons: {
          learn: true,
          search: true,
          share: true,
          recomendation: true,
          saveTask: true,
          showTasks: true
        }
      };
    });
})();
