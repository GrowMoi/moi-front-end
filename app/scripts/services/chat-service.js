(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('ChatService', ChatService);

    function ChatService($http,
                        $q,
                        $state,
                        $timeout,
                        ENV,
                        ModalService) {
      var dialogContentModel = {
        title: 'Error',
        message: ''
      };

      var dialogOptions = {
        templateUrl: 'templates/partials/modal-error.html',
        model: dialogContentModel
      };

      var service = {
        initChat: initChat,
        sendMessage: sendMessage,
        getMessages: getMessages
      };

      return service;

      function sendMessage(receiver_id, message) {//jshint ignore:line
        var params = {
          receiver_id: receiver_id,//jshint ignore:line
          message: message//jshint ignore:line
        };

        return $http({
          method: 'POST',
          url: ENV.apiHost + '/api/chats',
          data: params
        }).then(function success(res) {
          return res.data.user_chat;//jshint ignore:line
        }, function error(err) {
          if(err.status !== 404){
            dialogContentModel.message = err.statusText;
            ModalService.showModel(dialogOptions);
          }
          return $q.reject(err);
        });
      }

      function getMessages(user_id, receiver_id) {//jshint ignore:line
        return $http({
          method: 'GET',
          url: ENV.apiHost + '/api/chats/user/'+receiver_id,//jshint ignore:line
          params: {
            user_id: user_id,//jshint ignore:line
          }
        }).then(function success(res) {
          return res.data.user_chats;//jshint ignore:line
        }, function error(err) {
          if(err.status !== 404){
            dialogContentModel.message = err.statusText;
            ModalService.showModel(dialogOptions);
          }
          return $q.reject(err);
        });
      }

      function initChat(userId, receiverId, redirectToTasks) {
        getMessages(userId, receiverId).then(function(messages) {
          var modelData = {
            messages: messages,
            message: '',
            sendChat: function() {
              sendMessage(receiverId, modelData.message).then(function(newMessage) {
                $timeout(function() {
                  modelData.messages.push(newMessage);
                  modelData.message = '';
                });
              });
            }
          };

          ModalService.showModel({
            templateUrl: 'templates/partials/modal-chat-users.html',
            model: modelData
          });
        });

        if(redirectToTasks) {
          $state.go('tasks.notifications');
        }
      }
    }
  })();
