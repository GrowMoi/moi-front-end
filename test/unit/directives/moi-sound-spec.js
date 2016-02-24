(function () {
  'use strict';

  describe('moiSound', function () {
    var $compile, $scope;

    beforeEach(module('moi.directives'));
    beforeEach(module('moi.templates'));

    beforeEach(inject(
      function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
      })
    );

    describe('#directive init', function(){
      it('should have the same params you set', function(){
        $scope.sound='../sounds/fondo.mp3';
        var template = $compile('<moi-sound sound="{{sound}}"></moi-sound>')($scope);

        $scope.$digest();

        var controller = template.controller('moiSound');

        chai.expect($scope.sound).to.deep.equals(controller.sound);
      });

      it('should return the audioType into soundType', function(){

        $scope.sound='../sounds/fondo.mp3';
        var template = $compile('<moi-sound sound="{{sound}}"></moi-sound>')($scope);

        $scope.$digest();

        var controller = template.controller('moiSound');

        chai.expect(controller.soundType).to.deep.equals(controller.getAudioType(controller.sound));
      });

    });

  });
})();
