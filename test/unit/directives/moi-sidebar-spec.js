(function () {
  'use strict';

  describe('moiSidebar', function () {
    var $compile,
        $controller,
        $scope,
        element,
        controller,
        stateMock,
        dependencies,
        ctrl;

    beforeEach(module('moi.directives'));
    beforeEach(module('moi.templates'));

    beforeEach(inject(
      function (_$compile_,
                _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
        stateMock = { go: sinon.stub() };

        dependencies = {
          $state: stateMock,
        };

        ctrl = $controller('sidebarController', dependencies);

      })
    );

    beforeEach(function(){
      element = angular.element(
        '<moi-sidebar></moi-sidebar>'
      );
      $compile(element)($scope);
      $scope.$digest();
      controller = element.controller('moiSidebar');
    });

    describe('#init', function(){
    });

  });
})();
