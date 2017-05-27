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
        width: 111,
        height: 70,
        playOnClick: true
      },
      recomendation: {
        src: 'images/sprites/btn-recomendation-sprite.png',
        frames: 37,
        repeat: false,
        speed: 50,
        sound: 'sounds/btn_recomendation.mp3',
        width: 106,
        height: 70,
        playOnClick: true
      },
      learn: {
        src: 'images/sprites/btn-learn-sprite.png',
        frames: 158,
        repeat: false,
        speed: 30,
        sound: 'sounds/btn_read.mp3',
        width: 130,
        height: 105,
        playOnClick: true
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
      showTasks: {
        src: 'images/sprites/btn-show-tasks-sprite.png',
        frames: 35,
        repeat: false,
        speed: 60,
        sound: 'sounds/btn_show_tasks.mp3',
        width: 120,
        height: 80,
        playOnClick: true
      },
      searchIdle: {
        src: 'images/sprites/btn-search-idle-sprite.png',
        frames: 40,
        repeat: false,
        speed: 50,
        width: 111,
        height: 70,
        playOnClick: false
      },
      recomendationIdle: {
        src: 'images/sprites/btn-recomendation-idle-sprite.png',
        frames: 44,
        repeat: false,
        speed: 50,
        width: 106,
        height: 70,
        playOnClick: false
      },
      learnIdle: {
        src: 'images/sprites/btn-learn-idle-sprite.png',
        frames: 45,
        repeat: false,
        speed: 50,
        width: 130,
        height: 105,
        playOnClick: false
      },
      overlay: {
        src: 'images/sprites/overlay-sprite.png',
        frames: 22,
        repeat: false,
        speed: 60,
        width: 600,
        height: 300,
        playOnClick: false
      },
      inventory: {
        src: 'images/sprites/btn-inventory-sprite.png',
        frames: 30,
        repeat: false,
        speed: 50,
        sound: 'sounds/btn_inventory.mp3',
        width: 100,
        height: 60,
        playOnClick: true
      }
    };

    function getButton(options){
      var btn = buttons[options.key];
      btn = addCallbacks(btn, options.callbacks, options.onRegisterApi);
      return btn;
    }

    function addCallbacks(button, callbacks, onRegisterApi) {
      var btn = angular.copy(button),
          cb = callbacks || {};
      btn.finishedSound = cb.finishedSound || emptyFunction;
      btn.finishedAnimation = cb.finishedAnimation || emptyFunction;
      btn.onRegisterApi = onRegisterApi || emptyFunction;
      return btn;
    }

    function emptyFunction() {
    }

    return service;

  }
})();
