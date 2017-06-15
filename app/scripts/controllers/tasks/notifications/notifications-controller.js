(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('NotificationsController', function($scope, UserService){
    var notificationsmodel = this;
    notificationsmodel.noMoreItemsAvailable = true;
    notificationsmodel.currentPage = 1;
    notificationsmodel.confirmNotification = confirmNotification;

    initData();

    function initData() {
      notificationsmodel.noMoreItemsAvailable = true;
      notificationsmodel.currentPage = 1;
      UserService.getNotifications(1).then(resolveNotifications);
    }

    function resolveNotifications(data) {
      notificationsmodel.currentPage += 1;
      /*jshint camelcase: false */
      notificationsmodel.notifications = data.user_tutors;
      /*jshint camelcase: false */
      notificationsmodel.totalItems = data.meta.total_items;
      if(notificationsmodel.totalItems > 2){
        notificationsmodel.noMoreItemsAvailable = false;
        notificationsmodel.loadMoreNotes = loadMoreNotes;
      }
    }

    function loadMoreNotes() {
      UserService.getNotes(notificationsmodel.currentPage).then(function(data) {
        /*jshint camelcase: false */
        notificationsmodel.notifications = notificationsmodel.notifications.concat(data.user_tutors);
        notificationsmodel.currentPage += 1;
        if ( notificationsmodel.notifications.length === notificationsmodel.totalItems ) {
          notificationsmodel.noMoreItemsAvailable = true;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    }

    function confirmNotification(notification) {
      console.log('Darinw', notification);
    }
  });
})();
