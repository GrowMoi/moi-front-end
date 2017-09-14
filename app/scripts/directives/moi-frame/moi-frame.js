(function () {
  'use strict';

    angular
      .module('moi.directives')
      .directive('moiFrame', moiFrame);

    function moiFrame() {
      var directive = {
        restrict: 'EA',
        templateUrl: 'templates/directives/moi-frame/moi-frame.html',
        scope: {
          type: '@',
          showBackButton: '=',
          advices: '='
        },
        controller: moiFrameController,
        controllerAs: 'frameVm',
        bindToController: true
      };

      return directive;
    }

    function moiFrameController(){
      var frameVm = this;

      frameVm.positions = [
        'top-frame',
        'bottom-frame',
        'left-frame',
        'right-frame'
      ];

      /*jshint camelcase: false */
      var allFrames = {
        content_max: {
          frames:[
            'images/containers/contenido_max/marcosuph.png',
            'images/containers/contenido_max/marcoinferiorh.png',
            'images/containers/contenido_max/marcoizqh.png',
            'images/containers/contenido_max/marcderh.png'
          ],
          backButton: 'images/containers/marco_arbol/back_btn.png'
        },
        marco_arbol: {
          frames:[
          'images/containers/marco_arbol/marcosuph.png',
          'images/containers/marco_arbol/marcoinferiorh.png',
          'images/containers/marco_arbol/marcoizqh.png',
          'images/containers/marco_arbol/marcderh.png'
          ],
          backButton: 'images/containers/marco_arbol/back_btn.png'
        }
      };

      frameVm.allPieces = allFrames[frameVm.type].frames;
      frameVm.imgBackButton = frameVm.showBackButton ? allFrames[frameVm.type].backButton : '';
    }
  })();
