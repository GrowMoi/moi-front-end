(function () {
  'use strict';

  describe('moiSound', function () {
    var $compile,
        $scope,
        element,
        controller,
        $window,
        $cordovaNativeAudio,
        audioMock;

    beforeEach(module('moi.directives'));
    beforeEach(module('moi.templates'));
    beforeEach(module('ionic'));
    beforeEach(angular.mock.module(function ($provide) {

      $provide.provider('$cordovaNativeAudio', function () {
        return {
          $get: function () {
            return {
              preloadComplex: function(){
                return {finally: function(){return null;}};
              },
              play: sinon.spy(),
              stop: sinon.spy(),
              unload: sinon.spy()
            };
          }
        };
      });
    }));

    beforeEach(inject(
      function (_$compile_, _$rootScope_, _$window_, _$cordovaNativeAudio_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
        $window = _$window_;
        $cordovaNativeAudio = _$cordovaNativeAudio_;
      })
    );

    describe('#with $window.cordova undefined', function(){
      beforeEach(function(){
        audioMock = {
          play: sinon.spy(),
          pause: sinon.spy()
        };
        $window.cordova = false;
        $scope.sound = '../sounds/fondo.mp3';
        element = angular.element(
          '<moi-sound sound="{{sound}}"></moi-sound>'
        );
        $compile(element)($scope);
        $scope.$digest();
        controller = element.controller('moiSound');
        controller.$audio = element.find('audio');
        controller.$audio[0] = audioMock;
      });
      describe('#directive init', function(){
        it('should have the same params you set', function(){
          chai.expect($scope.sound).to.deep.equals(controller.sound);
        });

        it('should return the audioType into soundType', function(){
          chai.expect(controller.soundType).to.deep.equals('audio/mp3');
        });

        it('should plays audio', function() {
          controller.play();
          sinon.assert.calledOnce(controller.$audio[0].play);
        });

      });

      describe('#functions', function(){
        it('should call audio.paused when stop()', function(){
          controller.stop();
          sinon.assert.calledOnce(controller.$audio[0].pause);
        });
      });

    });

    describe('#with $window.cordova defined', function(){
      beforeEach(function(){
        $window.cordova = true;
        $scope.sound = '../sounds/fondo.mp3';
        element = angular.element(
          '<moi-sound sound="{{sound}}"></moi-sound>'
        );
        $compile(element)($scope);
        $scope.$digest();
        controller = element.controller('moiSound');
      });
      describe('#directive init', function(){
        it('should have the same params you set', function(){
          chai.expect($scope.sound).to.deep.equals(controller.sound);
        });

        it('should return the audioType into soundType', function(){
          chai.expect(controller.soundType).to.deep.equals('audio/mp3');
        });

        it('should plays audio', function() {
          controller.play();
          sinon.assert.calledOnce($cordovaNativeAudio.play);
        });
      });

      describe('#functions', function(){
        it('should call audio.paused when stop()', function(){
          controller.stop();
          sinon.assert.calledOnce($cordovaNativeAudio.stop);
        });
      });

    });
  });
})();
