(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('NotificationsController', function($scope,
                                                  $rootScope,
                                                  $auth,
                                                  UserService,
                                                  ModalService,
                                                  UserNotificationsService,
                                                  EventsService,
                                                  $state){
    var notificationsModel = this;
    var notificationSelected,
        requestData = {},
        modelSuperEvent = {
          templateUrl: 'templates/partials/modal-super-event.html',
          model: {
            joinSuperEvent: joinSuperEvent
          }
        };

    notificationsModel.loaded = false;

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
      },
      'event': {
        template: 'templates/tasks/notifications/partials/event.html'
      },
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
      notificationsModel.eventsLikeNotification = [];
      notificationsModel.showSetEvents = showModalEvents;
      EventsService.getWeeklyEvents().then(function(resp){
        Object.keys(resp).map(function(week){
          if(resp[week].length > 0){
            var isSuperEvent = (week === 'super_event');
            var eventNotification = {
              type: 'event',
              title: isSuperEvent ? 'tasks.events.super' : 'tasks.events.title',
              subtitle: isSuperEvent ? '' : '('+week+')',
              isSuperEvent: isSuperEvent,
              events: resp[week]
            };
            notificationsModel.eventsLikeNotification.push(eventNotification);
          }
        });
        UserService.getNotifications(1).then(resolveNotifications);
      });
    }

    function resolveNotifications(data) {
      notificationsModel.currentPage += 1;
      /*jshint camelcase: false */
      notificationsModel.notifications = notificationsModel.eventsLikeNotification.concat(data.notifications);
      /*jshint camelcase: false */
      notificationsModel.totalItems = data.meta.total_count;
      if(notificationsModel.totalItems > 2){
        notificationsModel.noMoreItemsAvailable = false;
        notificationsModel.loadMoreNotifications = loadMoreNotifications;
      }
      notificationsModel.loaded = true;
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

    function showModalEvents(data){
      if(!data.isSuperEvent) {
        EventsService.showSetEvents(data.events);
      }else {
        var mappingAchievements = {
          1: 'images/inventory/badges/badge1.png',
          2: 'images/inventory/badges/badge2.png',
          3: 'images/inventory/badges/badge3.png',
          4: 'images/inventory/badges/badge4.png',
          5: 'images/inventory/badges/badge9.png',
          6: 'images/inventory/badges/badge5.png',
          7: 'images/inventory/badges/badge7.png',
          8: 'images/inventory/badges/badge8.png',
          9: 'images/inventory/badges/badge6.png',
          10: 'images/inventory/badges/badge10.png'
        };

        modelSuperEvent.model.data = data.events[0];
        modelSuperEvent.model.data.achievements.forEach(function(achievement) {
          achievement.image = mappingAchievements[achievement.number];
        });

        ModalService.showModel(modelSuperEvent);
      }
    }

    function joinSuperEvent(event) {
      EventsService.takeSuperEvent(event.id).then(function(){
        modelSuperEvent.model.closeModal();
        showConfirmSuperEvent();
      });
    }

    function showConfirmSuperEvent() {
      var enMessage = 'You joined the super event successfully.';
      var esMessage = 'Te uniste al super evento con éxito.';
      var message = ($auth.user.language === 'es') ? esMessage : enMessage;
      var dialogOptions = {
        templateUrl: 'templates/partials/modal-alert-content.html',
        model: {
          message: message,
          callbacks: {
            btnRight: function() {
              dialogOptions.model.closeModal();
              notificationsModel.notifications.shift();
            }
          },
          labels: {
            btnRight: 'Ok',
          }
        }
      };
      ModalService.showModel(dialogOptions);
    }

  });
})();
