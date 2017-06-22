(function() {
  'use strict';
  angular.module('moi.controllers')
    .controller('InventoryController', function() {
      var vmInv = this;

      vmInv.buttonsOptions = {
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
      vmInv.medalsByTab = Array(12); //jshint ignore:line
    });
})();
