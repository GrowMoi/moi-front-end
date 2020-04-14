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
          notifyOpenNotification: notifyOpenNotification,
          getNewDetailsNotifications: getNewDetailsNotifications
        },
        userNotificationsChannel = {
          channelName: 'usernotifications.',
          eventName: 'new-notification',
          callback: notificationReceived
        },
        userGeneralNotificationsChannel = {
          channelName: 'usernotifications.general',
          eventName: 'new-notification',
          callback: notificationReceived
        },
        userChatNotificationChannel = {
          channelName: 'userchatsnotifications.',
          eventName: 'newmessage',
          callback: notificationChatReceived
        };
    return service;

    function initialize(){
      $rootScope.$on('auth:login-success', subscribeUserNotifications);
      $rootScope.$on('auth:validation-success', subscribeUserNotifications);
      $rootScope.$on('auth:logout-success', unsubscribeUserNotifications);
    }

    function subscribeUserNotifications(){
      //update channel names according user
      userNotificationsChannel.channelName = userNotificationsChannel.channelName.concat($auth.user.id);
      userChatNotificationChannel.channelName = userChatNotificationChannel.channelName.concat($auth.user.id);
      //join channels
      channelsToNotifications.push(userNotificationsChannel);
      channelsToNotifications.push(userGeneralNotificationsChannel);
      channelsToNotifications.push(userChatNotificationChannel);
      UserService.getDetailsNotifications().then(function(data) {
        service.totalNotifications = data.notifications;
        service.totalContentsToLearn = data.contents_to_learn; //jshint ignore:line
        updateNotificationsCount();
        return PusherService.load();
      }).then(function(){
        angular.forEach(channelsToNotifications, function (channel) {
          PusherService.listen(
            channel.channelName,
            channel.eventName,
            channel.callback
          );
        });
      });
    }

    function unsubscribeUserNotifications(){
      angular.forEach(channelsToNotifications, function (channel) {
        PusherService.unlisten(channel.channelName);
      });
    }

    function notificationChatReceived(data) {
      service.totalNotifications ++;
      notifyChatuser(data);
    }

    function notificationReceived(data){
      if(data && data.label === 'notifications' && data.title !== 'Nuevo chat'){
        service.totalNotifications ++;
        updateNotificationsCount();
      }
    }

    function getNewDetailsNotifications() {
      UserService.getDetailsNotifications().then(function(data) {
        service.totalNotifications = data.notifications;
        service.totalContentsToLearn = data.contents_to_learn; //jshint ignore:line
        updateNotificationsCount();
      });
    }

    function updateNotificationsCount(){
      $rootScope.$broadcast('notifications.updateCount');
    }

    function notifyChatuser(chat){
      $rootScope.$broadcast('notifications.userChat', {chat: chat});
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
