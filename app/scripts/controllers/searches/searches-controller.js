(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('SearchesController', function($scope, $ionicLoading, NeuronService)
  {
    var searchesmodel = this;
    searchesmodel.query = '';
    searchesmodel.search = search;
    searchesmodel.currentPage = 1;

    function search() {
      // Setup the loader
       $ionicLoading.show({
         content: 'Loading',
         animation: 'fade-in',
         showBackdrop: true,
         showDelay: 0
       });
      NeuronService.searchNeurons(searchesmodel.query, searchesmodel.currentPage).then(function(resp) {
        searchesmodel.currentPage += 1;
        searchesmodel.neurons = resp.search;
        /*jshint camelcase: false */
        searchesmodel.totalItems = resp.meta.total_items;
      }).finally(function(){
        $ionicLoading.hide();
      });
    }

    searchesmodel.noMoreItemsAvailable = false;

    searchesmodel.loadMore = function() {
      NeuronService.searchNeurons(searchesmodel.query, searchesmodel.currentPage).then(function(resp) {
        searchesmodel.neurons = searchesmodel.neurons.concat(resp.search);
        /*jshint camelcase: false */
        searchesmodel.totalItems = resp.meta.total_items;
        searchesmodel.currentPage += 1;
        if ( searchesmodel.neurons.length === searchesmodel.totalItems ) {
          searchesmodel.noMoreItemsAvailable = true;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    };

    searchesmodel.neurons = [];
  });
})();
