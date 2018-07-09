(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('NotificationsController', function($scope,
                                                  $rootScope,
                                                  UserService,
                                                  ModalService,
                                                  UserNotificationsService,
                                                  $state){
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

    var notificationStates = {
      'quiz': {
        template: 'templates/tasks/notifications/partials/tutor-quiz.html',
        actionRemove: deleteNotification
      },
      'tutor_quiz': {
        template: 'templates/tasks/notifications/partials/tutor-quiz.html',
        actionRemove: deleteNotification
      },
      'tutor_request': {
        template: 'templates/tasks/notifications/partials/tutor-request.html',
        actionRemove: rejectRequest
      },
      'generic': {
        template: 'templates/tasks/notifications/partials/generic.html',
        actionRemove: deleteNotification
      },
      'admin_generic': {
        template: 'templates/tasks/notifications/partials/generic.html',
        actionRemove: deleteNotification
      },
      'tutor_generic': {
        template: 'templates/tasks/notifications/partials/generic.html',
        actionRemove: deleteNotification
      }
    };

    notificationsModel.noMoreItemsAvailable = true;
    notificationsModel.currentPage = 1;
    notificationsModel.confirmRequest = confirmRequest;
    notificationsModel.showNotification = showNotification;
    notificationsModel.removeItem = removeItem;
    notificationsModel.getNotificationPartial = getNotificationPartial;
    notificationsModel.goToQuiz = goToQuiz;

    initData();

    function initData() {
      notificationsModel.noMoreItemsAvailable = true;
      notificationsModel.currentPage = 1;
      UserService.getNotifications(1).then(resolveNotifications);
    }

    function resolveNotifications(data) {
      notificationsModel.currentPage += 1;
      /*jshint camelcase: false */
      notificationsModel.notifications = data.notifications;
      /*jshint camelcase: false */
      notificationsModel.totalItems = data.meta.total_count;
      if(notificationsModel.totalItems > 2){
        notificationsModel.noMoreItemsAvailable = false;
        notificationsModel.loadMoreNotifications = loadMoreNotifications;
      }
    }

    function loadMoreNotifications() {
      UserService.getNotifications(notificationsModel.currentPage).then(function(data) {
        /*jshint camelcase: false */
        notificationsModel.notifications = notificationsModel.notifications.concat(data.notifications);
        notificationsModel.currentPage += 1;
        if ( notificationsModel.notifications.length === notificationsModel.totalItems ) {
          notificationsModel.noMoreItemsAvailable = true;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    }

    function confirmRequest(notification) {
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
        updateNotifications();
      }
    }

    function showNotification(notification){
      var dialogOptions = {
        templateUrl: 'templates/partials/modal-show-notification.html',
        model: notification
      };

      UserNotificationsService.notifyOpenNotification(notification);

      ModalService.showModel(dialogOptions);
    }

    function removeItem(notification, index) {
      var stateSelected = notificationStates[notification.type];
      stateSelected.actionRemove(notification, index);
    }

    function deleteNotification(notification, index) {
      UserService.deleteNotification(notification).then(function(resp) {
        if(resp.data.deleted){
          updateNotifications(index);
        }
      });
    }

    function rejectRequest(notification) {
      var data = {
        id: notification.id,
        response: 'rejected'
      };
      UserService.respondNotification(data).then(removeNotification);
    }

    function updateNotifications(index){
      notificationsModel.notifications.splice(index, 1);
      UserNotificationsService.totalNotifications--;
      $rootScope.$broadcast('notifications.updateCount');
    }

    function getNotificationPartial(notification) {
      var stateSelected = notificationStates[notification.type];
      return stateSelected.template || notificationStates.generic.template;
    }

    function goToQuiz(notification) {
      notificationSelected = notification;
      var tutorName = notificationSelected.tutor.name || notificationSelected.tutor.username;
      var dialogQuizModel = {
        header: 'El tutor ' + tutorName + ' ha creado un nuevo test para ti.',
        description: notification.description,
        callbacks: {
          openTabQuiz: function() {
            var url = notification.description.match(/(https?:\/\/[^\s]+)/g);
            if (url && url[0]) {
              var data = url[0].match(/quiz\/(\d*)\/player\/(\d*)/);
              if (data && angular.isArray(data)) {
                dialogQuizModel.closeModal();
                $state.go('quiz', {
                  quizId: parseInt(data[1]),
                  playerId: parseInt(data[2])
                });
              }
            }
          },
          continueReading: function () {
            dialogQuizModel.closeModal();
          }
        },
        labels: {
          openTabQuiz: 'Ir a la prueba',
          continueReading: 'Seguir leyendo'
        }
      };

      var dialogOptions = {
        templateUrl: 'templates/partials/modal-go-to-quiz.html',
        model: dialogQuizModel
      };

      ModalService.showModel(dialogOptions);
    }
  });
})();
