(function () {
  'use strict';

  angular
    .module('moi.services')
    .factory('UserNotificationsService', UserNotificationsService);

  function UserNotificationsService($auth,
                                    $rootScope,
                                    $q,
                                    $http,
                                    ENV,
                                    PusherService,
                                    UserService){
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

      UserService.getDetailsNotifications().then(function(data) {
        service.totalNotifications = data.notifications;
        service.totalRecommendations = data.recommendations;
        service.totalContentEvents = data.events;
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

    function notificationReceived(data){
      if(data && data.label === 'notifications'){
        service.totalNotifications ++;
        updateNotificationsCount();
      }
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
