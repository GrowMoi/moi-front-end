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

    function MoiArrowController(HoverAnimationService, $auth){
      var arrowVm = this;
      var language = $auth.user.language;
      var arrowEn = arrowVm.orientation === 'right' ? 'Display Menu': 'Collapse Menu';
      var arrowEs = arrowVm.orientation === 'right' ? 'Desplegar Menú': 'Colapsar Menú';
      arrowVm.urlImg = arrowVm.orientation === 'right' ? 'images/flecha_1.png': 'images/flecha_2.png';
      arrowVm.name = language === 'es' ? arrowEs: arrowEn;
      arrowVm.increaseSize = HoverAnimationService.increaseSize;
      arrowVm.cssOptions = {
        scale: '1.15',
        styles: []
      };
    }
  })();
