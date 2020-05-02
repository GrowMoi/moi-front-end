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
                                                  MediaAchievements,
                                                  $state,
                                                  LeaderboardService,
                                                  ChatService){
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
    notificationsModel.showLoadingOverlay = false;

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
      'super_event_notification': {
        template: 'templates/tasks/notifications/partials/generic.html',
        actionRemove: deleteSupereventNotification
      },
      'event': {
        template: 'templates/tasks/notifications/partials/event.html'
      },
      'user_chat': {
        template: 'templates/tasks/notifications/partials/user-chat.html',
        actionRemove: leaveChatNotification
      },
    };

    notificationsModel.noMoreItemsAvailable = true;
    notificationsModel.currentPage = 1;
    notificationsModel.confirmRequest = confirmRequest;
    notificationsModel.showNotification = showNotification;
    notificationsModel.removeItem = removeItem;
    notificationsModel.leaveChat = leaveChat;
    notificationsModel.getNotificationPartial = getNotificationPartial;
    notificationsModel.goToQuiz = goToQuiz;
    notificationsModel.goToChat = goToChat;

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

    function leaveChat(notification, index) {
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

    function leaveChatNotification(notification, index) {
      console.log(notification);
      console.log(index);
      // UserService.deleteNotification(notification).then(function(resp) {
      //   if(resp.data.deleted){
      //     updateNotifications(index);
      //   }
      // });
    }

    function deleteSupereventNotification(notification, index) {
      UserService.deleteNotification(notification, true).then(function(resp) {
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
        user: $auth.user,
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
        EventsService.showSetEvents(data.events).then(function() {
          var notificationsUpdated = notificationsModel.notifications.filter(function(notification) {
            return notification.type !== 'event' || notification.isSuperEvent;
          });
          var notificationsRemoved = notificationsModel.notifications.length - notificationsUpdated.length;
          updateNotificationsCounter(notificationsRemoved);
          notificationsModel.notifications = notificationsUpdated;

        });
      } else {
        var superEvent = data.events[0];
        if(superEvent.taken) {
          showLeaderboardToSuperEvent(superEvent);
        } else {
          modelSuperEvent.model.data = superEvent;
          modelSuperEvent.model.data.achievements.forEach(function(achievement) {
            achievement.image = MediaAchievements[achievement.number].settings.badge;
          });
          ModalService.showModel(modelSuperEvent);
        }
      }
    }

    function showLeaderboardToSuperEvent(superEvent){
      var paramsToLeaderboard = {
        user_id: $auth.user.id, //jshint ignore:line
        event_id: superEvent.id //jshint ignore:line
      };
      var fromEvent = true;
      notificationsModel.showLoadingOverlay = true;
      LeaderboardService.showLeaderboard(paramsToLeaderboard, fromEvent, function onSuccess() {
        notificationsModel.showLoadingOverlay = false;
      }, function onError() {
        notificationsModel.showLoadingOverlay = false;
      });
    }

    function joinSuperEvent(superevent) {
      EventsService.takeSuperEvent(superevent.id).then(function(){
        modelSuperEvent.model.closeModal();
        EventsService.showConfirmSuperEvent();
        notificationsModel.notifications.shift();
      });
    }

    function updateNotificationsCounter(size) {
      UserNotificationsService.totalNotifications -= size;
      $rootScope.$broadcast('notifications.updateCount');
    }

    function goToChat(notification) {
      var userId = $auth.user.id;
      var roomId = notification.chat.room_chat_id;
      var id = userId === notification.chat.sender_id ? notification.chat.receiver_id : notification.chat.sender_id;//jshint ignore:line
      ChatService.initChat(userId, id, roomId);
    }

    $rootScope.$on('notifications.userChat', function(event, data) {
      ChatService.attachNewMessage(data.chat);
    });

  });
})();
