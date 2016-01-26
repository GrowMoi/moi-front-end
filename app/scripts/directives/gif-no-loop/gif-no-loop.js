(function () {
  'use strict';

  angular
    .module('moi')
    .directive('gifNoLoop', gifNoLoopContents);

  function gifNoLoopContents() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'templates/directives/gif-no-loop/gif-no-loop.html',
      scope: {
        path: '=',
        clickeable: '&'
      },
      controller: gifNoLoopController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  function gifNoLoopController($element){
    var vm = this;
    var contentGif = $element.children(0)[0];

    /* jshint camelcase: false */
    new SuperGif({
      gif: contentGif,
      loop_mode: false,
      auto_play: true,
      rubbable: false,
      max_width: 150,
      draw_while_loading: false
    }).load_url(vm.path);
  }

})();
