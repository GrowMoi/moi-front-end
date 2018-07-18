(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('FriendsController', function($scope,
                                            $ionicLoading,
                                            $state,
                                            UserService,
                                            query)
  {
    var friendsmodel = this;
    friendsmodel.query = query;
    friendsmodel.reloadSearch = reloadSearch;
    friendsmodel.noMoreItemsAvailable = true;
    friendsmodel.users = [];
    friendsmodel.frameOptions = {
      type: 'marco_arbol',
      withSidebar: true,
      showBackButton: true
    };

    if(friendsmodel.query !== ''){
      search();
    }

    function reloadSearch() {
      $state.go('friends', { query: friendsmodel.query });
    }

    function search() {
      // Setup the loader
       $ionicLoading.show({
         content: 'Loading',
         animation: 'fade-in',
         showBackdrop: true,
         showDelay: 0
       });
      friendsmodel.currentPage = 1;
      UserService.searchProfiles(friendsmodel.query, friendsmodel.currentPage).then(function(resp) {
        friendsmodel.currentPage += 1;
        /*jshint camelcase: false */
        friendsmodel.users = resp.search_users.users;
        /*jshint camelcase: false */
        friendsmodel.totalItems = resp.meta.total_items;
        if(friendsmodel.totalItems > 8){
          friendsmodel.noMoreItemsAvailable = false;
          friendsmodel.loadMore = loadMore;
        }
      }).finally(function(){
        $ionicLoading.hide();
      });
    }

    function loadMore() {
      UserService.searchProfiles(friendsmodel.query, friendsmodel.currentPage).then(function(resp) {
        /*jshint camelcase: false */
        friendsmodel.users = friendsmodel.users.concat(resp.search_users.users);
        friendsmodel.currentPage += 1;

        if (getItemsShownStatus()) {
          friendsmodel.noMoreItemsAvailable = true;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    }

    function getItemsShownStatus () {
      var itemsShown = friendsmodel.users.length;
      return itemsShown === friendsmodel.totalItems;
    }

  });
})();
