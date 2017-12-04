(function () {
  'use strict';

    angular
      .module('moi.directives')
      .directive('moiArrow', moiArrow);

    function moiArrow() {
      var directive = {
        restrict: 'EA',
        templateUrl: 'templates/directives/moi-arrow/moi-arrow.html',
        scope: {
          onClick: '&',
          orientation: '@'
        },
        controller: MoiArrowController,
        controllerAs: 'arrowVm',
        bindToController: true
      };

      return directive;
    }

    function MoiArrowController(){
      var arrowVm = this;
      arrowVm.urlImg = arrowVm.orientation === 'right' ? 'images/flecha_1.png': 'images/flecha_2.png';
      arrowVm.name = arrowVm.orientation === 'right' ? 'Desplegar Menú': 'Colapsar Menú';
      arrowVm.increaseSize = increaseSize;
      arrowVm.css = {
        transition: '0.2s ease-in-out'
      };

      function increaseSize(increase) {
        var scale = 1 + '.15';
        if (increase) {
          arrowVm.css.transform = 'scale(' + scale + ')';
        }else{
          delete arrowVm.css.transform;
        }
      }
    }
  })();
