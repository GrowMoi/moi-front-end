(function() {
  'use strict';

    angular.module('moi')
      .value('DesactiveAchievementsEn', {
        1:{
          desactive: true,
          description: 'Learn your first 4 contents to win a new avatar',
          name: 'Learned 4 contents',
          settings:{badge:'images/inventory/badges/item1.png'}
        },
        2:{
          desactive: true,
          description: 'Learn 9 blue contents to win a new avatar',
          name: 'Learned blue contents',
          settings:{badge:'images/inventory/badges/default-item.png'}
        },
        // 3:{
        //   desactive: true,
        //   description: 'Learn 20 red contents to win a new avatar,',
        //   name: 'Learned red contents',
        //   settings:{badge:'images/inventory/badges/item3.png'}
        // },
        4:{
          desactive: true,
          description: 'Learn 9 yellow contents to win a new avatar',
          name: 'Learned yellow contents',
          settings:{badge:'images/inventory/badges/default-item.png'}
        },
        5:{
          desactive: true,
          description: 'Learn 9 red contents to win a new avatar',
          name: 'Learned red contents',
          settings:{badge:'images/inventory/badges/default-item.png'}
        },
        6:{
          desactive: true,
          description: 'Learn every content in the Mi Aula BdP tree to win a new avatar',
          name: 'Learn every content in the tree',
          settings:{badge:'images/inventory/badges/item8.png'}
        },
        7:{
          desactive: true,
          description: 'Learn at least one content in each fruit in the Mi Aula BdP tree to win a new avatar',
          name: 'One content in each fruit',
          settings:{badge:'images/inventory/badges/item7.png'}
        },
        8:{
          desactive: true,
          description: 'Finish 4 tests without mistakes to win a new avatar',
          name: 'Four tests',
          settings:{badge:'images/inventory/badges/item6.png'}
        },
        9:{
          desactive: true,
          description: 'Deploy 8 tests to win a new avatar',
          name: 'Deploy 8 tests',
          settings:{badge:'images/inventory/badges/item5.png'}
        },
        10:{
          desactive: true,
          description: 'Reach the last level of the tree to win a new avatar',
          name: 'Final test',
          settings:{badge:'images/inventory/badges/item10.png'}
        }
       });
  })();
