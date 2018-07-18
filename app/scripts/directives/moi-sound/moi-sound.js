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
        autoPlay: '=',
        callback: '&',
        volume: '=',
        onlyPlay: '='
      },
      controller: moiSoundController,
      controllerAs: 'vmSound',
      bindToController: true
    };
  }

  function moiSoundController($q,
                              $scope,
                              $element,
                              $rootScope) {
    var vmSound = this;

    vmSound.$audio = $element.find('audio');
    vmSound.play = play;
    vmSound.stop = stop;
    vmSound.getAudioType = getAudioType;
    vmSound.soundType = vmSound.getAudioType(vmSound.sound);

    function init(){
      preloadAudio().then(function () {
        audioHasLoaded();
        autoPlay();
      });
    }

    function preloadAudio() {
      return listenForWebAudio();
    }

    function listenForWebAudio() {
      var deferred = $q.defer();
      vmSound.$audio.on('canplaythrough', deferred.resolve);
      return deferred.promise;
    }

    function audioHasLoaded() {
      $scope.$emit('audioLoaded', vmSound);
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
      vmSound.$audio[0].volume = vmSound.volume || 1;
      vmSound.$audio[0].play();
      if(!vmSound.onlyPlay){
        vmSound.$audio[0].onended = vmSound.callback;
      }
    }

    function stop() {
      vmSound.$audio[0].pause();
    }

    $rootScope.$on('moiSound:kill-sound', stop);
    init();
  }
})();
