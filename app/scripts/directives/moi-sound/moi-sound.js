(function () {
  'use strict';

  angular
    .module('moi.directives')
    .directive('moiSound', moiSoundDirective);

  function moiSoundDirective() {
    return {
      restrict: 'EA',
      templateUrl: 'templates/directives/moi-sound/moi-sound.html',
      scope: {
        sound: '@',
        autoPlay: '@'
      },
      controller: moiSoundController,
      controllerAs: 'vmSound',
      bindToController: true
    };
  }

  function moiSoundController($element, $q, $scope, $rootScope) {
    var vmSound = this,
        $audio = $element.find('audio');

    vmSound.play = play;
    vmSound.getAudioType = getAudioType;
    vmSound.soundType = vmSound.getAudioType(vmSound.sound);

    loadAudio();
    autoPlay();
    listenStateChange();

    function loadAudio() {
      $audio.on('canplaythrough', function () {
        $scope.$emit('audioLoaded', vmSound);
      });
    }

    function autoPlay() {
      if (vmSound.autoPlay) {
        play();
      }
    }

    function getAudioType(soundUrl){
      var splittedSound = soundUrl.split('.'),
          extension = splittedSound[splittedSound.length-1];

      return 'audio/' + extension;
    }

    function play() {
      $audio[0].play();
    }

    function listenStateChange() {
      $rootScope.$on('$stateChangeStart', stop);
    }

    function stop() {
      $audio[0].pause();
    }
  }
})();
