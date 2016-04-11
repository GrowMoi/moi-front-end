(function () {
  'use strict';

  describe('slideGalleryDirective', function () {
    var $compile, $scope, $ionicSlideBoxDelegate, template, controller, ModalService;

    beforeEach(module('moi.directives'));
    beforeEach(module('moi.templates'));
    beforeEach(function(){
      module('config', function ($provide) {
        $provide.constant('$ionicSlideBoxDelegate', {
          next: function () {
            return null;
          },
          previous: function () {
            return null;
          }
        });
      });
    });
    beforeEach(module('moi.services', function($provide){
      $provide.factory('ModalService', function(){
        return {
          showModel: function(){
            return {
              then: function(){
                return null;
              }
            };
          }
        };
      });
    }));
    beforeEach(inject(
      function (_$compile_, _$rootScope_, _$ionicSlideBoxDelegate_, _ModalService_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
        $ionicSlideBoxDelegate = _$ionicSlideBoxDelegate_;
        ModalService = _ModalService_;
      })
    );
    beforeEach(function(){
      $scope.images = [{ url: 'youtube.com',thumbnail: 'youtube.com/img0.png' }, '../images/content.jpg', '../images/neuron.png'];
      $scope.itemPerSlide = 2;

      template = $compile('<slide-gallery images="images" item-per-slide="{{itemPerSlide}}"></slide-gallery>')($scope);

      $scope.$digest();

      controller = template.controller('slideGallery');
    });

    describe('#slideGallery init', function(){
      it('should have the same params you set', function(){
        chai.expect($scope.images).to.deep.equals(controller.images);
      });

    });

    describe('#slideGallery methods', function(){
      it('user should see the modal with image', function(){
        var spy = sinon.spy(ModalService, 'showModel');
        controller.showMedia('../images/content.png');
        chai.expect(spy.called).to.be.equal(true);
      });

      it('user should see to next slide', function(){
        var spy = sinon.spy($ionicSlideBoxDelegate, 'next');
        controller.next();
        chai.expect(spy.called).to.be.equal(true);
      });

      it('user should see to previous slide', function(){
        var spy = sinon.spy($ionicSlideBoxDelegate, 'previous');
        controller.previous();
        chai.expect(spy.called).to.be.equal(true);
      });

      it('should change a slide between other slide', function(){
        var param = 1;
        controller.slideChanged(param);
        chai.expect(controller.slideIndex).to.be.equal(param);
      });
    });

  });
})();
