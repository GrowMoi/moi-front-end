(function () {
  'use strict';

  describe('moiSidebar', function () {
    var $compile,
        $scope,
        element,
        controller;

    beforeEach(module('moi.directives'));
    beforeEach(module('moi.templates'));

    beforeEach(inject(
      function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
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
      it('should not have controller', function(){
        chai.expect(controller).to.deep.equals(undefined);
      });
    });
  });
})();
