(function() {
  'use strict';

  angular
    .module('moi.services')
    .factory('InterceptorService', InterceptorService);

  function InterceptorService($injector, $q, $rootScope) {

    var service = {
      responseError: responseError,
      request: request,
      response: response
    };
    var loadingCount = 0;

    return service;

    function responseError(rejection) {
      var stateName = $injector.get('$state').current.name;
      if (rejection.status === 401 && (stateName !== 'new_login.first_step' && stateName !== 'login')) {
        $injector.get('$state').go('new_login.first_step');
        $injector.get('$ionicLoading').hide();
      } else if (rejection.status === 404) {
        var PopupService = $injector.get('PopupService'),
            auth = $injector.get('$auth'),
            popupOptions = {
              title: 'Error',
              content: rejection.statusText
            };
        PopupService.showModel('alert', popupOptions, function() {
          $injector.get('$state').go('tree', {
            username: auth.user.username
          });
        });
      }
      return $q.reject(rejection);
    }

    function request(config) {
      if (++loadingCount === 1) {
        $rootScope.$broadcast('loading:progress');
      }
      return config || $q.when(config);
    }

    function response(resp) {
      if (--loadingCount === 0) {
        $rootScope.$broadcast('loading:finish');
      }
      return resp || $q.when(resp);
    }
  }

})();
