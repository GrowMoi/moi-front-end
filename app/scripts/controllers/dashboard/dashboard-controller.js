(function(){
  'use strict';
  angular.module('starter.controllers', ['config'])
  .controller('DashCtrl', function($scope, $http, ENV) {
    var loadData = function(){
      $http.get(ENV.apiEndpoint + 'admin/neurons.json')
        .then(function(response){
          $scope.neurons = response.data.neurons;
        }, function(error){
          console.log(error.message);
        });
    };

    // loadData();
  });
})();
