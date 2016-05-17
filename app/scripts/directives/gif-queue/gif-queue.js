(function () {
  'use strict';

  angular
    .module('moi')
    .directive('gifQueue', gifQueueDirective);

  function gifQueueDirective() {
    return {
      restrict: 'EA',
      controller: gifQueueController,
      controllerAs: 'vm',
      bindToController: true
    };
  }

  function gifQueueController($element, $filter) {
    var vm = this,
        gifs = [],
        sortedGifs,
        currentIndex;

    vm.enqueue = enqueue;

    function gifStep () {
      var nextIndex = currentIndex + 1;
      if (sortedGifs.length > nextIndex) {
        playGif(nextIndex);
      } else {
        vm.playbackFinished();
      }
    }

    function playGif(index) {
      if (!vm.clickgif) {
        currentIndex = index;
        sortedGifs[index].play().then(gifStep);
      }
    }

    function playAllGifs() {
      sortedGifs = $filter('orderBy')(gifs, 'order');
      playGif(0);
    }

    function gifLoaded(gifController) {
      vm.loadedGif();
      gifs.push(gifController);
      var queueSize = $element.find('gif-no-loop').length;
      if (gifs.length === queueSize) {
        playAllGifs();
      }
    }

    function enqueue(gifController) {
      vm.playbackFinished = gifController.callback;
      vm.loadedGif = gifController.loaded;
      vm.clickgif = gifController.clickgif;
      gifController.load().then(gifLoaded);
    }
  }
})();
