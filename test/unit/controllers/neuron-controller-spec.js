(function() {
  'use strict';

  describe('NeuronController', function() {
    var ctrl,
      $controller,
      $scope,
      $auth,
      dependencies,
      $rootScope;

    beforeEach(module('moi.controllers'));

    beforeEach(inject(
      function(_$controller_,
        _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $auth = {
          user: {
            id: 1,
            email: 'admin@example.com',
            name: 'admin',
            role: 'admin',
            content_preferences: {}
          }
        };
        dependencies = {
          $scope: $scope,
          data: {
            id: 1,
            contents: [{
              id: 1
            }]
          },
          $auth: $auth
        };

        ctrl = $controller('NeuronController', dependencies);

      }));

    describe('on load', function() {
      it('should controller.neuron be the same of data', function() {
        chai.expect(ctrl.neuron).to.deep.equals(dependencies.data);
      });

      it('should load onSelect', function() {
        chai.expect(ctrl.contentsOptions.onSelect).to.be.an('function');
      });
    });

  });
})();
