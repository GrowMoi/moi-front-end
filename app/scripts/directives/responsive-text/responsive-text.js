  (function () {
    'use strict';

    angular
      .module('moi.directives')
      .directive('responsiveText', responsiveTextDirective);
      function responsiveTextDirective($timeout) {
        var directive = {
          restrict: 'EA',
          scope: {
            height: '='
          },
          link: function(scope, element) {
                    resize(scope, element, $timeout);
                }
        };

        return directive;
      }
        function resize(scope, element, $timeout) {
          $timeout(function(){
            var heightDivInit = scope.height;
            var fontSize = parseFloat(element.css('font-size'));
            var fontSizeCalc = fontSize;
            var heightDiv = parseFloat(element.height());
            var heightDivCalc = heightDiv;

            while (heightDivCalc >= heightDivInit) {
              fontSizeCalc = fontSizeCalc - 1;
              heightDivCalc = (fontSizeCalc * heightDiv)/fontSize;
            }
            element.css(
              {
                fontSize: fontSizeCalc,
                height: heightDivInit
              }
            );
          });
        }
  })();
