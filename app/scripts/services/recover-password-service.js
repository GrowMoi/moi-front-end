(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('RecoverPasswordService', RecoverPasswordService);

    function RecoverPasswordService($http, $q, ENV) {
      var service = {
        validate: validate,
        recover: recover
      };

      return service;

      /*jshint camelcase: false */
      function validate(username, email) {
        return $http({
          method: 'GET',
          url: ENV.apiHost + '/api/users/pacifico_recover_password/validate',
          params: {
            username: username,
            email: email
          }
        }).then(function success(res) {
          return res.data;
        }, function error(err) {
          return $q.reject(err);
        });
      }

      /*jshint camelcase: false */
      function recover(user_id, content_reading_id, content_id) {
        return $http({
          method: 'GET',
          url: ENV.apiHost + '/api/users/pacifico_recover_password/recover',
          params: {
            user_id: user_id,
            content_reading_id: content_reading_id,
            content_id: content_id
          }
        }).then(function success(res) {
          return res.data;
        }, function error(err) {
          return $q.reject(err);
        });
      }
    }
  })();
