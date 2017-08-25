(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('ProfileController', function (user, achievements, $auth, ModalService) {

    var vmProfile = this,
        currentUser = $auth.user;
    vmProfile.user = user;
    vmProfile.awards = achievements.achievements;
    vmProfile.isCurrentUser = user.id === currentUser.id;
    vmProfile.showLeaderboard = showLeaderboard;
    vmProfile.buttonsOptions = {
      neuron: {},
      content: {},
      buttons: {
        search: true,
        recomendation: true,
        showTasks: true
      }
    };

    vmProfile.tabs = [
      {
        field:'lasts-contents',
        name: 'Ultimos 4',
        partial: 'templates/profile/partials/lasts-contents.html',
        selected: false
      },
      {
        field:'awards',
        name: 'Logros',
        partial: 'templates/profile/partials/awards.html',
        selected: false
      }
    ];

    vmProfile.leaderboard = [
      {
       name: 'Player 1',
       score: '0/10',
       time: '34s'
      },
      {
        name: 'Player 2',
        score: '5/10',
        time: '34s'
      },
      {
        name: 'Player 3',
        score: '10/10',
        time: '34s'
      },
      {
        name: 'Player 4',
        score: '8/10',
        time: '34s'
      },
      {
        name: 'Player 5',
        score: '3/10',
        time: '1min'
      }
    ];

    vmProfile.changeTab = function(field) {
      angular.forEach(vmProfile.tabs, function(tab) {
        if(tab.field === field){
          tab.selected = true;
          vmProfile.viewSelected = tab.partial;
        }else{
          tab.selected = false;
        }
      });
    };

    initTab();

    function initTab() {
      vmProfile.changeTab('lasts-contents');
    }

    function showLeaderboard(){
      var dialogOptions = {
        templateUrl: 'templates/partials/modal-show-leaderboard.html',
        model: {
          listUsers: vmProfile.leaderboard
        }
      };
      ModalService.showModel(dialogOptions);
    }
  });
})();
