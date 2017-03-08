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
      setting: {
        'settings': 'Settings',
        'interests': 'Interest',
        'level': 'Level',
        'choose-interest': 'Choose as many as you want'
      },
      content: {
        kind: {
          'que-es': 'What?',
          'por-que-es': 'Why?',
          'como-funciona': 'How?',
          'quien-cuando-donde': 'Who/When/Where?'
        },
        max: {
          'coments': 'Coments',
          'media': 'Media',
          'recommended': 'Recommended',
          'links': 'Links'
        }
      },
      searches: {
        'search': 'Search'
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
      register:{
        'enter':  'Entrar',
        'register': 'Register',
        'user': 'nombre de usuario',
        'birthday': 'fecha de nacimiento',
        'password': 'contraseña',
        'city': 'ciudad',
        'confirm_password': 'confirme contraseña',
        'country':  'país',
        'email': 'correo electrónico'
      },
      msgs:{
        error:{
          'required': 'Vacío',
          'email': 'Ingrese un correo válido',
          'confirm-password':'No coincide con la contraseña'
        }
      },
      signup: {
        'signup': 'Registrarse'
      },
      setting: {
        'settings': 'Configuraciones',
        'interests': 'Intereses',
        'level': 'Nivel',
        'choose-interest': 'Seleciona uno o cuantos quieras'
      },
      content: {
        kind: {
          'que-es': 'Qué es?',
          'por-que-es': 'Por qué es?',
          'como-funciona': 'Cómo funciona?',
          'quien-cuando-donde': 'Quién/Cuándo/Dónde?'
        },
        max: {
          'coments': 'Comentarios',
          'media': 'Galeria',
          'recommended': 'Recomendaciones',
          'links': 'Enlaces'
        }
      },
      searches: {
        'search': 'Buscar'
      }

    });

    $translateProvider.preferredLanguage('es');
  });
})();
