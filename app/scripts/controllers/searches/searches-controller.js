(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('SearchesController', function(data)
  {
    var searchesmodel = this;

    function init(){
      searchesmodel.contents = data.contents;
      searchesmodel.results = createGroupedArray(searchesmodel.contents, 4);
    }

    init();

    function createGroupedArray(arr, chunkSize) {
      var groups = [], i;
      for (i = 0; i < arr.length; i += chunkSize) {
          groups.push(arr.slice(i, i + chunkSize));
      }
      return groups;
    }
  });
})();
