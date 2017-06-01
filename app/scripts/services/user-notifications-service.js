(function () {
  'use strict';

  angular
    .module('moi.services')
    .factory('UserNotificationsService', UserNotificationsService);

  function UserNotificationsService($auth, $rootScope, PusherService){
    var userNotificationsChannel,
        service = { initialize: initialize };
    return service;

    function initialize(){
      $rootScope.$on('auth:login-success', subscribeUserNotifications);
      $rootScope.$on('auth:validation-success', subscribeUserNotifications);
      $rootScope.$on('auth:logout-success', unsubscribeUserNotifications);
    }

    function subscribeUserNotifications(){
      userNotificationsChannel = 'usernotifications.' + $auth.user.id;

      PusherService.load().then(function(){
        PusherService.listen(
          userNotificationsChannel,
          'new-notification',
          notificationReceived
        );
      });
    }

    function unsubscribeUserNotifications(){
      PusherService.unlisten(userNotificationsChannel);
    }

    function notificationReceived(notification){
      // TODO toasty?
      console.log(notification);
    }
  }
})();
