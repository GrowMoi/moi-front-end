(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('TreeController', function ($state) {
    var vm = this;
    vm.contents = contents;
    vm.treePath = 'images/arbol.gif';
    vm.nodePath = 'images/bola_amarilla.gif';

    function contents(){
      debugger
      // $state.go('neuron');
    }

  });

})();
