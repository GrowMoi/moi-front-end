(function() {
  'use strict';

    angular.module('moi')
      .value('MediaAchievementsEn', {
        1: {
          name: 'contents learned',
          description: 'Learned the first 4 contents',
          settings: {
            badge:'images/inventory/badges/badge1.png',
            avatar: 'perfil_1.png'
          }
        },
        2: {
          name: 'The true value of saving branch contents learned',
          description: 'Learned 20 contents of the true value of saving branch',
          settings: {
            badge:'images/inventory/badges/badge2.png',
            avatar: 'perfil_2.png'
          }
        },
        // 3: {
        //   name: 'Arts branch contents learned',
        //   description: 'Learned 20 contents of the arts branch',
        //   settings: {
        //     badge:'images/inventory/badges/badge3.png',
        //     avatar: 'images/avatar/avatar_2.png'
        //   }
        // },
        4: {
          name: 'The importance of the budget branch contents learned',
          description: 'Learned 20 contents of the The importance of the budget branch',
          settings: {
            badge:'images/inventory/badges/badge4.png',
            avatar: 'perfil_3.png'
          }
        },
        5: {
          name: 'What are your dreams? 2 branch contents learned',
          description: 'Learned 20 contents of what are your dreams? 2 branch',
          settings: {
            badge:'images/inventory/badges/badge9.png',
            avatar: 'perfil_4.png'
          }
        },
        6: {
          name: 'Total contents learned',
          description: 'All contents in the tree have been learned',
          settings: {
            badge:'images/inventory/badges/badge8.png',
            avatar: 'perfil_5.png'
          }
        },
        7: {
          name: 'One content in every fruit',
          description: 'At least one content was learned in every fruit in the tree',
          settings: {
            badge:'images/inventory/badges/badge7.png',
            avatar: 'perfil_6.png'
          }
        },
        8: {
          name: 'Perfect tests',
          description: 'Completed 4 tests without making mistakes',
          settings: {
            badge:'images/inventory/badges/badge5.png',
            avatar: 'perfil_7.png'
          }
        },
        9: {
          name: 'Deployed tests',
          description: 'You deployed at least 50 total tests',
          settings: {
            badge:'images/inventory/badges/badge6.png',
            avatar: 'perfil_8.png'
          }
        },
        10: {
          name: 'Final test',
          description: 'You reached level 9',
          settings: {
            badge:'images/inventory/badges/badge10.png',
            runFunction: 'openModal'
          }
        }
    });
  })();
