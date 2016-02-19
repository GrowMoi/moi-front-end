(function () {
  'use strict';

  angular
    .module('moi')
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

    var contentSound = $element.children(0)[0];

    var urlSound = vmSound.sound;
    vmSound.soundType = 'audio/'.concat(urlSound.split('.')[urlSound.split('.').length-1]);

    if(vmSound.autoPlay){
      contentSound.play();
    }

  }
})();
