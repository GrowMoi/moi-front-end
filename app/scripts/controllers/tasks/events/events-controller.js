(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('EventsController', function(EventsService, ModalService, NeuronsOptions){
    var eventsModel = this,
        modelEvent = {
          templateUrl: 'templates/partials/modal-event-details.html',
          model: {
            joinEvent: joinEvent
          }
        },
        currentEvents = [];
    eventsModel.showSetEvents = showSetEvents;

    initData();

    function initData() {
      EventsService.getWeeklyEvents().then(function(resp){
        eventsModel.setEvents = resp;
      });
    }

    function showSetEvents(events){
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
        events: currentEvents,
        hasEvents: currentEvents.length > 0,
        showEventDetails: showEventDetails
      };

      ModalService.showModel({
        templateUrl: 'templates/partials/modal-event-list.html',
        model: modelData
      });
    }

    function showEventDetails(index){
      modelEvent.model.data = currentEvents[index];
      ModalService.showModel(modelEvent);
    }

    function joinEvent(event) {
      EventsService.takeEvent(event.id).then(function(){
        modelEvent.model.closeModal();
        modelEvent.model.data.is_available = !event.is_available; //jshint ignore:line
      });
    }
  });
})();
