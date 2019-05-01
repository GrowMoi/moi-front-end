(function () {
  'use strict';

  describe('moiVideosDirective', function () {
    var $compile, $scope, element;

    beforeEach(module('moi.directives'));
    beforeEach(module('moi.templates'));
    beforeEach(function() {
      module(function($provide) {
        $provide.value('translateFilter', function(value) {
          return value;
        });
      });
    });

    beforeEach(inject(
      function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
      })
    );

    describe('#moiVideos init', function(){
      it('should have the same params you set', function(){
        $scope.opt={
          'url': 'videos/place_holder.mp4',
          'type': 'video/mp4'
        };
        element = angular.element(
          '<moi-videos video-url="{{opt.url}}" video-type="{{opt.type}}"></moi-videos>'
        );

        $compile(element)($scope);
        $scope.$digest();

        var controller = element.controller('moiVideos');

        chai.expect($scope.opt.url).to.deep.equals(controller.videoUrl);
      });

    });

  });
})();
