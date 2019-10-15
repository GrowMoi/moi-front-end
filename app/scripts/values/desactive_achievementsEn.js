(function() {
  'use strict';

    angular.module('moi')
      .value('DesactiveAchievementsEn', {
        1:{
          desactive: true,
          description: 'Learn your first 4 contents to win this item',
          name: 'Learned 4 contents',
          settings:{badge:'images/inventory/badges/item1.png'}
        },
        2:{
          desactive: true,
          description: 'Learn 20 yellow contents to win this item',
          name: 'Learned yellow contents',
          settings:{badge:'images/inventory/badges/item2.png'}
        },
        // 3:{
        //   desactive: true,
        //   description: 'Learn 20 red contents to win this item,',
        //   name: 'Learned red contents',
        //   settings:{badge:'images/inventory/badges/item3.png'}
        // },
        4:{
          desactive: true,
          description: 'Learn 20 blue contents to win this item',
          name: 'Learned blue contents',
          settings:{badge:'images/inventory/badges/item4.png'}
        },
        5:{
          desactive: true,
          description: 'Learn 20 red contents to win this item',
          name: 'Learned red contents',
          settings:{badge:'images/inventory/badges/item9.png'}
        },
        6:{
          desactive: true,
          description: 'Deploy 25 tests to win this item',
          name: 'Deploy 25 tests',
          settings:{badge:'images/inventory/badges/item5.png'}
        },
        7:{
          desactive: true,
          description: 'Learn at least one content in each fruit in the Moi tree to win this item',
          name: 'One content in each fruit',
          settings:{badge:'images/inventory/badges/item7.png'}
        },
        8:{
          desactive: true,
          description: 'Learn every content in the Moi tree to win this item',
          name: 'Learn every content in the tree',
          settings:{badge:'images/inventory/badges/item8.png'}
        },
        9:{
          desactive: true,
          description: 'Finish 4 tests without mistakes to win this item',
          name: 'Four tests',
          settings:{badge:'images/inventory/badges/item6.png'}
        },
        10:{
          desactive: true,
          description: 'Reach the last level of the tree to win this item',
          name: 'Final test',
          settings:{badge:'images/inventory/badges/item10.png'}
        }
       });
  })();
