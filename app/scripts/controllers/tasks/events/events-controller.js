(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('EventsController', function(EventsService, ModalService, NeuronsOptions){
    var eventsModel = this;
    eventsModel.noMoreItemsAvailable = true;
    eventsModel.currentPage = 1;
    eventsModel.showEventDetails = showEventDetails;

    initData();

    function initData() {
      eventsModel.noMoreItemsAvailable = true;
      eventsModel.currentPage = 1;
      EventsService.getEvents(1).then(resolveEvents);
    }

    function resolveEvents(data) {
      eventsModel.currentPage += 1;
      eventsModel.events = data.data;
    }

    function showEventDetails(index){
      var event = formatEvent(eventsModel.events[index]);
      var modelData = {
        data: event
      };
      ModalService.showModel({
        templateUrl: 'templates/partials/modal-event-details.html',
        model: modelData
      });
    }

    function formatEvent(event) {
      var NEURON_COLOR = {
        yellow: 'images/tree/nodos/nodo-amarillo.png',
        blue: 'images/tree/nodos/nodo-azul.png',
        red: 'images/tree/nodos/nodo-fuccia.png',
        green: 'images/tree/nodos/nodo-verde.png'
      };
      //map to get neurons
      angular.forEach(event.neurons, function(neuron){
        var color = NeuronsOptions[neuron.id];
        neuron.image = NEURON_COLOR[color] || 'images/tree/nodos/nodo-azul.png';
      });

      return event;
    }
  });
})();
