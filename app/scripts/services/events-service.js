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
              contents: [
                {
                  'id': 97,
                  'neuron_id': 8,
                  'media': ['http://res.cloudinary.com/meruba/image/upload/v1536685689/muten_yiuv5x.png'],
                  'kind': 'quien-cuando-donde',
                  'level': 1,
                  'title': 'Que son las artes',
                },
                {
                  'id': 96,
                  'neuron_id': 8,
                  'media': ['http://res.cloudinary.com/meruba/image/upload/v1536685690/aefdas_orxtnh.bmp'],
                  'kind': 'por-que-es',
                  'level': 1,
                  'title': 'Que es lenguaje',
                }
              ],
              expiration_date: 1548124776154, //jshint ignore:line
              image: 'https://cdn4.iconfinder.com/data/icons/badges-and-votes-1/128/Badges_Votes_star-512.png',
              for_user_level_greater: 3, //jshint ignore:line
              kind: 'public'
            },
            {
              title: 'Evento mind blow',
              description: 'Completa todos estos contenidos y se un master',
              contents: [
                {
                  'id': 97,
                  'neuron_id': 8,
                  'media': ['http://res.cloudinary.com/meruba/image/upload/v1536685689/muten_yiuv5x.png'],
                  'kind': 'quien-cuando-donde',
                  'level': 1,
                  'title': 'Que son las artes',
                },
                {
                  'id': 96,
                  'neuron_id': 8,
                  'media': ['http://res.cloudinary.com/meruba/image/upload/v1536685690/aefdas_orxtnh.bmp'],
                  'kind': 'por-que-es',
                  'level': 1,
                  'title': 'Que es lenguaje',
                }
              ],
              expiration_date: 1548124776154, //jshint ignore:line
              image: 'https://cdn4.iconfinder.com/data/icons/badges-and-votes-1/128/Badges_Votes_star-512.png',
              for_user_level_greater: 9, //jshint ignore:line
              kind: 'admin'
            },
            {
              title: 'Evento rama roja',
              description: 'Completa todos estos contenidos y haz crecer tu arbol',
              contents: [
                {
                  'id': 97,
                  'neuron_id': 8,
                  'media': ['http://res.cloudinary.com/meruba/image/upload/v1536685689/muten_yiuv5x.png'],
                  'kind': 'quien-cuando-donde',
                  'level': 1,
                  'title': 'Que son las artes',
                },
                {
                  'id': 96,
                  'neuron_id': 8,
                  'media': ['http://res.cloudinary.com/meruba/image/upload/v1536685690/aefdas_orxtnh.bmp'],
                  'kind': 'por-que-es',
                  'level': 1,
                  'title': 'Que es lenguaje',
                }
              ],
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
