(function () {
  'use strict';

  angular
    .module('moi.directives')
    .directive('moiTree', moiTree);

  function moiTree() {
    var directive = {
      restrict: 'EA',
      template: '<div ng-include src="::treeVm.getTemplateUrl()"></div>',
      scope: {
        neurons: '=',
        meta: '='
      },
      controller: moiTreeController,
      controllerAs: 'treeVm',
      bindToController: true
    };

    return directive;
  }

  function moiTreeController(){
    var treeVm = this;

    treeVm.getTemplateUrl = getTemplateUrl;

    function getTemplateUrl(){
      switch (treeVm.meta.depth) {
        case 1:
          return 'templates/directives/moi-tree/tree-first-level.html';
        case 2:
          return 'templates/directives/moi-tree/tree-second-level.html';
        case 3:
          return 'templates/directives/moi-tree/tree-third-level.html';
        case 4:
          return 'templates/directives/moi-tree/tree-fourth-level.html';
        case 5:
          return 'templates/directives/moi-tree/tree-fifth-level.html';
        case 6:
          return 'templates/directives/moi-tree/tree-sixth-level.html';
        case 7:
          return 'templates/directives/moi-tree/tree-seventh-level.html';
        case 8:
          return 'templates/directives/moi-tree/tree-eighth-level.html';
        case 8:
          return 'templates/directives/moi-tree/tree-nineth-level.html';
        default:
          return 'templates/directives/moi-tree/tree-nineth-level.html';
      }
    }
  }
})();
