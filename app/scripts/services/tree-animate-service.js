(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('TreeAnimateService', TreeAnimateService);

    function TreeAnimateService() {
      var tempData = {};
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
        var $widgetToAnimate = element;
        $widgetToAnimate.addClass(cssClass);
      }

      function getTempData(key){
        return tempData[key];
      }

    }
  })();
