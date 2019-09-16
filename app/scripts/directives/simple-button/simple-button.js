(function() {
  'use strict';

  angular
    .module('moi.directives')
    .directive('simpleButton', simpleButton);

  function simpleButton() {
    var directive = {
      restrict: 'AE',
      templateUrl: 'templates/directives/simple-button/simple-button.html',
      scope: {
        options: '='
      },
      controller: simpleButtonController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  function simpleButtonController($scope, $q, $auth) {

    var vm = this,
      language = $auth.user.language,
      options,
      src,
      //sounds
      audioLoadDefer = $q.defer(),
      moiSound;

    /* sound */
    $scope.$on('audioLoaded', function (e, moiSoundInstance) {
      moiSound = moiSoundInstance;
      audioLoadDefer.resolve();
    });

    function init() {
      if(vm.options){
        vm.tooltip = language === 'es' ? vm.options.name : vm.options.nameEn;
      }
      options = vm.options || {};
      src = options.src;
      vm.css = {
        'background': 'url(' + src + ')',
        'background-size': '100%',
        'background-repeat': 'no-repeat'
      };
      vm.increaseSize = increaseSize;
      vm.onClick = onClick;
      vm.endSound = endSound;
    }

    function onClick() {
      if (options.readOnly) {
        vm.options.onClickReadOnly();
        return;
      }else {
        moiSound.play();
      }
    }

    function endSound() {
      vm.options.finishedSound();
    }

    init();

    function increaseSize(increase) {
      vm.css.transition= '0.2s ease-in-out';
      var scale = 1 + '.10';
      if (increase) {
        vm.css.transform = 'scale(' + scale + ')';
      }else{
        delete vm.css.transform;
      }
    }

  }
})();
