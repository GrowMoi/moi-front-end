(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('SearchesController', function(NeuronService, $ionicLoading)
  {
    var searchesmodel = this;
    searchesmodel.query = '';
    searchesmodel.search = search;

    searchesmodel.currentPage = 1;
    searchesmodel.maxSize = 4;

    function search() {
      // Setup the loader
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        showDelay: 0
      });
      NeuronService.searchNeurons(searchesmodel.query, searchesmodel.currentPage).then(function(resp) {
        searchesmodel.neurons = resp.search;
        searchesmodel.totalItems = resp.meta.total_items;

      }).finally(function(){
        $ionicLoading.hide();
      });
    }
  });
})();
