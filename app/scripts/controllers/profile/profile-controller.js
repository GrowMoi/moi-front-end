(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('ProfileController', function (user,
                                            achievements,
                                            $auth,
                                            $stateParams,
                                            ModalService,
                                            UserService) {

    var vmProfile = this,
        currentUser = $auth.user;
    vmProfile.user = user;
    vmProfile.awards = achievements.achievements;
    vmProfile.isCurrentUser = user.id === currentUser.id;
    vmProfile.showLeaderboard = showLeaderboard;
    vmProfile.buttonsOptions = {
      neuron: {},
      content: {},
      readOnly: vmProfile.user.id ? true : false,
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
      UserService.getLeaderboard($stateParams.userId).then(function(data){
        var dialogOptions = {
          templateUrl: 'templates/partials/modal-show-leaderboard.html',
          model: {
            leaders: data.leaders,
            /*jshint camelcase: false */
            user: data.meta.user_data,
            total_contents: data.meta.total_contents,
            hideFooter: currentUserIsLeader(data.leaders)
          }
        };
        ModalService.showModel(dialogOptions);
      });
    }

    function currentUserIsLeader(leaders){
      var leader = leaders.find(function(leader){return leader.user_id === vmProfile.user.id;}); //jshint ignore:line
      return leader ? true : false;
    }
  });
})();
