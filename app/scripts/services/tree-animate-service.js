(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('TreeAnimateService', TreeAnimateService);

    function TreeAnimateService() {
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

      function animateWidget(element){
        var $widgetToAnimate = element;
        var cssClass = 'animated zoomIn';
        $widgetToAnimate.addClass(cssClass).one(animationEnd, function() {
          $widgetToAnimate.removeClass(cssClass);
        });
      }

      function getTempData(key){
        return tempData[key];
      }

    }
  })();
