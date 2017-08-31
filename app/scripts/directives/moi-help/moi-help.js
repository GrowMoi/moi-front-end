(function () {
  'use strict';

    angular
      .module('moi.directives')
      .directive('moiHelp', moiHelp);

    function moiHelp() {
      var directive = {
        restrict: 'EA',
        templateUrl: 'templates/directives/moi-help/moi-help.html',
        scope: {
          show: '@',
          template: '@',
          styles: '@',
          position: '@',
          instructions: '@'
        },
        controller: moiHelpController,
        controllerAs: 'helpVm',
        bindToController: true
      };

      return directive;
    }

    function moiHelpController(){

    }
  })();
