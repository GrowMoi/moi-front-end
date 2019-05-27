(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('LeaderboardService', LeaderboardService);

    function LeaderboardService($auth,
                                $state,
                                UserService,
                                ModalService) {

      var currentPage = 1,
          itemsPerPage = 10,
          total_pages = 0, //jshint ignore:line
          isGettingItems = false,
          entity = {},
          dialogOptions = {
            templateUrl: 'templates/partials/modal-show-leaderboard.html',
            model: {
              goToUser: goToUser,
              close: closeLeadeboardModal
            }
          };

      var service = {
        showLeaderboard: showLeaderboard
      };

      return service;

      function showLeaderboard(entity, fromEvent){
        entity = entity;
        UserService.getLeaderboard(entity, currentPage, itemsPerPage).then(function(data) {
            dialogOptions.model.leaders = data.leaders;
            dialogOptions.model.user = data.meta.user_data; //jshint ignore:line
            dialogOptions.model.total_contents = data.meta.total_contents; //jshint ignore:line
            dialogOptions.model.total_super_event_achievements = data.meta.total_super_event_achievements; //jshint ignore:line
            dialogOptions.model.hideFooter = isCurrentUserLeader(data.leaders);
            dialogOptions.model.nextPage = loadMoreItems;
            dialogOptions.model.fromEvent = fromEvent;
            total_pages =  data.meta.total_pages; //jshint ignore:line
            dialogOptions.model.noMoreItemsAvailable = currentPage === total_pages;//jshint ignore:line
            ModalService.showModel(dialogOptions);
            currentPage += 1;
        });
      }

      /*jshint camelcase: false */
      function loadMoreItems() {
        if (isGettingItems) {
          return;
        }
        isGettingItems = true;
        UserService.getLeaderboard(entity, currentPage, itemsPerPage).then(function(data) {
          dialogOptions.model.leaders = dialogOptions.model.leaders.concat(data.leaders);
          dialogOptions.model.hideFooter = isCurrentUserLeader(data.leaders);
          dialogOptions.model.noMoreItemsAvailable = currentPage === total_pages;//jshint ignore:line
          isGettingItems = false;
          currentPage += 1;
        });
      }

      function resetPagination() {
        currentPage = 1;
        itemsPerPage = 10;
        total_pages = 0; //jshint ignore:line
        isGettingItems = false;
        entity = {};
      }

      function isCurrentUserLeader(leaders){
        var leader = leaders.find(function(leader){return leader.user_id === $auth.user.id;}); //jshint ignore:line
        return leader ? true : false;
      }

      function goToUser(user){
        closeLeadeboardModal();
        $state.go('profile', {
          username: user.username
        });
      }

      function closeLeadeboardModal(){
        dialogOptions.model.closeModal();
        resetPagination();
      }
    }
  })();
