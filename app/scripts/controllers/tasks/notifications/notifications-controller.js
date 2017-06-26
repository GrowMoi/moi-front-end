(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('NotificationsController', function($scope,
                                                  $rootScope,
                                                  UserService,
                                                  ModalService,
                                                  UserNotificationsService){
    var notificationsModel = this;
    var notificationSelected,
        requestData = {};


    var dialogContentModel = {
      callbacks: {
        btnRight: acceptNotification,
        btnLeft: rejectNotification
      },
      labels: {
        btnRight: 'Aceptar',
        btnLeft: 'Rechazar'
      }
    };
    notificationsModel.noMoreItemsAvailable = true;
    notificationsModel.currentPage = 1;
    notificationsModel.confirmNotification = confirmNotification;

    initData();

    function initData() {
      notificationsModel.noMoreItemsAvailable = true;
      notificationsModel.currentPage = 1;
      UserService.getNotifications(1).then(resolveNotifications);
    }

    function resolveNotifications(data) {
      notificationsModel.currentPage += 1;
      /*jshint camelcase: false */
      notificationsModel.notifications = data.user_tutors;
      /*jshint camelcase: false */
      notificationsModel.totalItems = data.meta.total_items;
      if(notificationsModel.totalItems > 2){
        notificationsModel.noMoreItemsAvailable = false;
        notificationsModel.loadMoreNotifications = loadMoreNotifications;
      }
    }

    function loadMoreNotifications() {
      UserService.getNotifications(notificationsModel.currentPage).then(function(data) {
        /*jshint camelcase: false */
        notificationsModel.notifications = notificationsModel.notifications.concat(data.user_tutors);
        notificationsModel.currentPage += 1;
        if ( notificationsModel.notifications.length === notificationsModel.totalItems ) {
          notificationsModel.noMoreItemsAvailable = true;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    }

    function confirmNotification(notification) {
      notificationSelected = notification;
      requestData.id = notificationSelected.id;
      dialogContentModel.message = notification.tutor.name + ' ha realizado una solicitud para ser tu tutor.';
      var dialogOptions = {
        templateUrl: 'templates/partials/modal-alert-content.html',
        model: dialogContentModel
      };
      ModalService.showModel(dialogOptions);
    }

    function acceptNotification() {
      dialogContentModel.closeModal();
      requestData.response = 'accepted';
      UserService.respondNotification(requestData).then(removeNotification);
    }

    function rejectNotification() {
      dialogContentModel.closeModal();
      requestData.response = 'rejected';
      UserService.respondNotification(requestData).then(removeNotification);
    }

    function removeNotification(data){
      if(data.statusText === 'Accepted'){
        var notificationIndex = notificationsModel.notifications.indexOf(notificationSelected);
        notificationsModel.notifications.splice(notificationIndex, 1);
        UserNotificationsService.totalNotifications--;
        $rootScope.$broadcast('notifications.updateCount');
      }
    }
  });
})();
