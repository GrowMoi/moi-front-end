(function () {
  'use strict';

  describe('moiInfiniteGridContentsDirective', function () {
    var $compile, $scope, options, template, controller, $q;
    var expect = chai.expect;

    beforeEach(module('moi.directives'));
    beforeEach(module('moi.templates'));

    beforeEach(inject(
      function (_$q_, _$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
        $q = _$q_;
      })
    );

    function buildDirective(scope) {
      template = $compile('<moi-infinite-grid-contents options="options"></moi-infinite-grid-contents>')(scope || $scope);
      $scope.$digest();

      controller = template.controller('moiInfiniteGridContents');
    }

    describe('moiInfiniteGridContents init', function(){

      it('should merge the default options', function(){
        options = $scope.options = {};
        buildDirective();

        var defaultOptions = {
          apiCallHandler: null,
          showDeleteIcon: false,
          promiseDataAccessor: null,
          onRegisterApi: null
        };
        expect(controller.options).to.deep.equal(defaultOptions);
      });

      it('apiCallHandler should be called with param 1', function(){
        var spy = sinon.spy();
        $scope.options = {
          apiCallHandler: spy
        };
        buildDirective();
        expect(controller.noMoreItemsAvailable).to.equal(true);
        expect(spy.calledWith(1)).to.equal(true);
      });

      it('apiCallHandler callback should be called if is promise', function(){
        var deferredApiCall = $q.defer();
        var promise = deferredApiCall.promise;
        var spy = sinon.spy(promise, 'then');
        var stub = sinon.stub().returns(promise);
        options = $scope.options = {
          apiCallHandler: stub
        };
        buildDirective();
        deferredApiCall.resolve();
        $scope.$digest();
        sinon.assert.calledOnce(spy);
      });

      it('apiCallHandler callback should not be called', function(){
        var spy = sinon.spy();
        var stub = sinon.stub().returns(spy);
        options = $scope.options = {
          apiCallHandler: stub
        };
        buildDirective();
        sinon.assert.notCalled(spy);
      });

      it('promiseDataAccessor should be called', function(){
        var deferredApiCall = $q.defer();
        var stub = sinon.stub().returns({
          items: 4,
          totalItems: 10
        });
        $scope.options = {
          apiCallHandler: function () {
            return deferredApiCall.promise;
          },
          promiseDataAccessor: stub
        };
        buildDirective();
        var backendData = {
          data: [{id: 1},{id: 2},{id: 3}]
        };
        deferredApiCall.resolve(backendData);
        $scope.$digest();

        sinon.assert.calledWith(stub, backendData);
      });

      it('noMoreItemsAvailable should be false if totalItems > itemsPerPage', function(){
        var deferredApiCall = $q.defer();
        var stub = sinon.stub().returns({
          items: 4,
          totalItems: 10
        });
        $scope.options = {
          apiCallHandler: function () {
            return deferredApiCall.promise;
          },
          itemsPerPage: 4,
          promiseDataAccessor: stub
        };
        buildDirective();
        var backendData = {
          data: [{id: 1},{id: 2},{id: 3}]
        };
        deferredApiCall.resolve(backendData);
        $scope.$digest();
        expect(controller.noMoreItemsAvailable).to.equal(false);
        sinon.assert.calledWith(stub, backendData);
        expect(controller.loadMoreItems).to.be.a('function');
      });


      it('items should contain data', function(){
        var deferredApiCall = $q.defer();
        $scope.options = {
          apiCallHandler: function () {
            return deferredApiCall.promise;
          },
          promiseDataAccessor: function (data) {
            return {
              items: data.data,
              totalItems: 10
            };
          }
        };
        buildDirective();
        var backendData = {
          data: [{id: 1},{id: 2},{id: 3}]
        };
        deferredApiCall.resolve(backendData);
        $scope.$digest();
        expect(controller.items).to.deep.equal([{id: 1},{id: 2},{id: 3}]);
      });

      it('items should concatenate the backend items', function(){
        var deferredApiCall = $q.defer();
        var deferredApiCall2 = $q.defer();
        var stub = sinon.stub();
        stub.onCall(0).returns(deferredApiCall.promise);
        stub.onCall(1).returns(deferredApiCall2.promise);
        $scope.options = {
          apiCallHandler: stub,
          promiseDataAccessor: function (data) {
            return {
              items: data.data,
              totalItems: 8
            };
          }
        };
        buildDirective();
        var backendData1 = {
          data: [{id: 1},{id: 2},{id: 3}]
        };
        var backendData2 = {
          data: [{id: 4},{id: 5},{id: 6}]
        };
        deferredApiCall.resolve(backendData1);
        $scope.$digest();
        controller.loadMoreItems();
        deferredApiCall2.resolve(backendData2);
        $scope.$digest();

        expect(controller.items).to.deep.equal([{id: 1},{id: 2},{id: 3}, {id: 4},{id: 5},{id: 6}]);

      });

      it('noMoreItemsAvailable should be true', function(){
        var deferredApiCall = $q.defer();
        var deferredApiCall2 = $q.defer();
        var stub = sinon.stub();
        stub.onCall(0).returns(deferredApiCall.promise);
        stub.onCall(1).returns(deferredApiCall2.promise);
        $scope.options = {
          apiCallHandler: stub,
          promiseDataAccessor: function (data) {
            return {
              items: data.data,
              totalItems: 8
            };
          }
        };
        buildDirective();
        var backendData1 = {
          data: [{id: 1},{id: 2},{id: 3}, {id: 4}]
        };
        var backendData2 = {
          data: [{id: 5},{id: 6}, {id: 7},{id: 8}]
        };
        deferredApiCall.resolve(backendData1);
        $scope.$digest();
        controller.loadMoreItems();
        deferredApiCall2.resolve(backendData2);
        $scope.$digest();
        expect(controller.noMoreItemsAvailable).to.equal(true);
      });


      it('apiCallHandler should be called with new params', function(){
        var deferredApiCall = $q.defer();
        var deferredApiCall2 = $q.defer();
        var stub = sinon.stub();
        stub.onCall(0).returns(deferredApiCall.promise);
        stub.onCall(1).returns(deferredApiCall2.promise);
        $scope.options = {
          apiCallHandler: stub,
          promiseDataAccessor: function (data) {
            return {
              items: data.data,
              totalItems: 8
            };
          }
        };
        buildDirective($scope);
        var backendData1 = {
          data: [{id: 1},{id: 2},{id: 3}, {id: 4}]
        };
        var backendData2 = {
          data: [{id: 5},{id: 6}, {id: 7},{id: 8}]
        };
        deferredApiCall.resolve(backendData1);
        $scope.$digest();
        controller.loadMoreItems();
        deferredApiCall2.resolve(backendData2);
        $scope.$digest();

        sinon.assert.calledTwice(stub);
        sinon.assert.calledWith(stub, 1);
        sinon.assert.calledWith(stub, 2);
      });


      it('OnRegisterApi callbacks: onSelectDelete', function(){
        var spy = sinon.spy();
        var directiveApi = null;
        $scope.options = {
          showDeleteIcon: true,
          onRegisterApi: function(api) {
            directiveApi = api;
          }
        };
        buildDirective();
        directiveApi.onSelectDelete(spy);
        controller.onClickDelete();
        sinon.assert.calledOnce(spy);
      });

    });
  });
})();
