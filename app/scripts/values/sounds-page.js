(function() {
  'use strict';

  angular.module('moi')
    .value('SoundsPage', {
      login: {
        sound: 'sounds/intro.mp3',
        type: 'mp3'
      },
      /*jshint camelcase: false */
      'new_login.first_step': {
        sound: 'sounds/intro.mp3',
        type: 'mp3'
      },
      neuron: {
        sound: 'sounds/read_content.mp3',
        type: 'mp3',
        volume: 0.2
      },
      content: {
        sound: 'sounds/read_content.mp3',
        type: 'mp3',
        volume: 0.2
      },
      settings: {
        sound: 'sounds/read_content.mp3',
        type: 'mp3',
        volume: 0.2
      },
      test: {
        sound: 'sounds/test.mp3',
        type: 'mp3'
      },
      tree: {
        sound: 'sounds/fondo.mp3',
        type: 'mp3'
      },
      searches: {
        sound: 'sounds/read_content.mp3',
        type: 'mp3',
        volume: 0.2
      },
      profile: {
        sound: 'sounds/read_content.mp3',
        type: 'mp3',
        volume: 0.2
      },
      profileEdit: {
        sound: 'sounds/read_content.mp3',
        type: 'mp3',
        volume: 0.2
      },
      friends: {
        sound: 'sounds/read_content.mp3',
        type: 'mp3',
        volume: 0.2
      },
      tasks: {
        sound: 'sounds/read_content.mp3',
        type: 'mp3',
        volume: 0.2
      },
      inventory:{
        sound: 'sounds/read_content.mp3',
        type: 'mp3',
        volume: 0.2
      },
      guide: {
        sound: 'sounds/read_content.mp3',
        type: 'mp3',
        volume: 0.2
      },
      quiz: {
        sound: 'sounds/test.mp3',
        type: 'mp3'
      },
      finaltest:{
        sound: 'sounds/test.mp3',
        type: 'mp3'
      }
    });
})();
