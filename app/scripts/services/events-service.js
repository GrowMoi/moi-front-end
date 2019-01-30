(function () {
  'use strict';

    angular
      .module('moi.services')
      .factory('EventsService', EventsService);

    function EventsService($q) {
      var service = {
        getEvents: getEvents
      };

      return service;

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
