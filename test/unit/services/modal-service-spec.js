(function () {
  'use strict';

  describe('ModalService', function () {
    var $ionicModal, service, $rootScope;

    beforeEach(module('moi.services'));
    beforeEach(function(){
      module('config', function ($provide) {
        $provide.constant('$ionicModal', {
            fromTemplateUrl: function(){
              return {
                then: function(){
                  return null;
                }
              }
            }
          }
        );
      })
    });
    beforeEach(inject(
      function (_$ionicModal_, _ModalService_, _$rootScope_) {
        service = _ModalService_;
        $ionicModal = _$ionicModal_;
        $rootScope = _$rootScope_;
      })
    );

    describe('#service', function(){
      it('should show moi-modal', function(){
        var modelData = {contentSrc: '../images/content.png', isImage: true};
        var optionsModal = {templateUrl: 'templates/partials/modal-image.html', model: modelData};
        var spy = sinon.spy($ionicModal, 'fromTemplateUrl');
        service.showModel(optionsModal);
        chai.expect(spy.called).to.be.equal(true);
      });
    });

  });
})();
