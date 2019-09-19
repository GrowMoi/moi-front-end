(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('MoiAnimationService', MoiAnimationService);

    function MoiAnimationService($q) {

      var defScale = '1.05',
        animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

      var service = {
        increaseSize: increaseSize,
        animateWidget: animateWidget
      };

      return service;

      function increaseSize(increase, cssOpts, id) {
        var scale = cssOpts.scale ||  defScale,
            defaultStyles = {
              transform: 'scale(' + scale + ')',
              transition: '0.2s ease-in-out'
            };
        if (increase) {
          cssOpts.styles[id] = defaultStyles;
        }else{
          delete cssOpts.styles[id].transform;
        }
      }

      function animateWidget(element, animationType){
        var cssClass = 'animated '+ animationType;
        var $widgetToAnimate = angular.element(element);
        var animationDeferred = $q.defer();
        $widgetToAnimate.addClass(cssClass).one(animationEnd, function() {
          $widgetToAnimate.removeClass(cssClass);
          animationDeferred.resolve();
        });
        return animationDeferred.promise;
      }
    }
  })();
