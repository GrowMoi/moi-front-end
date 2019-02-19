(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('EventsService', EventsService);

    function EventsService($http, ENV, PopupService) {
      var service = {
        getWeeklyEvents: getWeeklyEvents,
        getDailyEvents: getDailyEvents,
        getEventDetails: getEventDetails,
        takeEvent: takeEvent
      };
      var popupOptions = { title: 'Error'};

      return service;

      function getWeeklyEvents() {
        return $http({
          method: 'GET',
          url: ENV.apiHost + '/api/events/week'
        }).then(function success(res) {
          return res.data;
        }, function error(err) {
          if (err.status !== 404) {
            popupOptions.content = err.statusText;
            PopupService.showModel('alert', popupOptions);
          }
        });
      }

      function getDailyEvents() {
        return $http({
          method: 'GET',
          url: ENV.apiHost + '/api/events/today'
        }).then(function success(res) {
          return res.data;
        }, function error(err) {
          if(err.status !== 404){
            popupOptions.content = err.statusText;
            PopupService.showModel('alert', popupOptions);
          }
        });
      }

      function takeEvent(eventId) {
        return $http({
          method: 'POST',
          url: ENV.apiHost + '/api/users/events/' + eventId + '/take',
          data: {}
        }).then(function success(res) {
          return res;
        }, function error(err) {
          if(err.status !== 404){
            popupOptions.content = err.statusText;
            PopupService.showModel('alert', popupOptions);
          }
        });
      }

      function getEventDetails(eventId) {
        return $http({
          method: 'GET',
          url: ENV.apiHost + '/api/events/' + eventId
        }).then(function success(res) {
          return res;
        }, function error(err) {
          if(err.status !== 404){
            popupOptions.content = err.statusText;
            PopupService.showModel('alert', popupOptions);
          }
        });
      }
    }
  })();
