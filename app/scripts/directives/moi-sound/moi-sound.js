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

  function moiSoundController($element, $scope) {
    var vmSound = this;

    var contentSound = $element.children(0)[0];

    vmSound.soundType = 'audio/'.concat(vmSound.sound.split('.')[vmSound.sound.split('.').length-1]);

    if(vmSound.autoPlay){
      contentSound.play();
    }

    $scope.$on('moi-sound:stop', function(){
      contentSound.pause();
    });

  }
})();
