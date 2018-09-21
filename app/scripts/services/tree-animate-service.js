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

      function animateWidget(element, animationType){
        var cssClass = 'animated '+ animationType;
        var loopAnimations = 3;
        addAnimateClass(element, cssClass, loopAnimations);
      }

      function addAnimateClass(element, cssClass, loopAnimations) {
        var $widgetToAnimate = element;
        $widgetToAnimate.addClass(cssClass).one(animationEnd, function() {
          $widgetToAnimate.removeClass(cssClass);
          loopAnimations--;
          if(loopAnimations !== 0){
            addAnimateClass(element, cssClass, loopAnimations);
          }
        });
      }

      function getTempData(key){
        return tempData[key];
      }

    }
  })();
