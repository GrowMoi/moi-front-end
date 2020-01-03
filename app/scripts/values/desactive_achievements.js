(function() {
  'use strict';

    angular.module('moi')
      .value('DesactiveAchievements', {
        1:{
          desactive: true,
          description: 'Aprende tus primeros 4 contenidos para ganar un nuevo avatar',
          name: 'Contenidos Aprendidos',
          settings:{badge:'images/inventory/badges/item1.png'}
        },
        2:{
          desactive: true,
          description: 'Aprende 9 contenidos de color azul para ganar un nuevo avatar',
          name: 'Contenidos color Azul',
          settings:{badge:'images/inventory/badges/default-badge.png'}
        },
        // 3:{
        //   desactive: true,
        //   description: 'Aprende 20 contenidos de color rojo para ganar un nuevo avatar',
        //   name: 'Contenidos color Rojo',
        //   settings:{badge:'images/inventory/badges/item3.png'}
        // },
        4:{
          desactive: true,
          description: 'Aprende 9 contenidos de color amarillo para ganar un nuevo avatar',
          name: 'Contenidos color Amarillo',
          settings:{badge:'images/inventory/badges/default-badge.png'}
        },
        5:{
          desactive: true,
          description: 'Aprende 9 contenidos de color rojo para ganar un nuevo avatar',
          name: 'Contenidos color Rojo',
          settings:{badge:'images/inventory/badges/default-badge.png'}
        },
        6:{
          desactive: true,
          description: 'Aprende todos los contenidos para ganar un nuevo avatar',
          name: 'Aprende todos los contenidos',
          settings:{badge:'images/inventory/badges/item8.png'}
        },
        7:{
          desactive: true,
          description: 'Aprende un contenido en cada fruto para ganar un nuevo avatar',
          name: 'Contenidos de cada fruto',
          settings:{badge:'images/inventory/badges/item7.png'}
        },
        8:{
          desactive: true,
          description: 'Completa 4 pruebas sin errores (16 preguntas sin errores) para ganar un nuevo avatar',
          name: 'Completa 4 pruebas',
          settings:{badge:'images/inventory/badges/item6.png'}
        },
        9:{
          desactive: true,
          description: 'Despliega 8 pruebas para ganar un nuevo avatar',
          name: 'Despliega 8 pruebas',
          settings:{badge:'images/inventory/badges/item5.png'}
        },
        10:{
          desactive: true,
          description: 'Alcanzar el nivel 5 para ganar un nuevo avatar',
          name: 'Final del juego',
          settings:{badge:'images/inventory/badges/item10.png'}
        }});
  })();
