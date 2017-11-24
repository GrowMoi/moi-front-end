(function () {
  'use strict';

  angular
    .module('moi.directives')
    .directive('ellipsisTitle', ellipsisTitleDirective);
    function ellipsisTitleDirective($window) {
      var directive = {
        restrict: 'A',
        scope: {
          height: '@',
          ellipsisTitle: '='
        },
        link: function(scope, element) {
                element[0].textContent = scope.ellipsisTitle;
                ellipsis(scope, element);
              }
      };

      function ellipsis(scope, element) {
        var heightDivInit = scope.height;
        var divVal = $window.getComputedStyle(element[0], null);
        var heightDiv = parseInt(divVal.height);
        var heightDivCalc = heightDiv;
        calculeEllipsis(heightDivCalc, heightDivInit, element);

        element.css('height', heightDivInit+'px');
      }

      function calculeEllipsis(heightDivCalc, heightDivInit, element){
        while (heightDivCalc > heightDivInit) {
          element[0].textContent = element[0].textContent.slice(0, -1);
          heightDivCalc = calculate(element, heightDivCalc);
          if(heightDivCalc <= heightDivInit){
            element[0].textContent = element[0].textContent.slice(0, -4)+ '...?';
          }
        }
      }

      function calculate(element, heightDivCalc){
        heightDivCalc = element[0].offsetHeight;
        return heightDivCalc;
      }
      return directive;
    }
})();
