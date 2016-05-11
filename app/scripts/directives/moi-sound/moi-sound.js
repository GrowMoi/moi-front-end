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

  function moiSoundController($q,
                              $scope,
                              $element,
                              $rootScope,
                              $ionicPlatform,
                              $window,
                              $cordovaNativeAudio) {
    var vmSound = this,
        isNativeImplementation;

    vmSound.$audio = $element.find('audio');
    vmSound.play = play;
    vmSound.stop = stop;
    vmSound.getAudioType = getAudioType;
    vmSound.soundType = vmSound.getAudioType(vmSound.sound);

    // we'll do it once the device is ready
    $ionicPlatform.ready(function () {
      isNativeImplementation = !!$window.cordova;
      preloadAudio().then(function () {
        audioHasLoaded();
        autoPlay();
        listenForStateChange();
      });
    });

    function preloadAudio() {
      if (isNativeImplementation) {
        return nativePreloadAudio();
      } else {
        return listenForWebAudio();
      }
    }

    function nativePreloadAudio() {
      var deferred = $q.defer();
      $cordovaNativeAudio.preloadComplex(
        vmSound.sound, // id
        vmSound.sound, // path
        1, // volume
        1  // voices
      ).finally(deferred.resolve);
      return deferred.promise;
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
      if (isNativeImplementation) {
        // TODO support loops
        $cordovaNativeAudio.play(vmSound.sound);
      } else {
        vmSound.$audio[0].play();
      }
    }

    function listenForStateChange() {
      $rootScope.$on('$stateChangeStart', stop);
    }

    function stop() {
      if (isNativeImplementation) {
        $cordovaNativeAudio.stop(vmSound.sound);
        // remember to unload from memory
        $cordovaNativeAudio.unload(vmSound.sound);
      } else {
        vmSound.$audio[0].pause();
      }
    }
  }
})();
