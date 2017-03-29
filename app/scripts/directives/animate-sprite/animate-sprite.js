/*
The original directive was taken from
https://github.com/tusharghate/angular-simple-sprite/blob/master/dist/angular-simple-sprite.js


options directive
  src: 'images/test-image.png',
  frameWidth: 597,
  frameHeight: 361,
  frames: 30,
  repeat: false,
  speed: 200,
  playOnClick: false

*/

(function() {
  'use strict';

  angular
    .module('moi.directives')
    .directive('animateSprite', animateSprite);

  function animateSprite() {
    var directive = {
      restrict: 'AE',
      replace: false,
      templateUrl: 'templates/directives/animate-sprite/animate-sprite.html',
      scope: {
        options: '='
      },
      controller: animateController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  function animateController($window, $scope, $q) {

    var vm = this;

    var options,
      src,
      frameWidth,
      frameHeight,
      frames,
      zoom,
      framesPerRow = 0,
      repeat = true,
      speed = 100,
      // flags
      statusAnimation = {
        playing: false,
        pause: false,
        done: false
      },
      //sounds
      audioLoadDefer = $q.defer(),
      moiSound;
      // Keeps track of the current x and y positions of the sprite.
      var spritePosition = {
        x: 0,
        y: 0
      };

      var animationInterval = null;

    /* sound */

    $scope.$on('audioLoaded', function (e, moiSoundInstance) {
      moiSound = moiSoundInstance;
      audioLoadDefer.resolve();
    });

    /**
     * Initializes the sprite with default CSS styles and options passed in by
     * the user. Starts the sprite animation.
     */
    function init() {
      options = vm.options || {};
      src = options.src;
      frameWidth = parseInt(options.frameWidth, 10);
      frameHeight = parseInt(options.frameHeight, 10);
      frames = parseInt(options.frames, 10);
      repeat = false;
      speed = options.speed;
      framesPerRow = options.framesPerRow;
      zoom = options.zoom || 0.2;

      vm.playAnimateSprite = playAnimateSprite;
      vm.endSound = endSound;

      vm.css = {
        display: 'block',
        width: frameWidth + 'px',
        height: frameHeight + 'px',
        background: 'url(' + src + ') repeat',
        zoom: zoom
      };

      if (options.playOnClick !== true) {
        animate();
      }
    }

    function playAnimateSprite() {
      if (vm.options.playOnClick && statusAnimation.playing === false) {
        statusAnimation.playing = true;
        spritePosition = {
          x: 0,
          y: 0
        };
        if (vm.options.sound && moiSound) {
          moiSound.play();
          animate();
        }else{
          animate();
        }
      }
    }

    function endSound() {
      vm.options.finishedSound();
    }

    /**
     * Animates the sprite.
     */
    function animate() {

      /**
       * Returns whether the sprite animation has completed or not.
       */
      function isAnimationComplete() {
        var toReturn = false;

        if (framesPerRow) {
          var numRows = frames / framesPerRow;

          if (spritePosition.x >= (framesPerRow - 1) * frameWidth &&
            spritePosition.y >= numRows * frameHeight) {
            toReturn = true;
            statusAnimation.done = true;
            vm.options.finishedAnimation();
          }

        } else {
          if (spritePosition.x >= frameWidth * frames) {
            toReturn = true;
            statusAnimation.done = true;
            vm.options.finishedAnimation();
          }
        }
        //update status
        statusAnimation.playing = !toReturn;
        return toReturn;
      }

      animationInterval = $window.setInterval(function() {
        // Update the sprite frame
        var position =  -spritePosition.x + 'px' + ' ' + spritePosition.y + 'px';
        $scope.$apply(function() {
          vm.css['background-position'] = position;
        });

        // Determine if we should loop the animation, or stop, if the animation is complete
        if (isAnimationComplete()) {
          if (repeat) {
            spritePosition.x = 0;
            spritePosition.y = 0;
          } else {
            $window.clearInterval(animationInterval);
            // $interval.cancel(animationInterval);
          }
        } else {
          // Increment the X position
          spritePosition.x += frameWidth;

          // Check if we should move to the next row
          if (framesPerRow !== null && spritePosition.x + frameWidth > frameWidth * framesPerRow) {
            spritePosition.x = 0;
            spritePosition.y += frameHeight;
          }
        }
      }, speed);
    }

    $scope.$on('$destroy', function() {
      $window.clearInterval(animationInterval);
      // $interval.cancel(animationInterval);
    });

    init();

  }
})();
