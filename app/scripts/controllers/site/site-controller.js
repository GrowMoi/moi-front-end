(function () {
  'use strict';

  angular
    .module('moi.controllers')
    .controller('SiteController', SiteController);

  function SiteController($rootScope,
                          $ionicLoading) {

    //This must be the only place where we need to listen stateChanges
    $rootScope.$on('$stateChangeStart', function(){
      $ionicLoading.show({
        template: 'cargando...'
      });
    });

    $rootScope.$on('$stateChangeSuccess', function(){
      $ionicLoading.hide();
    });

    $rootScope.$on('$stateChangeError', function(){
      $ionicLoading.hide();
    });

  }
})();
