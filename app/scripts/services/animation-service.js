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
        width: 130,
        height: 80,
        playOnClick: true,
      },
      learn: {
        src: 'images/sprites/btn-learn-sprite.png',
        frames: 150,
        repeat: false,
        speed: 30,
        sound: 'sounds/btn_read.mp3',
        width: 135,
        height: 110,
        playOnClick: true,
      },
      settings: {
        src: 'images/sprites/btn-settings-sprite.png',
        frames: 31,
        repeat: false,
        speed: 50,
        sound: 'sounds/btn_settings.mp3',
        playOnClick: true,
      },
      profile: {
        src: 'images/sprites/btn-amigos-sprite.png',
        frames: 30,
        repeat: false,
        speed: 50,
        sound: 'sounds/btn_amigos.mp3',
        playOnClick: true,
      },
      share: {
        src: 'images/sprites/btn-compartir-sprite.png',
        frames: 30,
        repeat: false,
        speed: 60,
        sound: 'sounds/btn_share.mp3',
        width: 52,
        height: 52,
        playOnClick: true,
      },
      saveTasks: {
        src: 'images/sprites/btn-save-tasks-sprite.png',
        frames: 30,
        repeat: false,
        speed: 60,
        sound: 'sounds/btn_save_tasks.mp3',
        width: 54,
        height: 54,
        playOnClick: true
      },
      recomendation: {
        src: 'images/sprites/btn-recomendation-sprite.png',
        frames: 37,
        repeat: false,
        speed: 60,
        sound: 'sounds/btn_recomendation.mp3',
        width: 110,
        height: 70,
        playOnClick: true
      },
      showTasks: {
        src: 'images/sprites/btn-show-tasks-sprite.png',
        frames: 35,
        repeat: false,
        speed: 60,
        sound: 'sounds/btn_show_tasks.mp3',
        width: 120,
        height: 80,
        playOnClick: true
      }
    };

    function getButton(options){
      var btn = buttons[options.key];
      btn = addCallbacks(btn, options.callbacks);
      return btn;
    }

    function addCallbacks(button, callbacks) {
      var btn = angular.copy(button);
      btn.finishedSound = callbacks.finishedSound || emptyFunction;
      btn.finishedAnimation = callbacks.finishedAnimation || emptyFunction;
      return btn;
    }

    function emptyFunction() {
    }

    return service;

  }
})();
