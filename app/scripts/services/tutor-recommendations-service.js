(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('TutorRecommendationsService', TutorRecommendationsService);

    function TutorRecommendationsService($http, ENV, PopupService, $q) {
      var service = {
        getTutorRecommendations: getTutorRecommendations,
        getTutorRecommendationsDetails: getTutorRecommendationsDetails
      };

      var popupOptions = { title: 'Error'};

      return service;

      function getTutorRecommendations(page, dataFormat) {
        var params = {
          page: page
        };
        if (dataFormat) {
          params.data_format = dataFormat;//jshint ignore:line
        }
        return $http({
          method: 'GET',
          url: ENV.apiHost + '/api/tutors/recommendations',
          params: params
        }).then(function success(res) {
          return res.data;
        }, function error(err) {
          if(err.status !== 404){
            popupOptions.content = err.statusText;
            PopupService.showModel('alert', popupOptions);
          }
          return $q.reject(err);
        });
      }


      function getTutorRecommendationsDetails() {
        return $http({
          method: 'GET',
          url: ENV.apiHost + '/api/tutors/details'
        }).then(function success(res) {
          return res.data;
        }, function error(err) {
          if(err.status !== 404){
            popupOptions.content = err.statusText;
            PopupService.showModel('alert', popupOptions);
          }
          return $q.reject(err);
        });
      }

    }
  })();
