(function() {
  'use strict';

  describe('animateSprite', function() {
    var $compile,
        $scope,
        element,
        controller,
        StorageService,
        $rootScope,
        $window,
        $q;

    beforeEach(module('moi.directives'));
    beforeEach(module('moi.templates'));
    beforeEach(module('moi.services', function($provide){
      $provide.factory('SoundService', function(){
        return {
          getSound: function() {
            return {};
          }
        };
      });
      $provide.factory('StorageService', function(){
        return {
          get: function(){
            return {
              then: function(){
                return null;
              }
            };
          },
          changeLanguage: function() {
            return null;
          }
        };
      });
    }));

    beforeEach(inject(
      function(_$compile_, _$rootScope_, _$window_, _$q_,_StorageService_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;
        $window = _$window_;
        StorageService = _StorageService_;
        $q = _$q_;
      }));

    describe('init methods', function() {
      beforeEach(function(){
        $scope.options = {
          src: 'images/example-sprite.png',
          frames: 30,
          repeat: false,
          speed: 50,
          sound: 'sounds/example.mp3',
          playOnClick: true,
        };
        element = $compile('<animate-sprite options="options"></animate-sprite>')($scope);
        $scope.$digest();
        controller = element.isolateScope();
        controller = controller.vm;
      });

      it('should have the same params you set', function() {
        chai.expect(controller.options).to.deep.equal($scope.options);
      });

    });
  });
})();
