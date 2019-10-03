(function() {
  'use strict';

  angular.module('moi')
    .value('SoundsPage', {
      login: {
        sound: 'sounds/intro_sound.wav',
        type: 'wav'
      },
      /*jshint camelcase: false */
      'login.first_step': {
        sound: 'sounds/intro_sound.wav',
        type: 'wav'
      },
      neuron: {
        sound: 'sounds/principal_sound.m4a',
        type: 'mp3',
        volume: 0.2
      },
      content: {
        sound: 'sounds/principal_sound.m4a',
        type: 'mp3',
        volume: 0.2
      },
      settings: {
        sound: 'sounds/principal_sound.m4a',
        type: 'mp3',
        volume: 0.2
      },
      test: {
        sound: 'sounds/test_sound.m4a',
        type: 'mp3'
      },
      tree: {
        sound: 'sounds/principal_sound.m4a',
        type: 'mp3'
      },
      searches: {
        sound: 'sounds/principal_sound.m4a',
        type: 'mp3',
        volume: 0.2
      },
      profile: {
        sound: 'sounds/principal_sound.m4a',
        type: 'mp3',
        volume: 0.2
      },
      profileEdit: {
        sound: 'sounds/principal_sound.m4a',
        type: 'mp3',
        volume: 0.2
      },
      friends: {
        sound: 'sounds/principal_sound.m4a',
        type: 'mp3',
        volume: 0.2
      },
      tasks: {
        sound: 'sounds/principal_sound.m4a',
        type: 'mp3',
        volume: 0.2
      },
      inventory:{
        sound: 'sounds/principal_sound.m4a',
        type: 'mp3',
        volume: 0.2
      },
      guide: {
        sound: 'sounds/principal_sound.m4a',
        type: 'mp3',
        volume: 0.2
      },
      quiz: {
        sound: 'sounds/test_sound.m4a',
        type: 'mp3'
      },
      finaltest:{
        sound: 'sounds/test_sound.m4a',
        type: 'mp3'
      }
    });
})();
