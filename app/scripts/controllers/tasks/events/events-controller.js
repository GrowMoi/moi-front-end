(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('EventsController', function(EventsService, ModalService, NeuronsOptions){
    var eventsModel = this;
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
      eventsModel.events = data.events;
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
      var event = eventsModel.events[index];
      var modelData = {
        data: event
      };
      ModalService.showModel({
        templateUrl: 'templates/partials/modal-event-details.html',
        model: modelData
      });
    }
  });
})();
