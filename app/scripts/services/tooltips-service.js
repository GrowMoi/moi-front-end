(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('TooltipsService', TooltipsService);

    function TooltipsService() {
      var service = {
        removeAllTooltips: removeAllTooltips
      };

      return service;

      function removeAllTooltips(){
        var moiTooltips = document.getElementsByClassName('tooltip-moi');
        console.log('moiTooltips.length', moiTooltips.length);
        for (var i = 0; i < moiTooltips.length; i ++) {
          var $currentNeuronElement = angular.element(moiTooltips[i]);
          console.log('i', i);
          $currentNeuronElement.remove();
        }
      }
    }
  })();
