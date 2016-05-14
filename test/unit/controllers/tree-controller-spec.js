/*jshint camelcase: false */
(function () {
  'use strict';

  describe('TreeController', function () {
    var ctrl, $controller, $scope, dependencies, $rootScope;
    beforeEach(module('moi.controllers'));
    beforeEach(inject(
      function (_$controller_,
                _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        dependencies = {
          $scope: $scope,
          data: {meta: {root_id: 1}}
        };

        ctrl = $controller('TreeController', dependencies);

      })
    );

    describe('on load', function(){
      it('should controller.tree be the same of data', function(){
        chai.expect(ctrl.rootId).to.deep.equals(dependencies.data.meta.root_id);
      });
    });

  });
})();
