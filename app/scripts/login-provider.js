(function () {
  'use strict';

  angular.module('moi')
  .config(function ($authProvider, ENV) {
    $authProvider.configure({
      apiUrl: ENV.apiHost + '/api',
      emailSignInPath: '/auth/user/key_authorize',
      emailRegistrationPath: '/auth/user',
      tokenValidationPath: '/auth/user/validate_token',
      storage: 'localStorage'
    });
  });
})();
