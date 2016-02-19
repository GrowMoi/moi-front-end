(function () {
  'use strict';

  angular
    .module('moi')
    .directive('gifNoLoop', gifNoLoopDirective);

  function gifNoLoopDirective() {
    var directive = {
      restrict: 'EA',
      require: ['gifNoLoop', '^gifQueue'],
      templateUrl: 'templates/directives/gif-no-loop/gif-no-loop.html',
      scope: {
        order: '=',
        src: '@',
        sound: '@',
        clickeable: '&'
      },
      link: gifNoLoopLink,
      controller: gifNoLoopController,
      controllerAs: 'vm',
      bindToController: true,
      transclude: true
    };

    return directive;
  }

  function gifNoLoopLink(scope, element, attrs, controllers){
    var gifController = controllers[0],
        gifQueue = controllers[1];

    gifQueue.enqueue(gifController);
  }

  function gifNoLoopController($element, $q){
    var vm = this;
    var contentGif = $element.children(0)[0];

    var playbackDeferred = $q.defer();

    /* jshint camelcase: false */
    var gif = new SuperGif({
      gif: contentGif,
      loop_mode: false,
      auto_play: false,
      rubbable: false,
      max_width: 150,
      draw_while_loading: false,
      on_end: playbackDeferred.resolve
    });

    vm.loadGif = loadGif;
    vm.play = play;

    function loadGif() {
      var deferred = $q.defer();
      /* jshint camelcase: false */
      gif.load_url(vm.src, function () {
        deferred.resolve(vm);
      });
      return deferred.promise;
    }

    function play() {
      gif.play();
      return playbackDeferred.promise;
    }
  }

})();
