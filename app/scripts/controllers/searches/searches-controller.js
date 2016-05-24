(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('SearchesController', function(NeuronService)
  {
    var searchesmodel = this;
    searchesmodel.query = '';
    searchesmodel.search = search;

    function search() {
      NeuronService.searchNeurons(searchesmodel.query, 1).then(function(resp) {
        searchesmodel.neurons = resp.search;
        console.log('neurons', searchesmodel.neurons);
      });
    }
  });
})();
