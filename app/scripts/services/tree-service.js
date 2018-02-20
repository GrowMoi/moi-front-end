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
      var userLevel = getUserLevel(finalPercentage);
      return {
        'percentage': finalPercentage,
        'userLevel': userLevel
      };
    }

    function getUserLevel(percentage) {
      if(percentage >= 0 && percentage < 1){
        return {
          'level': 1,
          'percentage': percentageLevel(0, 1, percentage)
      };
      }else if(percentage >= 1 && percentage < 4){
        return {
          'level': 2,
          'percentage': percentageLevel(1, 3, percentage)
        };
      }else if(percentage >= 4 && percentage < 7){
        return {
          'level': 3,
          'percentage': percentageLevel(4, 3, percentage)
        };
      }else if(percentage >= 7 && percentage < 11){
        return {
          'level': 4,
          'percentage': percentageLevel(7, 4, percentage)
        };
      }else if(percentage >= 11 && percentage < 15){
        return {
          'level': 5,
          'percentage': percentageLevel(11, 4, percentage)
        };
      }else if(percentage >= 15 && percentage < 21){
        return {
          'level': 6,
          'percentage': percentageLevel(15, 6, percentage)
        };
      }else if(percentage >= 21 && percentage < 27){
        return {
          'level': 7,
          'percentage': percentageLevel(21, 6, percentage)
        };
      }else if(percentage >= 27 && percentage < 35){
        return {
          'level': 8,
          'percentage': percentageLevel(27, 8, percentage)
        };
      }else if(percentage >= 35 && percentage < 43){
        return {
          'level': 9,
          'percentage': percentageLevel(35, 8, percentage)
        };
      }else if(percentage >= 43 && percentage < 50){
        return {
          'level': 10,
          'percentage': percentageLevel(43, 7, percentage)
        };
      }else if(percentage >= 50 && percentage < 58){
        return {
          'level': 11,
          'percentage': percentageLevel(50, 8, percentage)
        };
      }else if(percentage >= 58 && percentage < 66){
        return {
          'level': 12,
          'percentage': percentageLevel(58, 8, percentage)
        };
      }else if(percentage >= 66 && percentage < 74){
        return {
          'level': 13,
          'percentage': percentageLevel(66, 8, percentage)
        };
      }else if(percentage >= 74 && percentage < 83){
        return {
          'level': 14,
          'percentage': percentageLevel(74, 9, percentage)
        };
      }else if(percentage >= 83 && percentage < 89){
        return {
          'level': 15,
          'percentage': percentageLevel(83, 6, percentage)
        };
      }else if(percentage >= 89 && percentage < 96){
        return {
          'level': 16,
          'percentage': percentageLevel(89, 7, percentage)
        };
      }else if(percentage >= 96 && percentage < 100){
        return {
          'level': 17,
          'percentage': percentageLevel(96, 4, percentage)
        };
      }else if(percentage >= 99 && percentage === 100){
        return {
          'level': 18,
          'percentage': percentageLevel(99, 1, percentage)
        };
      }
    }

    function percentageLevel(min, diff, percentage) {
      var finalValue = ((percentage-min) * 100)/diff;
      return parseFloat(finalValue.toFixed(1));
    }
  }
})();
