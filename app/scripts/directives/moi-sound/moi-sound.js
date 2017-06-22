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
        backgroundSound: '=',
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
                              $rootScope,
                              $ionicPlatform,
                              $window,
                              $cordovaNativeAudio,
                              SoundService) {
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
      var replaySound = vmSound.backgroundSound ? play : vmSound.callback;
      if (isNativeImplementation) {
        // TODO support loops
        $cordovaNativeAudio.play(vmSound.sound, replaySound);
      } else {
        vmSound.$audio[0].volume = vmSound.volume || 1;
        vmSound.$audio[0].play();
        if(!vmSound.onlyPlay){
          vmSound.$audio[0].onended = replaySound;
        }
      }
    }

    if(vmSound.backgroundSound){
      var soundObj = SoundService.getSound();
      if(soundObj.url !== vmSound.sound){
        if(soundObj.url){
          stopSoundService(soundObj.url, soundObj.instance);
        }
        saveSoundService();
        play();
      }
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

    function stopSoundService(urlSound, instanceSound) {
      if (isNativeImplementation) {
        instanceSound.stop(urlSound);
        instanceSound.unload(urlSound);
      } else {
        instanceSound.pause();
      }
    }

    function saveSoundService() {
      if (isNativeImplementation) {
        SoundService.setSound(vmSound.sound, $cordovaNativeAudio);
      } else {
        SoundService.setSound(vmSound.sound, vmSound.$audio[0]);
      }
    }

    $rootScope.$on('moiSound:kill-sound', function() {
      if (isNativeImplementation) {
        stopSoundService(vmSound.sound, $cordovaNativeAudio);
      } else {
        stopSoundService(vmSound.sound, vmSound.$audio[0]);
      }
    });
  }
})();
