(function() {
  'use strict';

    angular.module('moi')
      .value('MediaAchievements', {
        1: {
          name: 'Contenidos aprendidos',
          description: 'Han sido aprendidos los primeros 4 contenidos',
          settings: {
            badge:'images/inventory/badges/badge1.png',
            avatar: 'images/avatar/placegolder_perfil_1.png'
          }
        },
        2: {
          name: 'Contenidos aprendidos rama El origen del Dinero',
          description: 'Han sido aprendidos 20 contenidos de la rama El origen del Dinero',
          settings: {
            badge:'images/inventory/badges/badge2.png',
            avatar: 'images/avatar/placegolder_perfil_2.png'
          }
        },
        // 3: {
        //   name: 'Contenidos aprendidos rama Arte',
        //   description: 'Han sido aprendidos 20 contenidos de la rama Arte',
        //   settings: {
        //     badge:'images/inventory/badges/badge3.png',
        //     avatar: 'images/avatar/avatar_2.png'
        //   }
        // },
        4: {
          name: 'Contenidos aprendidos rama La importancia del presupuesto',
          description: 'Han sido aprendidos 20 contenidos de la rama La importancia del presupuesto',
          settings: {
            badge:'images/inventory/badges/badge4.png',
            avatar: 'images/avatar/placegolder_perfil_3.png'
          }
        },
        5: {
          name: 'Contenidos aprendidos rama El verdadero valor del ahorro',
          description: 'Han sido aprendidos 20 contenidos de la rama El verdadero valor del ahorro',
          settings: {
            badge:'images/inventory/badges/badge9.png',
            avatar: 'images/avatar/placegolder_perfil_4.png'
          }
        },
        6: {
          name: 'Contenidos aprendidos en total',
          description: 'Todos los contenidos han sido aprendidos',
          settings: {
            badge:'images/inventory/badges/badge8.png',
            avatar: 'images/avatar/placegolder_perfil_5.png'
          }
        },
        7: {
          name: 'Contenidos aprendidos en cada neurona pública',
          description: 'Al menos un contenido ha sido aprendido en cada neurona pública',
          settings: {
            badge:'images/inventory/badges/badge7.png',
            avatar: 'images/avatar/placegolder_perfil_6.png'
          }
        },
        8: {
          name: 'Tests sin errores',
          description: 'Han sido completados 4 test sin errores',
          settings: {
            badge:'images/inventory/badges/badge5.png',
            avatar: 'images/avatar/placegolder_perfil_7.png'
          }
        },
        9: {
          name: 'Tests desplegados',
          description: 'Han sido desplegados 8 test sin errores',
          settings: {
            badge:'images/inventory/badges/badge6.png',
            avatar: 'images/avatar/placegolder_perfil_8.png'
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
