(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('TreeController', function ($state, $document) {
    var vm = this;

    vm.transitionToContent = function () {
      console.log('transitionToContent');
      $state.go('neuron');
    };

    var vid = $document[0].getElementById('music-moi');

    function playVid() {
        vid.play();
    }

    playVid();

  });

})();
