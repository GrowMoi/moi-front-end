(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('AnimationService', AnimationService);

  function AnimationService() {

    var service = {
      searchButton: searchButton,
      learnButton: learnButton,
      settingButton: settingButton,
      profileButton: profileButton
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
      setting: {
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
      }
    };

    function searchButton(callbacks) {
      var search = addCallbacks(buttons.search, callbacks);
      return search;
    }

    function learnButton(callbacks) {
      var learn = addCallbacks(buttons.learn, callbacks);
      return learn;
    }

    function settingButton(callbacks) {
      var setting = addCallbacks(buttons.setting, callbacks);
      return setting;
    }

    function profileButton(callbacks) {
      var profile = addCallbacks(buttons.profile, callbacks);
      return profile;
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
