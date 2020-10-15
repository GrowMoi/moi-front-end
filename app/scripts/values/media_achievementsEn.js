(function() {
  'use strict';

    angular.module('moi')
      .value('MediaAchievementsEn', {
        1: {
          name: 'Contents learned',
          description: 'The first 4 contents have been learned',
          settings: {
            badge:'images/inventory/badges/badge1.png',
            video: 'videos/vineta_1.mp4'
          }
        },
        2: {
          name: 'Content learned Language branch',
          description: '20 contents of the Language branch have been learned',
          settings: {
            badge:'images/inventory/badges/badge2.png',
            theme: 'moi_amarillo'
          }
        },
        3: {
          name: 'Contents learned branch Art',
          description: '20 contents of the Art branch have been learned',
          settings: {
            badge:'images/inventory/badges/badge3.png',
            theme: 'moi_rojo'
          }
        },
        4: {
          name: 'Content learned branch Learning',
          description: '20 contents of the Learning branch have been learned',
          settings: {
            badge:'images/inventory/badges/badge4.png',
            theme: 'moi_azul'
          }
        },
        5: {
          name: 'Contents learned branch Nature',
          description: '20 contents of the Nature branch have been learned',
          settings: {
            badge:'images/inventory/badges/badge9.png',
            theme: 'moi_verde'
          }
        },
        6: {
          name: 'All Contents have been learned',
          description: 'All the contents have been learned',
          settings: {
            badge:'images/inventory/badges/badge8.png',
            video: 'videos/vineta_4.mp4'
          }
        },
        7: {
          name: 'Contents learned in each public neuron',
          description: 'At least one content has been learned in each public neuron',
          settings: {
            badge:'images/inventory/badges/badge7.png',
            video: 'videos/vineta_3.mp4'
          }
        },
        8: {
          name: 'Tests without errors',
          description: '4 tests without errors have been completed',
          settings: {
            badge:'images/inventory/badges/badge5.png',
            theme: 'moi_violeta'
          }
        },
        9: {
          name: 'Deployed tests',
          description: '25 tests have been displayed without errors',
          settings: {
            badge:'images/inventory/badges/badge6.png',
            video: 'videos/vineta_2.mp4'
          }
        },
        10: {
          name: 'Game over',
          description: 'The user has reached 9 level',
          settings: {
            badge:'images/inventory/badges/badge10.png',
            runFunction: 'openModal'
          }
        }
    });
  })();
