(function () {
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
      if (rejection.status === 401 && (stateName !== 'login' && stateName !== 'new_login')) {
        $injector.get('$state').go('login');
        $injector.get('$ionicLoading').hide();
      }else if(rejection.status === 404){
        var popupOptions = {
         title: 'Error',
         content: rejection.statusText
        };
        var PopupService = $injector.get('PopupService');
        PopupService.showModel('alert', popupOptions, function() {
         $injector.get('$state').go('tree');
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

    function response (resp) {
      if (--loadingCount === 0) {
        $rootScope.$broadcast('loading:finish');
      }
      return resp || $q.when(resp);
    }
  }

})();
