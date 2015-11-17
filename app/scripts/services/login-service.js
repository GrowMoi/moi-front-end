(function(){
  'use strict';

  angular.module('starter.services')
  .factory('LoginService', function($q, $http, ENV) {
    var email, passwd;

    var makeRequest = function () {
      var url = ENV.apiEndpoint + 'users/sign_in.json';
      var data = {
        user: {
          email: email,
          password: passwd
        }
      };
      return $http.post(url, data);
    }

    var loginUser = function(email, passwd) {
      email = email;
      passwd = passwd;

      var deferred = $q.defer();
      var promise = deferred.promise;

      makeRequest().then(function (resp) {
        deferred.resolve('Welcome ' + email + '!');
      }, function (err) {
        deferred.reject('Wrong credentials.');
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
