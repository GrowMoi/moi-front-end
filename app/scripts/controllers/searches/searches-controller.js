(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('SearchesController', function(data)
  {
    var searchesmodel = this;

    function init(){
      searchesmodel.contents = data.contents;
    }

    init();
  });
})();
