(function(){
  'use strict';
  angular.module('moi')
  .config(function ($translateProvider) {
      $translateProvider.useSanitizeValueStrategy('sanitize');

      //English translations
      $translateProvider.translations('en', {
        'login': 'Login',
        'username': 'Username',
        'password': 'Password'
      });

      //Spanish translations
      $translateProvider.translations('es', {
        'login': 'Inicia Sesión',
        'username': 'Nombre de usuario',
        'password': 'Contraseña'
      });
      $translateProvider.preferredLanguage('es');
  });
})();
