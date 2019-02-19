(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('EventsService', EventsService);

    function EventsService($http, ENV, PopupService, ModalService, NeuronsOptions) {
      var service = {
        getWeeklyEvents: getWeeklyEvents,
        getEventDetails: getEventDetails,
        takeEvent: takeEvent,
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
          currentEvents = [];

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
          showSetEvents('Today', resp.events);
        });
      }

      function showSetEvents(title, events){
        var NEURON_COLOR = {
          yellow: 'images/tree/nodos/nodo-amarillo.png',
          blue: 'images/tree/nodos/nodo-azul.png',
          red: 'images/tree/nodos/nodo-fuccia.png',
          green: 'images/tree/nodos/nodo-verde.png'
        };
        //just show three first events
        currentEvents = angular.copy(events);
        currentEvents = currentEvents.splice(0,3);
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
        EventsService.takeEvent(event.id).then(function(){
          modelEvent.model.closeModal();
          modelEvent.model.data.is_available = !event.is_available; //jshint ignore:line
        });
      }
    }
  })();
