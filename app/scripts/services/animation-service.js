(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('AnimationService', AnimationService);

  function AnimationService() {

    var service = {
      getButton: getButton
    };

    var buttons = {
      search: {
        src: 'images/sprites/btn-search-sprite.png',
        frames: 30,
        repeat: false,
        speed: 50,
        sound: 'sounds/btn_search.mp3',
        playOnClick: true,
        name: 'Buscar'
      },
      recomendation: {
        src: 'images/sprites/btn-recomendation-sprite.png',
        frames: 37,
        repeat: false,
        speed: 50,
        sound: 'sounds/btn_recomendation.mp3',
        playOnClick: true,
        name: 'Recomendación Aleatoria'
      },
      learn: {
        src: 'images/sprites/btn-learn-sprite.png',
        frames: 158,
        repeat: false,
        speed: 30,
        sound: 'sounds/btn_read.mp3',
        playOnClick: true,
        name: 'Leer Contenido'
      },
      settings: {
        src: 'images/sprites/btn-settings-sprite.png',
        frames: 31,
        repeat: false,
        speed: 50,
        sound: 'sounds/btn_settings.mp3',
        playOnClick: true,
        name: 'Configuración'
      },
      profile: {
        src: 'images/sprites/btn-amigos-sprite.png',
        frames: 30,
        repeat: false,
        speed: 50,
        sound: 'sounds/btn_amigos.mp3',
        playOnClick: true,
        name: 'Mi Perfil'
      },
      share: {
        src: 'images/sprites/btn-compartir-sprite.png',
        frames: 30,
        repeat: false,
        speed: 60,
        sound: 'sounds/btn_share.mp3',
        playOnClick: true,
        name: 'Compartir'
      },
      saveTasks: {
        src: 'images/sprites/btn-save-tasks-sprite.png',
        frames: 30,
        repeat: false,
        speed: 60,
        sound: 'sounds/btn_save_tasks.mp3',
        playOnClick: true,
        name: 'Guardar Tarea'
      },
      showTasks: {
        src: 'images/sprites/btn-show-tasks-sprite.png',
        frames: 35,
        repeat: false,
        speed: 60,
        sound: 'sounds/btn_show_tasks.mp3',
        playOnClick: true,
        name: 'Tareas'
      },
      searchIdle: {
        src: 'images/sprites/btn-search-idle-sprite.png',
        frames: 40,
        repeat: false,
        speed: 50,
        playOnClick: false
      },
      recomendationIdle: {
        src: 'images/sprites/btn-recomendation-idle-sprite.png',
        frames: 44,
        repeat: false,
        speed: 50,
        playOnClick: false
      },
      learnIdle: {
        src: 'images/sprites/btn-learn-idle-sprite.png',
        frames: 45,
        repeat: false,
        speed: 50,
        playOnClick: false
      },
      overlay: {
        src: 'images/sprites/overlay-sprite.png',
        frames: 22,
        repeat: false,
        speed: 60,
        playOnClick: false
      },
      inventory: {
        src: 'images/sprites/btn-inventory-sprite.png',
        frames: 30,
        repeat: false,
        speed: 50,
        sound: 'sounds/btn_inventory.mp3',
        playOnClick: true,
        name: 'Inventario'
      },
      addFavorites: {
        src: 'images/sprites/btn-favoritos-sprite.png',
        frames: 30,
        repeat: false,
        speed: 50,
        sound: 'sounds/btn_favorites.mp3',
        playOnClick: true,
        name: 'Marcar como Favorito'
      }
    };

    function getButton(options){
      var btn = buttons[options.key];
      btn = addCallbacks(btn, options);
      return btn;
    }

    function addCallbacks(button, options) {
      var btn = angular.copy(button),
          cb = options.callbacks || {};
      btn.finishedSound = cb.finishedSound || emptyFunction;
      btn.finishedAnimation = cb.finishedAnimation || emptyFunction;
      btn.onClickReadOnly = cb.onClickReadOnly || emptyFunction;
      btn.onRegisterApi = options.onRegisterApi || emptyFunction;
      btn.readOnly = !!options.readOnly;
      return btn;
    }

    function emptyFunction() {
    }

    return service;

  }
})();
