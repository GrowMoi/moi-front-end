(function () {
'use strict';

  angular
    .module('moi.directives')
    .directive('soundButton', soundButton);

  function soundButton() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'templates/directives/sound-button/sound-button.html',
      scope: {
        imageUrl: '@',
        actionButton: '&'
      },
      controller: SoundButtonController,
      controllerAs: 'sbVm',
      bindToController: true,
      transclude: true
    };

    return directive;
  }

  function SoundButtonController($scope){
    var sbVm = this;
    var moiSound;
    sbVm.initSound = initSound;

    function initSound(){
      moiSound.play();
    }

    $scope.$on('audioLoaded', function (e, moiSoundInstance) {
      moiSound = moiSoundInstance;
    });

  }
})();
