(function () {
  'use strict';

  angular
    .module('moi.services')
    .factory('UserNotificationsService', UserNotificationsService);

  function UserNotificationsService($auth, $rootScope, PusherService, UserService){
    var channelsToNotifications = [],
        service = { initialize: initialize };
    return service;

    function initialize(){
      $rootScope.$on('auth:login-success', subscribeUserNotifications);
      $rootScope.$on('auth:validation-success', subscribeUserNotifications);
      $rootScope.$on('auth:logout-success', unsubscribeUserNotifications);
    }

    function subscribeUserNotifications(){
      channelsToNotifications.push('usernotifications.' + $auth.user.id);
      channelsToNotifications.push('usernotifications.general');

      UserService.getNotifications(1).then(function(data) {
        /*jshint camelcase: false */
        service.totalNotifications = data.meta.total_count;
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

    function notificationReceived(notification){
      // TODO toasty?
      console.log(notification);
      service.totalNotifications ++;
      updateNotificationsCount();
    }

    function updateNotificationsCount(){
      $rootScope.$broadcast('notifications.updateCount');
    }
  }
})();
