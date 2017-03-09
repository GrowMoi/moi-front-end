  (function () {
    'use strict';

    angular
      .module('moi.directives')
      .directive('responsiveText', responsiveTextDirective);
      function responsiveTextDirective($timeout, $window) {
        var directive = {
          restrict: 'EA',
          scope: {
            height: '=',
            title: '='
          },
          link: function(scope, element) {
                  element[0].textContent = scope.title;
                  resize(scope, element);
                }
        };
        function resize(scope, element) {
          var heightDivInit = scope.height;
          var divVal = $window.getComputedStyle(element[0], null);
          var fontSize = parseInt(divVal.fontSize);
          var fontSizeCalc = fontSize;
          var heightDiv = parseInt(divVal.height);
          var heightDivCalc = heightDiv;

          while (heightDivCalc < heightDivInit) {
            fontSizeCalc = fontSizeCalc + 1;
            element.css('fontSize', fontSizeCalc+'px');
            heightDivCalc = calculate(element, heightDivCalc);
          }
          element.css('height', heightDivInit+'px');
        }
        function calculate(element, heightDivCalc){
          heightDivCalc = element[0].offsetHeight;
          return heightDivCalc;
        }
        return directive;
      }
  })();
