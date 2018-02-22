(function () {
  'use strict';

  angular
    .module('moi.directives')
    .directive('tooltipMoi', tooltipMoiDirective);
    function tooltipMoiDirective($document, $compile) {
      var directive = {
        restrict: 'A',
        link: function (scope, element, attrs) {

          var tip = $compile('<div ng-class="tipClass">{{ text }}<div class="tooltip-arrow"></div></div>')(scope),
              tipClassName = 'tooltip-moi',
              tipActiveClassName = 'tooltip-show';

          scope.tipClass = [tipClassName];
          scope.text = attrs.tooltipMoi;

          if(attrs.tooltipPosition) {
            scope.tipClass.push('tooltip-' + attrs.tooltipPosition);
          }
          else {
           scope.tipClass.push('tooltip-down');
          }

          element[0].addEventListener('mouseover', function (e) {
            if(scope.text !== attrs.tooltipMoi){
              scope.$apply(function() {
                scope.text = attrs.tooltipMoi;
                var positionClass = attrs.tooltipPosition ? ('tooltip-'+attrs.tooltipPosition) : 'tooltip-down';
                scope.tipClass = ['tooltip-moi', positionClass] ;
              });
            }
            $document.find('body').append(tip);
            tip.addClass(tipActiveClassName);

            var pos = e.target.getBoundingClientRect(),
                tipElement = tip[0],
                top = 0,
                left = 0,
                tipHeight = tipElement.offsetHeight,
                tipWidth = tipElement.offsetWidth,
                elWidth = pos.width || pos.right - pos.left,
                elHeight = pos.height || pos.bottom - pos.top,
                tipOffset = 10;

            if(tip.hasClass('tooltip-right')) {
              top = pos.top - (tipHeight / 2) + (elHeight / 2);
              left = pos.right + tipOffset;
            }
            else if(tip.hasClass('tooltip-left')) {
              top = pos.top - (tipHeight / 2) + (elHeight / 2);
              left = pos.left - tipWidth - tipOffset;
            }
            else if(tip.hasClass('tooltip-down')) {
              top = pos.top + elHeight + tipOffset;
              left = pos.left - (tipWidth / 2) + (elWidth / 2);
            }
            else {
              top = pos.top - tipHeight - tipOffset;
              left = pos.left - (tipWidth / 2) + (elWidth / 2);
            }

            tip.css('top', top+'px');
            tip.css('left', left+'px');
          });

          element[0].addEventListener('mouseout', function () {
            tip.remove();
          });

          element[0].addEventListener('click', function () {
            tip.remove();
          });

        }
      };
      return directive;
    }
})();
