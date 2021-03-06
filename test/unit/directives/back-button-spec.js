(function () {
  'use strict';

  describe('backButtonDirective', function () {
    var $compile, $scope, $window;

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
    }));

    beforeEach(inject(
      function (_$compile_, _$rootScope_, _$window_) {
        $compile = _$compile_;
        $window = _$window_;
        $scope = _$rootScope_.$new();
      })
    );

    describe('#backbutton methods', function(){
      it('should call $window.history when you goBack()', function(){
        var spy = sinon.spy($window.history, 'back');
        var template = $compile('<back-button></back-button>')($scope);

        $scope.$digest();

        var controller = template.controller('backButton');
        controller.finishedSound();
        chai.expect(spy.called).to.be.equal(true);
      });

    });

  });
})();
