(function(){
  'use strict';

  angular.module('starter.services')
  .factory('LoginService', function($q, $http, ENV) {
    var makeRequest = function (email, passwd) {
      $http.defaults.headers.common['Content-Type'] = "application/json";

      var url = ENV.apiEndpoint + 'auth/user/sign_in';
      var data = {
        email: email,
        password: passwd
      };
      return $http.post(url, data);
    }

    var loginUser = function(email, passwd) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      makeRequest(email, passwd).then(function (resp) {
        deferred.resolve('Welcome ' + email + '!');
      }, function (err) {
        deferred.reject(err);
      });

      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    };

    return {
      loginUser: loginUser
    };
  });
})();
