(function () {
    'use strict';
    
      angular
        .module('moi.directives')
        .directive('moiLoader', moiLoader);
    
      function moiLoader() {
        var directive = {
          restrict: 'EA',
          templateUrl: 'templates/directives/moi-loader/moi-loader.html',
          scope: {
            loading: '=',
            progress: '='
          }
        };
    
        return directive;
      }
    })();
    