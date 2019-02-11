(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('EventsService', EventsService);

    function EventsService($http, ENV, PopupService, $q) {
      var service = {
        getEvents: getEvents, // cambiar por getDailyEvents para probar con el backend
        getDailyEvents: getDailyEvents,
        getEventDetails: getEventDetails,
        takeEvent: takeEvent
      };
      var popupOptions = { title: 'Error'};

      return service;

      function getDailyEvents() {
        return $http({
          method: 'GET',
          url: ENV.apiHost + '/api/events/today'
        }).then(function success(res) {
          return res;
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

      function getEvents() {
        var deferred = $q.defer();
        deferred.resolve(getMockData());
        return deferred.promise;
      }

      function getMockData() {
        return {
          data: [
            {
              title: 'Evento rama verder',
              description: 'Completa todos estos contenidos y haz crecer tu arbol',
              neurons: [
                {
                  id: 2284,
                  state: 'florecida',
                  title: 'Jugar'
                },
                {
                  id: 2293,
                  state: 'florecida',
                  title: 'Aprender'
                },
                {
                  id: 2293,
                  state: 'florecida',
                  title: 'Leer'
                },
                {
                  id: 2293,
                  state: 'florecida',
                  title: 'Dibujar'
                }
              ],
              event_date: 1548124776154, //jshint ignore:line
              expiration_date: 1548124776154, //jshint ignore:line
              image: 'https://cdn4.iconfinder.com/data/icons/badges-and-votes-1/128/Badges_Votes_star-512.png',
              for_user_level_greater: 3, //jshint ignore:line
              kind: 'public'
            },
            {
              title: 'Evento mind blow',
              description: 'Completa todos estos contenidos y se un master',
              neurons: [
                {
                  id: 2766,
                  state: 'descubierta',
                  title: 'Artes',
                },
                {
                  id: 2624,
                  state: 'florecida',
                  title: 'Ordenar'
                }
              ],
              event_date: 1548124776154, //jshint ignore:line
              expiration_date: 1548124776154, //jshint ignore:line
              image: 'https://cdn4.iconfinder.com/data/icons/badges-and-votes-1/128/Badges_Votes_star-512.png',
              for_user_level_greater: 9, //jshint ignore:line
              kind: 'admin'
            },
            {
              title: 'Evento rama roja',
              description: 'Completa todos estos contenidos y haz crecer tu arbol',
              neurons: [
                {
                  id: 2293,
                  state: 'florecida',
                  title: 'Aprender'
                },
                {
                  id: 2766,
                  state: 'descubierta',
                  title: 'Artes',
                },
              ],
              event_date: 1548124776154, //jshint ignore:line
              expiration_date: 1548124776154, //jshint ignore:line
              image: 'https://cdn4.iconfinder.com/data/icons/badges-and-votes-1/128/Badges_Votes_star-512.png',
              for_user_level_greater: 3, //jshint ignore:line
              kind: 'public'
            },
          ]
        };
      }
    }
  })();
