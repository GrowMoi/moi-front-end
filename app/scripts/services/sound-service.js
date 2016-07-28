(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('SoundService', SoundService);

  function SoundService() {
    var service = {
      setSound: setSound,
      getSound: getSound
    };

    var lastSound,
        soundInstance;

    return service;

    function setSound(url, instance) {
      lastSound = url;
      soundInstance = instance;
    }

    function getSound() {
      return {'url': lastSound, 'instance': soundInstance};
    }
  }
})();
