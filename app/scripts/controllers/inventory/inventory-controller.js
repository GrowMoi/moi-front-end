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
      vmInv.showInventory = true;
      vmInv.urlVideo = 'videos/introMoi.mp4';
      vmInv.finishedAnimation = finishedAnimation;

      function finishedAnimation(){
        vmInv.showInventory = true;
      }
    });
})();
