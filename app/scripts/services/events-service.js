(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('EventsService', EventsService);

    function EventsService($http,
                          $auth,
                          $q,
                          $rootScope,
                          ENV,
                          PopupService,
                          ModalService,
                          UserNotificationsService,
                          MediaAchievements) {
      var service = {
        getWeeklyEvents: getWeeklyEvents,
        getEventDetails: getEventDetails,
        showDailyEvents: showDailyEvents,
        showSetEvents: showSetEvents,
        showContentEvents: showContentEvents,
        getEventsItem: getEventsItem,
        takeSuperEvent: takeSuperEvent,
        showConfirmSuperEvent: showConfirmSuperEvent
      };

      var popupOptions = { title: 'Error' },
          modelEvent = {
            templateUrl: 'templates/partials/modal-event-details.html',
            model: {
              joinEvent: joinEvent
            }
          },
          modelEvents = {
            templateUrl: 'templates/partials/modal-event-list.html',
            model: {
              showEventDetails: showEventDetails
            }
          },
          modelSuperEvent = {
            templateUrl: 'templates/partials/modal-super-event.html',
            model: {
              joinSuperEvent: joinSuperEvent
            }
          },
          currentEvents = [],
          eventModalPromise;

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

      function takeSuperEvent(eventId) {
        return $http({
          method: 'POST',
          url: ENV.apiHost + '/api/users/events/' + eventId + '/take_super_event',
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

      function getEventsItem() {
        return $http({
          method: 'GET',
          url: ENV.apiHost + '/api/events'
        }).then(function success(res) {
          return res.data;
        }, function error(err) {
          if (err.status !== 404) {
            popupOptions.content = err.statusText;
            PopupService.showModel('alert', popupOptions);
          }
        });
      }

      function showDailyEvents() {
        getDailyEvents().then(function(resp){
          if(resp && (resp.events.length > 0 || resp.superevent.length > 0)){
            showSetEvents(resp.events, resp.superevent);
            localStorage.setItem('seenDailyEvents', true);
          }
        });
      }

      function showSetEvents(events, superevent){
        var NEURON_COLOR = {
          yellow: 'images/tree/nodos/nodo-amarillo.png',
          blue: 'images/tree/nodos/nodo-azul.png',
          red: 'images/tree/nodos/nodo-fuccia.png',
          green: 'images/tree/nodos/nodo-verde.png'
        };
        currentEvents = events;
        eventModalPromise = $q.defer();
        var hasSuperEventAvailable = (angular.isArray(superevent) && superevent.length > 0 && !superevent[0].taken);
        //map to get neurons
        angular.forEach(currentEvents, function(event){
          //just show four first content
          event.contents = (event && event.contents) ? event.contents.splice(0,4) : [];
          angular.forEach(event.contents, function(element){
            element.image = NEURON_COLOR[element.neuron_color]; //jshint ignore:line
          });
        });

        modelEvents.model.events = hasSuperEventAvailable ? angular.copy(currentEvents).splice(0,2) : currentEvents;
        modelEvents.model.superevent = superevent;
        modelEvents.model.showSuperEventDetails = showSuperEventDetails;
        modelEvents.model.hasEvents = (currentEvents.length > 0 || hasSuperEventAvailable);

        ModalService.showModel(modelEvents);
        return eventModalPromise.promise;
      }

      function showEventDetails(index, events){
        modelEvent.model.data = events[index];
        modelEvent.model.data.indexEvent = index;
        ModalService.showModel(modelEvent);
      }

      function showSuperEventDetails(superEvent){
        modelSuperEvent.model.data = superEvent;
        modelSuperEvent.model.data.achievements.forEach(function(achievement) {
          achievement.image = MediaAchievements[achievement.number].settings.badge;
        });
        ModalService.showModel(modelSuperEvent);
      }

      function joinSuperEvent(event) {
        takeSuperEvent(event.id).then(function(){
          modelSuperEvent.model.closeModal();
          showConfirmSuperEvent();
        });
      }

      function joinEvent(event) {
        takeEvent(event.id).then(function(){
          modelEvent.model.closeModal();
          showEventNotification();
        });
      }

      function showEventNotification() {
        var enMessage = 'You joined the event successfully, the contents you must learn are in the Tasks tab.';
        var esMessage = 'Te uniste al evento con éxito, los contenidos que debes aprender están en la pestaña Tareas';
        var message = ($auth.user.language === 'es') ? esMessage : enMessage;
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

      function animateEvent(isSuperEvent){
        var $eventContainer,
            cssClass = 'animated zoomOutDown',
            animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        if(isSuperEvent) {
          $eventContainer = angular.element(document.querySelector('.event.superevent'));
        } else {
          $eventContainer = angular.element(document.querySelector('.event-'+modelEvent.model.data.indexEvent));
        }
        $eventContainer.addClass(cssClass).one(animationEnd, function(){
          $eventContainer.remove();
          modelEvents.model.closeModal();
          if(!isSuperEvent){
            updateEventsCounter();
            eventModalPromise.resolve();
          }
        });
      }

      function updateEventsCounter(){
        UserNotificationsService.totalContentsToLearn += modelEvent.model.data.contents.length;
        $rootScope.$broadcast('notifications.updateCount');
      }

      function showConfirmSuperEvent() {
        var enMessage = 'You joined the super event successfully.';
        var esMessage = 'Te uniste al super evento con éxito.';
        var message = ($auth.user.language === 'es') ? esMessage : enMessage;
        var dialogOptions = {
          templateUrl: 'templates/partials/modal-alert-content.html',
          model: {
            message: message,
            callbacks: {
              btnRight: function() {
                dialogOptions.model.closeModal();
                var isSuperEvent = true;
                animateEvent(isSuperEvent);
              }
            },
            labels: {
              btnRight: 'Ok',
            }
          }
        };
        ModalService.showModel(dialogOptions);
      }
    }
  })();
