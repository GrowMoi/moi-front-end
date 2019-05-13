(function() {
  'use strict';

    angular.module('moi')
      .value('MediaAchievementsEn', {
        1: {
          name: 'Contents learned',
          description: 'The first 4 contents have been learned',
        },
        2: {
          name: 'Content learned Language branch',
          description: '20 contents of the Language branch have been learned',
        },
        3: {
          name: 'Contents learned branch Art',
          description: '20 contents of the Art branch have been learned',
        },
        4: {
          name: 'Content learned branch Learning',
          description: '20 contents of the Learning branch have been learned',
        },
        5: {
          name: 'Contents learned branch Nature',
          description: '20 contents of the Nature branch have been learned',
        },
        6: {
          name: 'All Contents have been learned',
          description: 'All the contents have been learned',
        },
        7: {
          name: 'Contents learned in each public neuron',
          description: 'At least one content has been learned in each public neuron',
        },
        8: {
          name: 'Tests without errors',
          description: '4 tests without errors have been completed',
        },
        9: {
          name: 'Deployed tests',
          description: '25 tests have been displayed without errors',
        },
        10: {
          name: 'Game over',
          description: 'The user has reached 9 level',
        }
    });
  })();
