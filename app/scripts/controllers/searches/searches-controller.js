(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('SearchesController', function($scope,
                                            $ionicLoading,
                                            $state,
                                            NeuronService,
                                            queryParams,
                                            GAService)
  {
    var searchesmodel = this;
    var searchParams = queryParams ? queryParams.split('&search_by:') : null;
    searchesmodel.query = searchParams ? searchParams[0] : '';
    searchesmodel.reloadSearch = reloadSearch;
    searchesmodel.noMoreItemsAvailable = true;
    searchesmodel.contents = [];
    searchesmodel.neurons = [];
    searchesmodel.frameOptions = {
      type: 'marco_arbol',
      withSidebar: true,
      showBackButton: true,
      wholeFrame: true
    };
    searchesmodel.searchTerm = searchParams ? searchParams[1] : 'Contenidos';
    searchesmodel.searchTerms = ['Contenidos', 'Amigos'];

    if(searchesmodel.query !== ''){
      search();
    }

    function reloadSearch() {
      if (searchesmodel.query) {
        GAService.track('send', 'event', 'Buscar ' + searchesmodel.query, 'Search');
        var queryParams = searchesmodel.query + '&search_by:' + searchesmodel.searchTerm;
        $state.go('searches', { queryParams: queryParams });
      }
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
