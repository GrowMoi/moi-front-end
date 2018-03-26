(function() {
  'use strict';

    angular.module('moi')
      .value('MediaAchievements', {
        1: {
          name: 'Contenidos aprendidos',
          description: 'Han sido aprendidos los primeros 4 contenidos',
          settings: {
            badge:'images/inventory/badges/badge1.png',
            video: 'videos/vineta_1.mp4'
          }
        },
        2: {
          name: 'Contenidos aprendidos rama Lenguaje',
          description: 'Han sido aprendidos 20 contenidos de la rama Lenguaje',
          settings: {
            badge:'images/inventory/badges/badge2.png',
            theme: 'amarillo'
          }
        },
        3: {
          name: 'Contenidos aprendidos rama Arte',
          description: 'Han sido aprendidos 20 contenidos de la rama Arte',
          settings: {
            badge:'images/inventory/badges/badge3.png',
            theme: 'rojo'
          }
        },
        4: {
          name: 'Contenidos aprendidos rama Aprender',
          description: 'Han sido aprendidos 20 contenidos de la rama Aprender',
          settings: {
            badge:'images/inventory/badges/badge4.png',
            theme: 'azul'
          }
        },
        5: {
          name: 'Contenidos aprendidos rama Naturaleza',
          description: 'Han sido aprendidos 20 contenidos de la rama Naturaleza',
          settings: {
            badge:'images/inventory/badges/badge9.png',
            theme: 'verde'
          }
        },
        6: {
          name: 'Contenidos aprendidos en total',
          description: 'Todos los contenidos han sido aprendidos',
          settings: {
            badge:'images/inventory/badges/badge8.png',
            video: 'videos/vineta_4.mp4'
          }
        },
        7: {
          name: 'Contenidos aprendidos en cada neurona pública',
          description: 'Al menos un contenido ha sido aprendido en cada neurona pública',
          settings: {
            badge:'images/inventory/badges/badge7.png',
            video: 'videos/vineta_3.mp4'
          }
        },
        8: {
          name: 'Tests sin errores',
          description: 'Han sido completados 4 test sin errores',
          settings: {
            badge:'images/inventory/badges/badge5.png',
            theme: 'violeta'
          }
        },
        9: {
          name: 'Tests desplegados',
          description: 'Han sido desplegados 50 test sin errores',
          settings: {
            badge:'images/inventory/badges/badge6.png',
            video: 'videos/vineta_2.mp4'
          }
        },
        10: {
          name: 'Tests Final',
          description: 'El usuario ha llegado al nivel 9',
          settings: {
            badge:'images/inventory/badges/badge10.png',
            runFunction: 'openModal'
          }
        }
    });
  })();
