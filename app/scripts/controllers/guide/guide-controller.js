(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('GuideController', function(){
    var guidemodel = this;
    guidemodel.buttonsOptions = {
      neuron: {},
      content: {},
      buttons: {
        search: true,
        recomendation: true,
        showTasks: true
      }
    };

  });
})();
