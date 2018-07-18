(function () {
  'use strict';

  describe('moiSound', function () {
    var $compile,
        $scope,
        element,
        controller,
        $window,
        audioMock;

    beforeEach(module('moi.directives'));
    beforeEach(module('moi.templates'));

    beforeEach(inject(
      function (_$compile_, _$rootScope_, _$window_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
        $window = _$window_;
      })
    );

    describe('#moi sound directive', function(){
      beforeEach(function(){
        audioMock = {
          play: sinon.spy(),
          pause: sinon.spy()
        };
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
  });
})();
