(function () {
  'use strict';

  angular
    .module('moi.services')
    .factory('UserNotificationsService', UserNotificationsService);

  function UserNotificationsService($auth, $rootScope, PusherService, UserService,
                                    $q, TutorRecommendationsService, $http, ENV){
    var channelsToNotifications = [],
        service = {
          initialize: initialize,
          notifyOpenNotification: notifyOpenNotification
        };
    return service;

    function initialize(){
      $rootScope.$on('auth:login-success', subscribeUserNotifications);
      $rootScope.$on('auth:validation-success', subscribeUserNotifications);
      $rootScope.$on('auth:logout-success', unsubscribeUserNotifications);
    }

    function subscribeUserNotifications(){
      channelsToNotifications.push('usernotifications.' + $auth.user.id);
      channelsToNotifications.push('usernotifications.general');

      $q.all([
        UserService.getNotifications(1),
        TutorRecommendationsService.getTutorRecommendationsDetails()
      ])
      .then(function(data) {
        /*jshint camelcase: false */
        service.totalNotifications = data[0].meta.total_count;
        service.totalRecommendationContents = data[1].details.recommendation_contents_pending;
        service.totalRecommendations = data[1].details.total_recommendations;
        updateNotificationsCount();
        return PusherService.load();
      }).then(function(){
        angular.forEach(channelsToNotifications, function (channel) {
          PusherService.listen(
            channel,
            'new-notification',
            notificationReceived
          );
        });
      });
    }

    function unsubscribeUserNotifications(){
      angular.forEach(channelsToNotifications, function (channel) {
        PusherService.unlisten(channel);
      });
    }

    function notificationReceived(){
      // TODO toasty? we can test a notificacion in this method
      service.totalNotifications ++;
      updateNotificationsCount();
    }

    function updateNotificationsCount(){
      $rootScope.$broadcast('notifications.updateCount');
    }

    function notifyOpenNotification(notification) {
      var params = {
        type: notification.type
      };
      if (notification.user_id) { //jshint ignore:line
        params.tutor_id = notification.user_id //jshint ignore:line
      }
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/notifications/' + notification.id + '/open',
        params: params
      }).then(function success(res) {
        return res;
      }, function error(err) {
        return $q.reject(err);
      });
    }
  }
})();
