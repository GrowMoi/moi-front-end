(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('EventsController', function(EventsService){
    var eventsModel = this;
    eventsModel.showSetEvents = EventsService.showSetEvents;

    initData();

    function initData() {
      EventsService.getWeeklyEvents().then(function(resp){
        eventsModel.setEvents = resp;
      });
    }
  });
})();
