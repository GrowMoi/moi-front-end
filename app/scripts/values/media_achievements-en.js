(function() {
  'use strict';

    angular.module('moi')
      .value('MediaAchievementsEn', {
        1: {
          name: 'contents learned',
          description: 'Learned the first 4 contents',
          settings: {
            badge:'images/inventory/badges/badge1.png',
            video: 'videos/vineta_1.mp4'
          }
        },
        2: {
          name: 'Language branch contents learned',
          description: 'Learned 20 contents of the language branch',
          settings: {
            badge:'images/inventory/badges/badge2.png',
            avatar: 'images/avatar/uno.png'
          }
        },
        3: {
          name: 'Arts branch contents learned',
          description: 'Learned 20 contents of the arts branch',
          settings: {
            badge:'images/inventory/badges/badge3.png',
            avatar: 'images/avatar/dos.png'
          }
        },
        4: {
          name: 'Learning branch contents learned',
          description: 'Learned 20 contents of the learning branch',
          settings: {
            badge:'images/inventory/badges/badge4.png',
            avatar: 'images/avatar/tres.png'
          }
        },
        5: {
          name: 'Nature branch contents learned',
          description: 'Learned 20 contents of the nature branch',
          settings: {
            badge:'images/inventory/badges/badge9.png',
            avatar: 'images/avatar/cuatro.png'
          }
        },
        6: {
          name: 'Total contents learned',
          description: 'All contents in the tree have been learned',
          settings: {
            badge:'images/inventory/badges/badge8.png',
            video: 'videos/vineta_4.mp4'
          }
        },
        7: {
          name: 'One content in every fruit',
          description: 'At least one content was learned in every fruit in the tree',
          settings: {
            badge:'images/inventory/badges/badge7.png',
            video: 'videos/vineta_3.mp4'
          }
        },
        8: {
          name: 'Perfect tests',
          description: 'Completed 4 tests without making mistakes',
          settings: {
            badge:'images/inventory/badges/badge5.png',
            avatar: 'images/avatar/cinco.png'
          }
        },
        9: {
          name: 'Deployed tests',
          description: 'You deployed at least 50 total tests',
          settings: {
            badge:'images/inventory/badges/badge6.png',
            video: 'videos/vineta_2.mp4'
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
