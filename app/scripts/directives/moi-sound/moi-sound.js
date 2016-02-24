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

  function moiSoundController($element) {
    var vmSound = this;
    vmSound.getAudioType = getAudioType;
    vmSound.soundType = vmSound.getAudioType(vmSound.sound);

    var contentSound = $element.children(0)[0];


    if(vmSound.autoPlay){
      contentSound.play();
    }

    function getAudioType(soundUrl){
      return 'audio/'.concat(soundUrl.split('.')[soundUrl.split('.').length-1]);
    }

  }
})();
