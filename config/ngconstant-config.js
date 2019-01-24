(function() {
  'use strict';
  require('dotenv').config({ silent: true });

  var ngconstantConfig = {
    options: {
      space: '  ',
      wrap: '"use strict";\n\n {%= __ngModule %}',
      name: 'config',
      dest: '<%= yeoman.app %>/<%= yeoman.scripts %>/configuration.js'
    },
    development: {
      constants: {
        ENV: {
          name: 'development',
          apiHost: 'http://localhost:5000',
          imagesProxy: 'https://moi-images-proxy.herokuapp.com',
          facebookKey: '12345678',
          pusherKey: '2fd9acbd37b06708983b',
          cloudinaryName: 'test',
          unsignedUploadPreset: '1AxAzA2',
          gaTrackID: 'UA-101348862-1'
        },
        IMAGES: {
          paths: []
        },
        SOUNDS: {
          paths: []
        },
        VIDEOS: {
          paths: []
        }
      }
    },
    staging: {
      constants: {
        ENV: {
          name: 'staging',
          apiHost: '//moi-staging.herokuapp.com',
          imagesProxy: 'https://moi-images-proxy.herokuapp.com',
          facebookKey: process.env.FACEBOOK_KEY,
          pusherKey: process.env.PUSHER_KEY,
          cloudinaryName: process.env.CLOUDINARY_NAME,
          unsignedUploadPreset: process.env.CLOUDINARY_PRESET,
          gaTrackID: process.env.GA_TRACK_ID
        },
        IMAGES: {
          paths: []
        },
        SOUNDS: {
          paths: []
        },
        VIDEOS: {
          paths: []
        }
      }
    },
    production: {
      options: {
        dest: '<%= yeoman.dist %>/<%= yeoman.scripts %>/configuration.js'
      },
      constants: {
        ENV: {
          name: 'production',
          apiHost: 'http://moi-backend.growmoi.com',
          imagesProxy: 'https://moi-images-proxy.herokuapp.com',
          facebookKey: process.env.FACEBOOK_KEY,
          pusherKey: process.env.PUSHER_KEY,
          cloudinaryName: process.env.CLOUDINARY_NAME,
          unsignedUploadPreset: process.env.CLOUDINARY_PRESET,
          gaTrackID: process.env.GA_TRACK_ID
        },
        IMAGES: {
          paths: []
        },
        SOUNDS: {
          paths: []
        },
        VIDEOS: {
          paths: []
        }
      }
    },
    test: {
      constants: {
        ENV: {
          name: 'test',
          apiHost: 'http://moi-integration.herokuapp.com',
          facebookKey: ''
        },
        IMAGES: {
          paths: []
        },
        SOUNDS: {
          paths: []
        },
        VIDEOS: {
          paths: []
        }
      }
    }
  };

  return module.exports = ngconstantConfig;
})();
