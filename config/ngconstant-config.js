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
          facebookKey: '12345678',
          pusherKey: '2fd9acbd37b06708983b',
          cloudinaryName: 'moi-images',
          unsignedUploadPreset: 'nmk8efc6'
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
          apiHost: process.env.apiHost,
          facebookKey: process.env.FACEBOOK_KEY,
          pusherKey: process.env.PUSHER_KEY,
          cloudinaryName: process.env.CLOUDINARY_NAME,
          unsignedUploadPreset: process.env.CLOUDINARY_PRESET
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
          apiHost:'http://moi.backend.haedus.cl',
          facebookKey: '1472552379444628',
          pusherKey: 'f43df1534c561963bc67',
          cloudinaryName: 'moi-images',
          unsignedUploadPreset: 'nmk8efc6'
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
    demo: {
      options: {
        dest: '<%= yeoman.dist %>/<%= yeoman.scripts %>/configuration.js'
      },
      constants: {
        ENV: {
          name: 'demo',
          apiHost: 'http://moi.backend.haedus.cl',
          facebookKey: process.env.FACEBOOK_KEY,
          pusherKey: process.env.PUSHER_KEY,
          cloudinaryName: process.env.CLOUDINARY_NAME,
          unsignedUploadPreset: process.env.CLOUDINARY_PRESET
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
          apiHost: '',
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
