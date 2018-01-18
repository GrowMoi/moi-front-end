(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('HoverAnimationService', HoverAnimationService);

    function HoverAnimationService() {

      var defScale = '1.05';

      var service = {
        increaseSize: increaseSize
      };

      return service;

      function increaseSize(increase, cssOpts, id){
        var scale = cssOpts.scale ||  defScale,
            defaultStyles = {
              transform: 'scale(' + scale + ')',
              transition: '0.2s ease-in-out'
            };
        if (increase) {
          cssOpts.styles[id] = defaultStyles;
        }else{
          delete cssOpts.styles[id].transform;
        }
      }
    }
  })();
