(function () {
  'use strict';

  describe('SearchesController', function() {
    var ctrl,
        $controller,
        $scope,
        $ionicLoading,
        $rootScope,
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
      $provide.factory('GAService', function(){
        return {
          track: function(){
            return null;
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
          queryParams: 'abc&search_by:Contenidos'
        };

        ctrl = $controller('SearchesController', dependencies);

      })
    );

    /*jshint camelcase: false */
    describe('on search', function(){
      it('should controller.searches not add infinite scroll when total_items < 8', function(){
        var dataBackend = {search: {contents: ['contents'], neurons: ['neurons']}, meta: {total_items: 1}};
        deferred.resolve(dataBackend);
        $scope.$digest();
        chai.expect(ctrl.contents).to.deep.equals(dataBackend.search.contents);
      });

      it('should controller.searches add infinite scroll  when total_items > 8', function(){
        var dataBackend = {search: {contents: ['contents'], neurons: ['neurons']}, meta: {total_items: 9}};
        deferred.resolve(dataBackend);
        $scope.$digest();
        chai.expect(ctrl.contents).to.deep.equals(dataBackend.search.contents);
      });

      it('should controller.searches use infinite scroll', function(){
        var dataBackend = {search: {contents: ['contents'], neurons: ['neurons']}, meta: {total_items: 9}};
        deferred.resolve(dataBackend);
        $scope.$digest();
        ctrl.loadMore();
        deferred.resolve({search: {contents: ['more_contents'], neurons: ['more_neurons']}, meta: {total_items: 9}});
        $scope.$digest();
        var totalContents = ['contents', 'more_contents'];
        chai.expect(ctrl.contents).to.deep.equals(totalContents);
      });

      it('should controller.searches disabled infinite scroll', function(){
        var dataBackend = {
          search: {
            contents: [
              'contents1', 'contents2',
              'contents3', 'contents4',
              'contents5', 'contents6',
              'contents7', 'contents8'
            ],
            neurons: []
          },
          meta: {
            total_items: 9
          }
        };
        deferred.resolve(dataBackend);
        $scope.$digest();
        ctrl.loadMore();
        deferred.resolve({search: { contents: ['content9'], neurons: []}, meta: {total_items: 9}});
        $scope.$digest();
        chai.expect(ctrl.noMoreItemsAvailable).to.be.equal(true);
      });

      it('should controller.searches reload when execute a new query', function(){
        var dataBackend = {search: ['contents'], meta: {total_items: 1}};
        var searchParams = dependencies.queryParams.split('&search_by:');
        var searchQuery = searchParams[0];
        var searchBy = searchParams[1];
        deferred.resolve(dataBackend);
        $scope.$digest();
        ctrl.reloadSearch();
        chai.expect(ctrl.query).to.deep.equals(searchQuery);
        chai.expect(ctrl.searchTerm).to.deep.equals(searchBy);
      });
    });
  });
})();
