(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('TreeService', TreeService);

  function TreeService($http, ENV, PopupService) {
    var service = {
      getNeuronsUser: getNeuronsUser,
      progressTree: progressTree
    };
    var popupOptions = { title: 'Error'};

    return service;

    function getNeuronsUser(username, neuronId) {
      var params = {
        username: username
      };
      if(neuronId){
        params.neuronId = neuronId;
      }
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/tree',
        params: params
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        if(err.status !== 404){
          popupOptions.content = err.statusText;
          PopupService.showModel('alert', popupOptions);
        }
      });
    }

    function progressTree(data) {
      var percentage = (data.current_learnt_contents * 100) / data.total_approved_contents; //jshint ignore:line
      var finalPercentage = parseFloat(percentage.toFixed(1));
      var pointPosition = (80 * finalPercentage)/100;
      var userLevel = getUserLevel(finalPercentage);
      return {
        'percentage': finalPercentage,
        'userLevel': userLevel,
        'pointPosition': parseFloat(pointPosition.toFixed(1))
      };
    }

    function getUserLevel(percentage) {
      if(percentage >= 0 && percentage < 1){
        return 1;
      }else if(percentage >= 1 && percentage < 4){
        return 2;
      }else if(percentage >= 4 && percentage < 7){
        return 3;
      }else if(percentage >= 7 && percentage < 11){
        return 4;
      }else if(percentage >= 11 && percentage < 15){
        return 5;
      }else if(percentage >= 15 && percentage < 21){
        return 6;
      }else if(percentage >= 21 && percentage < 27){
        return 7;
      }else if(percentage >= 27 && percentage < 35){
        return 8;
      }else if(percentage >= 35 && percentage < 43){
        return 9;
      }else if(percentage >= 43 && percentage < 50){
        return 10;
      }else if(percentage >= 50 && percentage < 58){
        return 11;
      }else if(percentage >= 58 && percentage < 66){
        return 12;
      }else if(percentage >= 66 && percentage < 74){
        return 13;
      }else if(percentage >= 74 && percentage < 83){
        return 14;
      }else if(percentage >= 83 && percentage < 89){
        return 15;
      }else if(percentage >= 89 && percentage < 96){
        return 16;
      }else if(percentage >= 96 && percentage < 100){
        return 17;
      }else if(percentage === 100){
        return 18;
      }
    }
  }
})();
