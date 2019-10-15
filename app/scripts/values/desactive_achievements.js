(function() {
  'use strict';

    angular.module('moi')
      .value('DesactiveAchievements', {
        1:{
          desactive: true,
          description: 'Aprende tus primeros 4 contenidos para ganar este item',
          name: 'Contenidos Aprendidos',
          settings:{badge:'images/inventory/badges/item1.png'}
        },
        2:{
          desactive: true,
          description: 'Aprende 20 contenidos de color amarillo para ganar este item',
          name: 'Contenidos color Amarillo',
          settings:{badge:'images/inventory/badges/item2.png'}
        },
        // 3:{
        //   desactive: true,
        //   description: 'Aprende 20 contenidos de color rojo para ganar este item',
        //   name: 'Contenidos color Rojo',
        //   settings:{badge:'images/inventory/badges/item3.png'}
        // },
        4:{
          desactive: true,
          description: 'Aprende 20 contenidos de color azul',
          name: 'Contenidos color Azul',
          settings:{badge:'images/inventory/badges/item4.png'}
        },
        5:{
          desactive: true,
          description: 'Aprende 20 contenidos de color rojo para ganar este item',
          name: 'Contenidos color Rojo',
          settings:{badge:'images/inventory/badges/item9.png'}
        },
        6:{
          desactive: true,
          description: 'Despliega 25 pruebas para ganar este item',
          name: 'Despliega 25 pruebas',
          settings:{badge:'images/inventory/badges/item5.png'}
        },
        7:{
          desactive: true,
          description: 'Aprende un contenido en cada fruto para ganar este item',
          name: 'Contenidos de cada fruto',
          settings:{badge:'images/inventory/badges/item7.png'}
        },
        8:{
          desactive: true,
          description: 'Aprende todos los contenidos para ganar este item',
          name: 'Aprende todos los contenidos',
          settings:{badge:'images/inventory/badges/item8.png'}
        },
        9:{
          desactive: true,
          description: 'Completa 4 pruebas sin errores (16 preguntas sin errores) para ganar este item',
          name: 'Completa 4 pruebas',
          settings:{badge:'images/inventory/badges/item6.png'}
        },
        10:{
          desactive: true,
          description: 'Alcanzar el nivel 9 para ganar este item',
          name: 'Final del juego',
          settings:{badge:'images/inventory/badges/item10.png'}
        }});
  })();
