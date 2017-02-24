  (function () {
    'use strict';

    angular
      .module('moi.directives')
      .directive('responsiveText', responsiveTextDirective);
      function responsiveTextDirective($timeout, $window) {
        var directive = {
          restrict: 'EA',
          scope: {
            height: '='
          },
          link: function(scope, element) {
                    resize(scope, element);
                }
        };
        function resize(scope, element) {
          $timeout(function(){
            var heightDivInit = scope.height;
            var divVal = $window.getComputedStyle(element[0], null);
            var fontSize = parseInt(divVal.fontSize);
            var fontSizeCalc = fontSize;
            var heightDiv = parseInt(divVal.height);
            var heightDivCalc = heightDiv;

            while (heightDivCalc >= heightDivInit) {
              fontSizeCalc = fontSizeCalc - 1;
              heightDivCalc = (fontSizeCalc * heightDiv)/fontSize;
            }
            element.css('fontSize', fontSizeCalc+'px');
            element.css('height', heightDivInit+'px');
          });
        }
        return directive;
      }
  })();
