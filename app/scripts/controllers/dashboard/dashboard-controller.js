(function(){
  'use strict';
  angular.module('starter.controllers', ['config'])
  .controller('DashCtrl', function($scope, $http, ENV) {
    var loadData = function(){
      $http.get(ENV.apiEndpoint + '/admin/neurons.json')
        .then(function(r){
          console.log(r);
          // we need work in backend. stand by
        });
    };

    loadData();
  });
})();
