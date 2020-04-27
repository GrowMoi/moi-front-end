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
        isSameDay: isSameDay,
        onCloseChat: onCloseChat
      };
      var initChatDefer;

      var service = {
        initChat: initChat,
        sendMessage: sendMessage,
        getMessages: getMessages,
        inProgressChat: inProgressChat,
        attachNewMessage: attachNewMessage,
        createChat: createChat,
        leaveChat: leaveChat
      };

      return service;

      function sendMessage(receiver_id, message, room_id) {//jshint ignore:line
        var params = {
          receiver_id: receiver_id,//jshint ignore:line
          message: message, //jshint ignore:line
          room_chat_id: room_id//jshint ignore:line
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
          url: ENV.apiHost + '/api/chats/start/'+receiver_id,//jshint ignore:line
          data: {}
        }).then(function success(res) {
          return res.data;//jshint ignore:line
        }, function error(err) {
          if(err.status !== 404){
            dialogContentModel.message = err.statusText;
            ModalService.showModel(dialogOptions);
          }
          return $q.reject(err);
        });
      }

      function leaveChat(roomId) {//jshint ignore:line
        return $http({
          method: 'PUT',
          url: ENV.apiHost + '/api/chats/leave/'+roomId,//jshint ignore:line
          data: {}
        }).then(function success(res) {
          return res.data;//jshint ignore:line
        }, function error(err) {
          if(err.status !== 404){
            dialogContentModel.message = err.statusText;
            ModalService.showModel(dialogOptions);
          }
          return $q.reject(err);
        });
      }

      function initChat(userId, receiverId, roomId) {
        initChatDefer = $q.defer();
        modelData.userId = userId;
        modelData.receiverId = receiverId;
        modelData.sendChat = function() {
          sendMessage(receiverId, modelData.message, roomId).then(function(newMessage) {
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
            model: modelData
          });
          inProgressChat = true;
        });
        return initChatDefer.promise;
      }

      function onCloseChat() {
        modelData.closeModal();
        inProgressChat = false;
        if(modelData.messages.length !== 0) {
          var lastMessage = modelData.messages.slice(-1)[0];
          initChatDefer.resolve(lastMessage);
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
