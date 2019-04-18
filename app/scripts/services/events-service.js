(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('EventsService', EventsService);

    function EventsService($http, $auth, $q, ENV, PopupService, ModalService) {
      var service = {
        getWeeklyEvents: getWeeklyEvents,
        getEventDetails: getEventDetails,
        showDailyEvents: showDailyEvents,
        showSetEvents: showSetEvents,
        showContentEvents: showContentEvents,
      };

      var popupOptions = { title: 'Error' },
          modelEvent = {
            templateUrl: 'templates/partials/modal-event-details.html',
            model: {
              joinEvent: joinEvent
            }
          },
          currentEvents = [],
          language = $auth.user.language;

      return service;

      function getWeeklyEvents() {
        return $http({
          method: 'GET',
          url: ENV.apiHost + '/api/events/week'
        }).then(function success(res) {
          return res.data;
        }, function error(err) {
          if (err.status !== 404) {
            popupOptions.content = err.statusText;
            PopupService.showModel('alert', popupOptions);
          }
        });
      }

      function getDailyEvents() {
        return $http({
          method: 'GET',
          url: ENV.apiHost + '/api/events/today'
        }).then(function success(res) {
          return res.data;
        }, function error(err) {
          if(err.status !== 404){
            popupOptions.content = err.statusText;
            PopupService.showModel('alert', popupOptions);
          }
        });
      }

      function showContentEvents() {
        return $http({
          method: 'GET',
          url: ENV.apiHost + '/api/users/event_in_progress'
        }).then(function success(res) {
          return res.data.contents;
        }, function error(err) {
          if(err.status !== 404){
            popupOptions.content = err.statusText;
            PopupService.showModel('alert', popupOptions);
          }
        });
      }

      function takeEvent(eventId) {
        return $http({
          method: 'POST',
          url: ENV.apiHost + '/api/users/events/' + eventId + '/take',
          data: {}
        }).then(function success(res) {
          return res;
        }, function error(err) {
          if(err.status !== 404){
            popupOptions.content = err.data.errors[0];
            PopupService.showModel('alert', popupOptions);
          }
          return $q.reject(err);
        });
      }

      function getEventDetails(eventId) {
        return $http({
          method: 'GET',
          url: ENV.apiHost + '/api/events/' + eventId
        }).then(function success(res) {
          return res;
        }, function error(err) {
          if(err.status !== 404){
            popupOptions.content = err.statusText;
            PopupService.showModel('alert', popupOptions);
          }
        });
      }

      function showDailyEvents() {
        getDailyEvents().then(function(resp){
          if(resp.length > 0){
            showSetEvents(resp);
            localStorage.setItem('seenDailyEvents', true);
          }
        });
      }

      function showSetEvents(events){
        var NEURON_COLOR = {
          yellow: 'images/tree/nodos/nodo-amarillo.png',
          blue: 'images/tree/nodos/nodo-azul.png',
          red: 'images/tree/nodos/nodo-fuccia.png',
          green: 'images/tree/nodos/nodo-verde.png'
        };
        currentEvents = events;
        //map to get neurons
        angular.forEach(currentEvents, function(event){
          //just show four first content
          event.contents = (event && event.contents) ? event.contents.splice(0,4) : [];
          angular.forEach(event.contents, function(element){
            element.image = NEURON_COLOR[element.neuron_color]; //jshint ignore:line
          });
        });

        var modelData = {
          events: currentEvents,
          hasEvents: currentEvents.length > 0,
          showEventDetails: showEventDetails
        };

        ModalService.showModel({
          templateUrl: 'templates/partials/modal-event-list.html',
          model: modelData
        });
      }

      function showEventDetails(index, events){
        modelEvent.model.data = events[index];
        ModalService.showModel(modelEvent);
      }

      function joinEvent(event) {
        takeEvent(event.id).then(function(){
          modelEvent.model.closeModal();
          modelEvent.model.data.taken = !event.taken; //jshint ignore:line
          showEventNotification();
        });
      }

      function showEventNotification() {
        var enMessage = 'You joined the event successfully, the contents you must learn are in the Tasks tab.';
        var esMessage = 'Te uniste al evento con éxito, los contenidos que debes aprender están en la pestaña Tareas';
        var message = language === 'es' ? esMessage : enMessage;
        var dialogOptions = {
          templateUrl: 'templates/partials/modal-alert-content.html',
          model: {
            message: message,
            callbacks: {
              btnRight: function() {
                dialogOptions.model.closeModal();
                animateEvent();
              }
            },
            labels: {
              btnRight: 'Ok',
            }
          }
        };
        ModalService.showModel(dialogOptions);
      }

      function animateEvent(){
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        var $eventContainer = angular.element(document.querySelector('.event.taken'));
        var cssClass = 'animated zoomOutDown';
        $eventContainer.addClass(cssClass).one(animationEnd, function(){
          $eventContainer.remove();
        });
      }
    }
  })();
