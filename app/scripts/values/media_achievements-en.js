(function() {
  'use strict';

    angular.module('moi')
      .value('MediaAchievementsEn', {
        1: {
          name: 'contents learned',
          description: 'Learned the first 4 contents',
          settings: {
            badge:'images/inventory/badges/badge1.png',
            avatar: 'images/avatar/avatar_1.png'
          }
        },
        2: {
          name: 'The origin of money branch contents learned',
          description: 'Learned 20 contents of the origin of money branch',
          settings: {
            badge:'images/inventory/badges/badge2.png',
            avatar: 'images/avatar/avatar_5.png'
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
            avatar: 'images/avatar/avatar_6.png'
          }
        },
        5: {
          name: 'The true value of saving branch contents learned',
          description: 'Learned 20 contents of the true value of saving branch',
          settings: {
            badge:'images/inventory/badges/badge9.png',
            avatar: 'images/avatar/avatar_7.png'
          }
        },
        6: {
          name: 'Total contents learned',
          description: 'All contents in the tree have been learned',
          settings: {
            badge:'images/inventory/badges/badge8.png',
            avatar: 'images/avatar/avatar_3.png'
          }
        },
        7: {
          name: 'One content in every fruit',
          description: 'At least one content was learned in every fruit in the tree',
          settings: {
            badge:'images/inventory/badges/badge7.png',
            avatar: 'images/avatar/avatar_4.png'
          }
        },
        8: {
          name: 'Perfect tests',
          description: 'Completed 4 tests without making mistakes',
          settings: {
            badge:'images/inventory/badges/badge5.png',
            avatar: 'images/avatar/avatar_8.png'
          }
        },
        9: {
          name: 'Deployed tests',
          description: 'You deployed at least 50 total tests',
          settings: {
            badge:'images/inventory/badges/badge6.png',
            avatar: 'images/avatar/avatar_5.png'
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
