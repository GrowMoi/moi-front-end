(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('TutorRecommendationsService', TutorRecommendationsService);

    function TutorRecommendationsService($http, ENV, PopupService, $q) {
      var service = {
        getTutorRecommendations: getTutorRecommendations
      };

      var popupOptions = { title: 'Error'};

      return service;

      function getTutorRecommendations(page) {
        return $http({
          method: 'GET',
          url: ENV.apiHost + '/api/tutors/recommendations',
          params: {
            page: page
          }
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
