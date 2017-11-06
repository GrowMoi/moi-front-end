(function () {
'use strict';

  angular
    .module('moi.directives')
    .directive('moiVideos', moiVideos);

  function moiVideos() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'templates/directives/moi-videos/moi-videos.html',
      scope: {
        videoUrl: '@',
        videoType: '@',
        callback: '&'
      },
      controller: moiVideosController,
      controllerAs: 'vinetasVm',
      bindToController: true
    };

    return directive;
  }

  function moiVideosController($element){
    var vinetasVm = this;
    var $video = $element.find('video')[0];
    $video.currentTime = 1;
    $video.onended = vinetasVm.callback;
  }
})();
