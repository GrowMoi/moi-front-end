(function () {
  'use strict';

  angular
    .module('moi.directives')
    .directive('moiInfiniteGridContents', moiInfiniteGridContentsDirective);

  function moiInfiniteGridContentsDirective() {
    return {
      restrict: 'E',
      templateUrl: 'templates/directives/moi-infinite-grid-contents/moi-infinite-grid-contents.html',
      scope: {
        options: '='
      },
      controller: moiInfiniteGridContentsController,
      controllerAs: 'vm',
      bindToController: true
    };
  }

  function moiInfiniteGridContentsController($scope) {
    var vm = this;
    var defaultOptions = {
      apiCallHandler: null,
      showDeleteIcon: false,
      onRegisterApi: null
    };
    var emitter = {
      onSelectDeleteCb: null
    };

    var currentPage = 1;
    var itemsPerPage = 4;

    vm.options = angular.extend({}, defaultOptions, vm.options);
    vm.items = [];

    init();

    function init() {
      vm.noMoreItemsAvailable = true;
      getData(currentPage, resolveFirstApiCall);
      buildPublicApi();
    }

    function getData(page, callback) {
      var promise = null;
      var handler = vm.options.apiCallHandler;
      if (angular.isFunction(handler)) {
        promise = handler(page, itemsPerPage);
        if (isPromise(promise)) {
          promise.then(callback);
        }
      }
    }

    function resolveFirstApiCall(data) {
      var totalItems = extractAndConcatData(data);
      if(totalItems > itemsPerPage){
        vm.noMoreItemsAvailable = false;
        vm.loadMoreItems = loadMoreItems;
      }
    }

    function resolveNextApiCall(data) {
      var totalItems = extractAndConcatData(data);
      if (vm.items.length === totalItems ) {
        vm.noMoreItemsAvailable = true;
      }
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }

    function extractAndConcatData(data) {
      var totalItems = 0;
      vm.items = vm.items.concat(data.items || []);
      totalItems = data.totalItems || 0;
      return totalItems;
    }

    function loadMoreItems() {
      currentPage += 1;
      getData(currentPage, resolveNextApiCall);
    }

    function buildPublicApi() {
      if (angular.isFunction(vm.options.onRegisterApi)) {
        var api = getPublicApi();
        vm.options.onRegisterApi(api);
      }
    }

    function getPublicApi() {
      return {
        onSelectDelete: onSelectDelete,
      };
    }

    function onSelectDelete(onSelectDeleteCb) {
      emitter.onSelectDeleteCb = onSelectDeleteCb;
    }

    function isPromise(promise){
      return promise && promise.then;
    }

    vm.onClickDelete = function(item) {
      if (angular.isFunction(emitter.onSelectDeleteCb)) {
        emitter.onSelectDeleteCb(item, vm.items);
      }
    };

    vm.showDeleteIcon = function(item) {
      return vm.options.showDeleteIcon && item.learnt;
    };
  }
})();
