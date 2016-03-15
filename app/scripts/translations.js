(function(){
  'use strict';
  angular.module('moi')
  .config(function ($translateProvider) {
    $translateProvider.useSanitizeValueStrategy('escapeParameters');

    $translateProvider.translations('en', {
      menu: {
        menu: 'Menu',
        neurons: 'Neurons',
        account: 'Account'
      },
      dashboard: {
        welcome: 'Welcome'
      },
      login: {
        'login': 'Login',
        'username': 'Username',
        'password': 'Password'
      },
      content: {
        'coments': 'Coments',
        'media': 'Media',
        'recommended': 'Recommended',
        'links': 'Links'
      }
    });

    $translateProvider.translations('es', {
      menu: {
        menu: 'Menú',
        neurons: 'Neuronas',
        account: 'Cuenta'
      },
      dashboard: {
        welcome: 'Bienvenido'
      },
      login: {
        'login': 'Inicia Sesión',
        'email': 'Email',
        'password': 'Contraseña'
      },
      signup: {
        'signup': 'Registrarse'
      },
      content: {
        'coments': 'Comentarios',
        'media': 'Galeria',
        'recommended': 'Recomendaciones',
        'links': 'Enlaces'
      }
    });

    $translateProvider.preferredLanguage('es');
  });
})();
