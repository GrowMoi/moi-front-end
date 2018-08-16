(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('SearchesController', function($scope,
                                            $ionicLoading,
                                            $state,
                                            NeuronService,
                                            query)
  {
    var searchesmodel = this;
    searchesmodel.query = query;
    searchesmodel.reloadSearch = reloadSearch;
    searchesmodel.noMoreItemsAvailable = true;
    searchesmodel.contents = [];
    searchesmodel.neurons = [];
    searchesmodel.frameOptions = {
      type: 'marco_arbol',
      withSidebar: true,
      showBackButton: true
    };

    if(searchesmodel.query !== ''){
      search();
    }

    function reloadSearch() {
      $state.go('searches', { query: searchesmodel.query });
    }

    function search() {
      // Setup the loader
       $ionicLoading.show({
         content: 'Loading',
         animation: 'fade-in',
         showBackdrop: true,
         showDelay: 0
       });
      searchesmodel.currentPage = 1;
      NeuronService.searchNeurons(searchesmodel.query, searchesmodel.currentPage).then(function(resp) {
        searchesmodel.currentPage += 1;
        searchesmodel.neurons = resp.search.neurons;
        searchesmodel.contents = resp.search.contents;
        /*jshint camelcase: false */
        searchesmodel.totalItems = resp.meta.total_items;
        if(searchesmodel.totalItems > 8){
          searchesmodel.noMoreItemsAvailable = false;
          searchesmodel.loadMore = loadMore;
        }
      }).finally(function(){
        $ionicLoading.hide();
      });
    }

    function loadMore() {
      NeuronService.searchNeurons(searchesmodel.query, searchesmodel.currentPage).then(function(resp) {
        searchesmodel.neurons = searchesmodel.neurons.concat(resp.search.neurons);
        searchesmodel.contents = searchesmodel.contents.concat(resp.search.contents);
        searchesmodel.currentPage += 1;

        if (getItemsShownStatus()) {
          searchesmodel.noMoreItemsAvailable = true;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    }

    function getItemsShownStatus () {
      var itemsShown = searchesmodel.contents.length + searchesmodel.neurons.length;
      return itemsShown === searchesmodel.totalItems;
    }

  });
})();
