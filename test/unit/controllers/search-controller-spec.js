(function () {
  'use strict';

  describe('SearchesController', function() {
    var ctrl,
        $controller,
        $scope,
        $ionicLoading,
        $rootScope,
        $state,
        $q,
        NeuronService,
        dependencies,
        stateMock,
        deferred;

    beforeEach(module('moi.controllers'));

    beforeEach(module('moi.services', function($provide){
      $provide.factory('NeuronService', function(){
        return {
          searchNeurons: function(){
            deferred = $q.defer();
            return deferred.promise;
          }
        };
      });
    }));

    beforeEach(inject(
      function (_$controller_,
                _$rootScope_,
                _NeuronService_,
                _$q_) {

        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $ionicLoading = { show: sinon.stub(), hide: sinon.stub()};
        $q = _$q_;
        NeuronService = _NeuronService_;
        stateMock = { go: sinon.stub() };

        dependencies = {
          $scope: $scope,
          $state: stateMock,
          $ionicLoading: $ionicLoading,
          NeuronService: NeuronService,
          query: 'neuron'
        };

        ctrl = $controller('SearchesController', dependencies);

      })
    );

    describe('on search', function(){
      it('should controller.searches not add infinite scroll when total_items < 8', function(){
        var dataBackend = {search: ['neurons'], meta: {total_items: 1}};
        deferred.resolve(dataBackend);
        $scope.$digest();
        chai.expect(ctrl.neurons).to.deep.equals(dataBackend.search);
      });

      it('should controller.searches add infinite scroll  when total_items > 8', function(){
        var dataBackend = {search: ['neurons'], meta: {total_items: 9}};
        deferred.resolve(dataBackend);
        $scope.$digest();
        chai.expect(ctrl.neurons).to.deep.equals(dataBackend.search);
      });

      it('should controller.searches use infinite scroll', function(){
        var dataBackend = {search: ['neurons'], meta: {total_items: 9}};
        deferred.resolve(dataBackend);
        $scope.$digest();
        ctrl.loadMore();
        deferred.resolve({search: ['more_neurons'], meta: {total_items: 9}});
        $scope.$digest();
        var totalNeurons = ['neurons', 'more_neurons'];
        chai.expect(ctrl.neurons).to.deep.equals(totalNeurons);
      });

      it('should controller.searches disabled infinite scroll', function(){
        var dataBackend = {
          search: [
            'neurons1', 'neurons2',
            'neurons3', 'neurons4',
            'neurons5', 'neurons6',
            'neurons7', 'neurons8'
          ],
          meta: {
            total_items: 9
          }
        };
        deferred.resolve(dataBackend);
        $scope.$digest();
        ctrl.loadMore();
        deferred.resolve({search: ['neuron9'], meta: {total_items: 9}});
        $scope.$digest();
        var totalNeurons = [
            'neurons1', 'neurons2',
            'neurons3', 'neurons4',
            'neurons5', 'neurons6',
            'neurons7', 'neurons8',
            'neurons9'
        ];
        chai.expect(ctrl.noMoreItemsAvailable).to.be.equal(true);
      });

      it('should controller.searches reload when execute a new query', function(){
        var dataBackend = {search: ['neurons'], meta: {total_items: 1}};
        deferred.resolve(dataBackend);
        $scope.$digest();
        ctrl.reloadSearch();
        chai.expect(ctrl.query).to.deep.equals(dependencies.query);
      });
    });
  });
})();
