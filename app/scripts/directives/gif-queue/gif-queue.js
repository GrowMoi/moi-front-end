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
        currentIndex,
        queueSize = $element.children().length;

    vm.enqueue = enqueue;

    function playbackFinished(){
    }

    function gifStep () {
      var nextIndex = currentIndex + 1;
      if (sortedGifs.length > nextIndex) {
        playGif(nextIndex);
      } else {
        playbackFinished();
      }
    }

    function playGif(index) {
      currentIndex = index;
      sortedGifs[index].play().then(gifStep);
    }

    function playAllGifs() {
      sortedGifs = $filter('orderBy')(gifs, 'order');
      playGif(0);
    }

    function gifLoaded(gifController) {
      gifs.push(gifController);

      if (gifs.length === queueSize) {
        playAllGifs();
      }
    }

    function enqueue(gifController) {
      gifController.load().then(gifLoaded);
    }
  }
})();
