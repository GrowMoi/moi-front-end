(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('TreeAnimateService', TreeAnimateService);

    function TreeAnimateService() {
      var tempData = {};

      var service = {
        setTempData: setTempData,
        getTempData: getTempData
      };

      return service;

      function setTempData(key, value){
        tempData[key] = value;
      }

      function getTempData(key){
        return tempData[key];
      }

    }
  })();
