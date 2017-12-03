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
        'email': 'Email',
        'username': 'Username',
        'password': 'Password',
        'next': 'Next',
        'new_login': 'New login',
        'old_login': 'Old login'
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
          'links': 'Links',
          'update': 'Last Update'
        }
      },
      searches: {
        'search': 'Search',
        'friends': 'Friends'
      },
      titles: {
        'personal-descripcion': 'Personal Description',
        'current-photo': 'Current Photo',
        'items': 'items',
        'title': 'Title',
        'description': 'Description'
      },
      social: {
        'title': 'Show and tell your friends!',
        'description': 'Show your progress on your Facebook timeline or any '+
                        'social media you like, although you can share via '+
                        'mail. Spread the good news!'
      },
      tasks: {
        'my_tasks': 'My Tasks',
        'notes': 'Notes',
        'recomendations': 'Recomendations',
        'tasks': 'Tasks',
        'notifications': 'Notifications',
        'favorites': 'Favorites'
      },
      quiz: {
        player: 'Player'
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
        'email': 'Correo',
        'password': 'Contraseña',
        'username': 'Nombre de Usuario',
        'next': 'Siguiente',
        'new_login': 'Nuevo Inicio de Sesión',
        'old_login': 'Antiguo Inicio de Sesión'
      },
      register:{
        'enter':  'Entrar',
        'register': 'Register',
        'user': 'Nombres y Apellidos',
        'birthday': 'Fecha de Nacimiento',
        'password': 'Contraseña',
        'password-required': 'Contraseña Actual',
        'city': 'Ciudad',
        'confirm-password': 'Confirme Contraseña',
        'country':  'País',
        'email': 'Correo Electrónico',
        'years': 'Años',
        'school': 'Escuela',
        'age': 'Edad',
        'username': 'Nombre de Usuario',
      },
      user: {
        'age': 'Edad',
        'city': 'Ciudad'
      },
      profile: {
        'edit-profile': 'Editar Perfil',
        'last-name': 'Apellidos',
        'my-profile': 'Mi  Perfil',
        'password' : 'Nueva Contraseña',
        'description-photo': 'Tu puedes subir una foto jpg, gif, or png file'
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
          'links': 'Enlaces',
          'update': 'Última Actualización: '
        }
      },
      searches: {
        'search': 'Buscar',
        'friends': 'Amigos'
      },
      buttons: {
        'edit-profile': 'Editar Perfil',
        'add-friend': 'Agregar Amigo',
        'save-changes': 'Guardar Cambios',
        'friends': 'Amigos',
        'choose-photo': 'Escoger foto',
        'upload-photo': 'Cargar foto',
        'change-password': 'Cambiar contraseña'
      },
      titles: {
        'personal-descripcion': 'Descripción Personal',
        'current-photo': 'Foto Actual',
        'items': 'items',
        'title': 'Título',
        'description': 'Descripción'
      },
      social: {
        'title': 'Muestrale a tus amigos!',
        'description': 'Muestra tu progreso en Facebook, Twitter, '+
                        'Whatsapp o vía email. Comparte las buenas noticias!'
      },
      tasks: {
        'my_tasks': 'Mis Tareas',
        'notes': 'Notas',
        'recomendations': 'Recomendaciones',
        'tasks': 'Tareas',
        'notifications': 'Notificaciones',
        'favorites': 'Favoritos'
      },
      browser: {
        'chrome': 'Para una mejor experiencia, utilice esta página con Google Chrome'
      },
      quiz: {
        player: 'Jugador'
      }
    });

    $translateProvider.preferredLanguage('es');
  });
})();
