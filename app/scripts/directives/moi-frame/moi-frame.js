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
          options: '='
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
        content_max: [
            'images/containers/contenido_max/marcosuph.png',
            'images/containers/contenido_max/marcoinferiorh.png',
            'images/containers/contenido_max/marcoizqh.png',
            'images/containers/contenido_max/marcderh.png'
        ],
        marco_arbol: [
          'images/containers/marco_arbol/marcosuph.png',
          'images/containers/marco_arbol/marcoinferiorh.png',
          'images/containers/marco_arbol/marcoizqh.png',
          'images/containers/marco_arbol/marcderh.png'
        ]
      };

      frameVm.allPieces = allFrames[frameVm.options.type];
      if(frameVm.options.type ==='marco_arbol' && frameVm.options.withSidebar){
        frameVm.allPieces[2] = allFrames.content_max[2];
      }
      frameVm.imgBackButton = frameVm.options.showBackButton ? 'images/containers/back_btn.png' : '';
      frameVm.showAdvices = Array.isArray(frameVm.options.advices) && frameVm.options.advices.length>0;
      frameVm.removeAdvice = removeAdvice;

      function removeAdvice(advice) {
        if(frameVm.showAdvices) {
          var index = frameVm.options.advices.indexOf(advice);
          frameVm.options.advices.splice(index, 1);
        }
      }
    }
  })();
