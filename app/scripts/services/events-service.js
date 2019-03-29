(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('EventsService', EventsService);

    function EventsService($http, $auth, ENV, PopupService, ModalService, NeuronsOptions) {
      var service = {
        getWeeklyEvents: getWeeklyEvents,
        getEventDetails: getEventDetails,
        showDailyEvents: showDailyEvents,
        showSetEvents: showSetEvents
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

      function takeEvent(eventId) {
        return $http({
          method: 'POST',
          url: ENV.apiHost + '/api/users/events/' + eventId + '/take',
          data: {}
        }).then(function success(res) {
          return res;
        }, function error(err) {
          if(err.status !== 404){
            popupOptions.content = err.statusText;
            PopupService.showModel('alert', popupOptions);
          }
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
          showSetEvents('tasks.events.in_progress', resp);
        });
      }

      function showSetEvents(title, events){
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
            var color = NeuronsOptions[element.content_id]; //jshint ignore:line
            element.image = NEURON_COLOR[color] || 'images/tree/nodos/nodo-azul.png';
          });
        });

        var modelData = {
          title: title,
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
          modelEvent.model.data.is_available = !event.is_available; //jshint ignore:line
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
        var $eventContainer = angular.element(document.querySelector('.event.disabled'));
        var cssClass = 'animated zoomOutDown';
        $eventContainer.addClass(cssClass).one(animationEnd, function(){
          $eventContainer.remove();
        });
      }
    }
  })();
