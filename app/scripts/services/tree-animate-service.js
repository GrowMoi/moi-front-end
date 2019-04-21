(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('TreeAnimateService', TreeAnimateService);

    function TreeAnimateService($q) {
      var tempData = {};
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      var service = {
        setTempData: setTempData,
        getTempData: getTempData,
        animateWidget: animateWidget
      };

      return service;

      function setTempData(key, value){
        tempData[key] = value;
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

      function getTempData(key){
        return tempData[key];
      }

    }
  })();
