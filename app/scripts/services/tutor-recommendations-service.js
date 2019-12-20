(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('TutorRecommendationsService', TutorRecommendationsService);

    function TutorRecommendationsService($http, ENV, ModalService, $q) {
      var service = {
        getTutorRecommendations: getTutorRecommendations,
        getTutorRecommendationsDetails: getTutorRecommendationsDetails
      };

      var dialogContentModel = {
        title: 'Error',
        message: ''
      };

      var dialogOptions = {
        templateUrl: 'templates/partials/modal-error.html',
        model: dialogContentModel
      };

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
            dialogContentModel.message = err.statusText;
            ModalService.showModel(dialogOptions);
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
            dialogContentModel.message = err.statusText;
            ModalService.showModel(dialogOptions);
          }
          return $q.reject(err);
        });
      }

    }
  })();
