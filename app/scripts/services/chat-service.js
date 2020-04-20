(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('ChatService', ChatService);

    function ChatService($http,
                        $q,
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

      var inProgressChat = false;
      var modelData = {
        messages: [],
        message: '',
        isSameDay: isSameDay
      };

      var service = {
        initChat: initChat,
        sendMessage: sendMessage,
        getMessages: getMessages,
        inProgressChat: inProgressChat,
        attachNewMessage: attachNewMessage
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

      function createChat(user_id, receiver_id) {//jshint ignore:line
        return $http({
          method: 'POST',
          url: ENV.apiHost + '/api/chats/start/'+user_id,//jshint ignore:line
          data: {
            receiver_id: receiver_id//jshint ignore:line
          }
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

      function initChat(userId, receiverId) {
        modelData.userId = userId;
        modelData.receiverId = receiverId;
        modelData.sendChat = function() {
          sendMessage(receiverId, modelData.message).then(function(newMessage) {
            $timeout(function() {
              modelData.messages.push(newMessage);
              modelData.message = '';
            });
          });
        };

        getMessages(userId, receiverId).then(function(messages) {
          modelData.messages = messages;
          ModalService.showModel({
            templateUrl: 'templates/partials/modal-chat-users.html',
            model: modelData,
            onHide: onHideChat
          });
          inProgressChat = true;
        });
      }

      function onHideChat() {
        inProgressChat = false;
        if(modelData.messages.length === 0) {
          createChat(modelData.userId, modelData.receiverId);
        }
      }

      function isSameDay(beforeDate, currentDate) {
        if(beforeDate){
          return new Date(beforeDate).getDate() !== new Date(currentDate).getDate();
        }
        return true;
      }

      function attachNewMessage(newChat) {
        if(inProgressChat) {
          $timeout(function() {
            modelData.messages.push(newChat);
          });
        }
      }
    }
  })();
