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
        };
    eventsModel.noMoreItemsAvailable = true;
    eventsModel.currentPage = 1;
    eventsModel.showSetEvents = showSetEvents;

    initData();

    function initData() {
      eventsModel.noMoreItemsAvailable = true;
      eventsModel.currentPage = 1;
      EventsService.getDailyEvents().then(resolveEvents);
    }

    function resolveEvents(data) {
      eventsModel.currentPage += 1;
      //just show three first events
      eventsModel.events = data.events.splice(0,3);
    }

    function showSetEvents(){
      var NEURON_COLOR = {
        yellow: 'images/tree/nodos/nodo-amarillo.png',
        blue: 'images/tree/nodos/nodo-azul.png',
        red: 'images/tree/nodos/nodo-fuccia.png',
        green: 'images/tree/nodos/nodo-verde.png'
      };

      //map to get neurons
      angular.forEach(eventsModel.events, function(event){
        //just show four first content
        event.contents = event.contents.splice(0,4);
        angular.forEach(event.contents, function(element){
          var color = NeuronsOptions[element.content_id]; //jshint ignore:line
          element.image = NEURON_COLOR[color] || 'images/tree/nodos/nodo-azul.png';
        });
      });

      var modelData = {
        events: eventsModel.events,
        showEventDetails: showEventDetails
      };

      ModalService.showModel({
        templateUrl: 'templates/partials/modal-event-list.html',
        model: modelData
      });
    }

    function showEventDetails(index){
      modelEvent.model.data = eventsModel.events[index];
      ModalService.showModel(modelEvent);
    }

    function joinEvent(event) {
      EventsService.takeEvent(event.id).then(function(){
        modelEvent.model.closeModal();
        modelEvent.model.data.isAvailable = !event.isAvailable;
      });
    }
  });
})();
