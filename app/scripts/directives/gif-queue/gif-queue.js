(function () {
  'use strict';

  angular
    .module('moi')
    .directive('gifQueue', gifQueueDirective);

  function gifQueueDirective() {
    return {
      restrict: 'E',
      scope: {},
      controller: gifQueueController
    };
  }

  function gifQueueController($element, $filter) {
    var vm = this,
        gifs = [],
        sortedGifs,
        currentIndex,
        queueSize = $element.children().length;

    var playbackFinished = function () {
      console.log('all gifs finished!');
    };

    var gifStep = function () {
      var nextIndex = currentIndex + 1;
      if (sortedGifs.length > nextIndex) {
        playGif(nextIndex);
      } else {
        playbackFinished();
      }
    };

    var playGif = function (index) {
      currentIndex = index;
      sortedGifs[index].play().then(gifStep);
    };

    var playAllGifs = function () {
      sortedGifs = $filter('orderBy')(gifs, 'order');
      playGif(0);
    };

    var gifLoaded = function (gifController) {
      gifs.push(gifController);

      if (gifs.length === queueSize) {
        playAllGifs();
      }
    };

    vm.enqueue = function (gifController) {
      gifController.loadGif().then(gifLoaded);
    };
  }
})();
