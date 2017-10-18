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
      'jadengtemplatecache'
    ],
    test: [
      'compass',
      'copy:styles',
      'copy:vendor',
      'copy:fonts',
      'jadengtemplatecache'
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
        'jadengtemplatecache'
      ]
    },
    staging: [
      'compass:staging',
      'copy:styles',
      'copy:vendor',
      'copy:fonts',
      'jadengtemplatecache'
    ]
  };

  return module.exports = concurrentConfig;
})();
