(function () {
  'use strict';

  angular
    .module('moi')
    .run(function(){
      Bucky.setOptions({
        active: false
      });
    });
})();
