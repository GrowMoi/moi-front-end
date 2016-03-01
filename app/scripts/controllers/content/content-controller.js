(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('ContentController', function(content) {
    var vm = this;

    vm.content = content;

  });
})();
