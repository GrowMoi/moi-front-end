(function () {
  'use strict';

    angular
      .module('moi.directives')
      .directive('moiFrameUser', moiFrameUser);

    function moiFrameUser() {
      var directive = {
        restrict: 'EA',
        templateUrl: 'templates/directives/moi-frame-user/moi-frame-user.html',
        scope: {
          options: '='
        },
        controller: moiFrameUserController,
        controllerAs: 'frameVm',
        bindToController: true
      };

      return directive;
    }

    function moiFrameUserController(TreeService){
      var frameVm = this;
      var progressTree = (frameVm.options.content_summary) ? TreeService.progressTree(frameVm.options.content_summary) : null; //jshint ignore:line
      frameVm.userLevel = (progressTree && progressTree.userLevel) ? progressTree.userLevel.level : 0;
    }
  })();
