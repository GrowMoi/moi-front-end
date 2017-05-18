(function() {
  'use strict';

  var concurrentConfig = {
    ionic: {
      tasks: [],
      options: {
        limit: 5,
        logConcurrentOutput: true
      }
    },
    server: [
      'compass:server',
      'copy:styles',
      'copy:vendor',
      'copy:fonts',
      'jade'
    ],
    test: [
      'compass',
      'copy:styles',
      'copy:vendor',
      'copy:fonts',
      'jade:test'
    ],
    dist: {
      options: {
        limit: 5
      },
      tasks: [
        'compass:dist',
        'copy:dist',
        'copy:vendor',
        'copy:fonts',
        'jade:dist'
      ]
    },
    staging: [
      'compass:staging',
      'copy:styles',
      'copy:vendor',
      'copy:fonts',
      'jade:staging'
    ]
  };

  return module.exports = concurrentConfig;
})();
