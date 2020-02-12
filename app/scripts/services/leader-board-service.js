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
          preventClickEvent = false,
          entityParams = {},
          dialogOptions = {
            templateUrl: 'templates/partials/modal-show-leaderboard.html',
            model: {
              configTabs: {
                tabSelected: 'school',
                list: [
                  {
                    field:'school',
                    name: 'Escuela',
                    selected: true
                  },
                  {
                    field: 'city',
                    name: 'Ciudad',
                    selected: false
                  },
                  {
                    field: 'age',
                    name: 'Edad',
                    selected: false
                  }
                ],
                changeTab: function(field) {
                  angular.forEach(dialogOptions.model.configTabs.list, function(tab) {
                    if (tab.field === field) {
                      tab.selected = true;
                      dialogOptions.model.configTabs.tabSelected = tab.field;
                    } else {
                      tab.selected = false;
                    }
                  });
                  sortByLeaderboard();
                }
              },
              filters: [],
              sortByFilter: sortByLeaderboard,
              goToUser: goToUser,
              close: closeLeadeboardModal
            }
          };

      var service = {
        showLeaderboard: showLeaderboard
      };

      return service;

      function showLeaderboard(entity, fromEvent, onSuccess, onError){
        if (preventClickEvent) {
          return;
        }
        entityParams = entity;
        preventClickEvent = true;
        if(!fromEvent) {
          entityParams.sort_by = dialogOptions.model.configTabs.tabSelected;//jshint ignore:line
        }
        UserService.getLeaderboard(entityParams, currentPage, itemsPerPage).then(function(data) {
            dialogOptions.model.leaders = data.leaders;
            dialogOptions.model.user = data.meta.user_data; //jshint ignore:line
            dialogOptions.model.total_contents = data.meta.total_contents; //jshint ignore:line
            dialogOptions.model.total_super_event_achievements = data.meta.total_super_event_achievements; //jshint ignore:line
            dialogOptions.model.hideFooter = isCurrentUserLeader(data.leaders);
            dialogOptions.model.nextPage = loadMoreItems;
            dialogOptions.model.fromEvent = fromEvent;
            total_pages =  data.meta.total_pages; //jshint ignore:line
            dialogOptions.model.noMoreItemsAvailable = currentPage === total_pages;//jshint ignore:line
            dialogOptions.model.filters = data.meta.sort_by_options.values;//jshint ignore:line
            ModalService.showModel(dialogOptions);
            preventClickEvent = false;
            currentPage += 1;
            if (angular.isFunction(onSuccess)) {
              onSuccess(data);
            }
        }, function(err) {
          if (angular.isFunction(onError)) {
            onError(err);
          }
        });
      }

      /*jshint camelcase: false */
      function loadMoreItems() {
        if (isGettingItems) {
          return;
        }
        isGettingItems = true;
        UserService.getLeaderboard(entityParams, currentPage, itemsPerPage).then(function(data) {
          dialogOptions.model.leaders = dialogOptions.model.leaders.concat(data.leaders);
          dialogOptions.model.hideFooter = isCurrentUserLeader(data.leaders);
          dialogOptions.model.noMoreItemsAvailable = currentPage === total_pages;//jshint ignore:line
          isGettingItems = false;
          currentPage += 1;
        });
      }

      function sortByLeaderboard(filter) {
        resetPagination();
        delete entityParams[entityParams.sort_by];//jshint ignore:line
        entityParams.sort_by = dialogOptions.model.configTabs.tabSelected;//jshint ignore:line
        if(!filter) {
          dialogOptions.model.filters = [];
          dialogOptions.model.filterSelected = null;
        } else {
          entityParams[entityParams.sort_by] = filter;//jshint ignore:line
        }
        UserService.getLeaderboard(entityParams, currentPage, itemsPerPage).then(function(data) {
          dialogOptions.model.leaders = data.leaders;
          dialogOptions.model.user = data.meta.user_data; //jshint ignore:line
          dialogOptions.model.total_contents = data.meta.total_contents; //jshint ignore:line
          dialogOptions.model.total_super_event_achievements = data.meta.total_super_event_achievements; //jshint ignore:line
          dialogOptions.model.hideFooter = isCurrentUserLeader(data.leaders);
          total_pages = data.meta.total_pages; //jshint ignore:line
          dialogOptions.model.noMoreItemsAvailable = currentPage === total_pages;//jshint ignore:line
          dialogOptions.model.filters = data.meta.sort_by_options.values;//jshint ignore:line
        });
      }

      function resetPagination(resetEntityParams) {
        currentPage = 1;
        itemsPerPage = 10;
        total_pages = 0; //jshint ignore:line
        isGettingItems = false;
        preventClickEvent = false;
        if(resetEntityParams) {
          entityParams = {};
        }
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
        resetPagination(true);
      }
    }
  })();
