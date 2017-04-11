(function () {
'use strict';

  angular
    .module('moi.directives')
    .directive('backButton', backButton);

  function backButton() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'templates/directives/back-button/back-button.html',
      scope: {},
      controller: BackButtonController,
      controllerAs: 'bbVm',
      bindToController: true
    };

    return directive;
  }

  function BackButtonController($window, $scope){
    var bbVm = this;
    var moiSound;
    bbVm.goBack = goBack;
    bbVm.finishedSound = finishedSound;

    function goBack(){
      moiSound.play();
    }

    $scope.$on('audioLoaded', function (e, moiSoundInstance) {
      moiSound = moiSoundInstance;
    });

    function finishedSound() {
      $window.history.back();
    }
  }
})();
