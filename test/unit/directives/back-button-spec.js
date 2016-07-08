(function () {
  'use strict';

  describe('backButtonDirective', function () {
    var $compile, $scope, $window;

    beforeEach(module('moi.directives'));
    beforeEach(module('moi.templates'));

    beforeEach(angular.mock.module(function ($provide) {
      $provide.provider('$ionicPlatform', function () {
        return {
          $get: function () {
            return {
              ready: function () {
                return true;
              }
            };
          }
        };
      });

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
      function (_$compile_, _$rootScope_, _$window_) {
        $compile = _$compile_;
        $window = _$window_;
        $scope = _$rootScope_.$new();
      })
    );

    describe('#backbutton init', function(){
      it('should have the same params you set', function(){
        $scope.imageUrl='../images/foo.jpg';
        var template = $compile('<back-button image-url="{{imageUrl}}"></back-button>')($scope);

        $scope.$digest();

        var controller = template.controller('backButton');

        chai.expect($scope.imageUrl).to.deep.equals(controller.imageUrl);
      });

    });

    describe('#backbutton methods', function(){
      it('should call $window.history when you goBack()', function(){
        var spy = sinon.spy($window.history, 'back');
        $scope.imageUrl='../images/foo.jpg';
        var template = $compile('<back-button image-url="{{imageUrl}}"></back-button>')($scope);

        $scope.$digest();

        var controller = template.controller('backButton');
        controller.finishedSound();
        chai.expect(spy.called).to.be.equal(true);
      });

    });

  });
})();
