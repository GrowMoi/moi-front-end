(function () {
  'use strict';

  describe('NeuronController', function () {
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
          data: {neuron: {id: 1}}
        };

        ctrl = $controller('NeuronController', dependencies);

      })
    );

    describe('on load', function(){
      it('should controller.neuron be the same of data', function(){
        chai.expect(ctrl.neuron).to.deep.equals(dependencies.data);
      });
    });

    describe('learn', function(){
      it('should $broadcast neuron:remove-content on learn', function(){
        var spy = sinon.spy($scope, '$broadcast');
        ctrl.learn();
        $scope.$digest();
        chai.expect(spy.called).to.be.equal(true);
      });
    });

  });
})();
