(function () {
  'use strict';

  describe('TreeController', function () {
    var ctrl, $controller, $scope, dependencies, $rootScope, $state;
    beforeEach(module('moi.controllers'));
    beforeEach(angular.mock.module(function ($provide) {
      $provide.provider('$state', function () {
        return {
          $get: function () {
            return {
              go: function(){
                return null;
              }
            };
          }
        };
      });

    }));
    beforeEach(inject(
      function (_$controller_,
                _$rootScope_, _$state_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $state = _$state_;

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

      it('user should go to contents', function(){
        var spy = sinon.spy($state, 'go');
        ctrl.transitionToContent();
        chai.expect(spy.called).to.be.equal(true);
      });
    });

  });
})();
