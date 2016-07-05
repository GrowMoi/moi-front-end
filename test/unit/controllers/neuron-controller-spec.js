(function () {
  'use strict';

  describe('NeuronController', function () {
    var ctrl,
        $controller,
        $scope,
        dependencies,
        $rootScope,
        stateMock;
    beforeEach(module('moi.controllers'));
    beforeEach(inject(
      function (_$controller_,
                _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        stateMock = { go: sinon.stub() };

        dependencies = {
          $scope: $scope,
          $state: stateMock,
          data: {neuron: {id: 1}},
          user: {id: 1, email: 'admin@example.com', name: 'admin', role: 'admin'}
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
      it('should $broadcast neuron:remove-content on read', function(){
        var spy = sinon.spy($scope, '$broadcast');
        ctrl.finishedAnimationRead();
        $scope.$digest();
        chai.expect(spy.called).to.be.equal(true);
      });
    });

  });
})();
