(function () {
  'use strict';

  describe('moiSound', function () {
    var $compile,
        $scope,
        element,
        audioOriginal,
        audioMock;

    beforeEach(module('moi.directives'));
    beforeEach(module('moi.templates'));

    beforeEach(function (){
      audioOriginal = window.Audio;
      audioMock = {
        play: sinon.spy()
      };
      window.Audio = audioMock;
    })

    afterEach(function() {
      window.Audio = audioOriginal;
    });

    beforeEach(inject(
      function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
      })
    );

    var getController = function() {
      $scope.sound = '../sounds/fondo.mp3';
      element = angular.element(
        '<moi-sound sound="{{sound}}"></moi-sound>'
      );
      $compile(element)($scope);
      $scope.$digest();

      return element.controller('moiSound');
    };

    describe('#directive init', function(){
      it('should have the same params you set', function(){
        var controller = getController();

        chai.expect($scope.sound).to.deep.equals(controller.sound);
      });

      it('should return the audioType into soundType', function(){
        var controller = getController();

        chai.expect(controller.soundType).to.deep.equals('audio/mp3');
      });

      it('plays audio', function() {
        getController().play();
        // console.log(element.find('audio')[0].play);
        // chai.expect(audio);
        sinon.assert.calledOnce(moi.play);
      });
    });
  });
})();
