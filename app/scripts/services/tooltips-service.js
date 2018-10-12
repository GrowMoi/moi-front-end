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
        //remove all moi tooltips
        angular.element(moiTooltips).remove();
      }
    }
  })();
