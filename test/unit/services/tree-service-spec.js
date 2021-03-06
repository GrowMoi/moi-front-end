(function () {
  'use strict';

  describe('TreeService', function () {
    var service, $httpBackend, ENV, PopupService;

    beforeEach(module('moi.services', function($provide){
      $provide.factory('PopupService', function(){
        return {
          showModel: function(){
            return null;
          }
        };
      });
    }));
    beforeEach(function(){
      module('config', function ($provide) {
        $provide.constant('ENV', {
          name:'development',
          apiHost:'http://localhost:5000'
        });
        $provide.constant('$ionicPopup', {
          alert: sinon.stub()
        });
      });
    });

    beforeEach(inject(
      function (_$httpBackend_, _TreeService_, _ENV_, _PopupService_) {
        $httpBackend = _$httpBackend_;
        service = _TreeService_;
        ENV = _ENV_;
        PopupService = _PopupService_;
      })
    );

    afterEach(function () {
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.verifyNoOutstandingExpectation();
    });

    describe('#service', function(){
      it('should do a request to /api/tree', function(){
        var expectedUrl = ENV.apiHost + '/api/tree';
        var objectToRespond = {'neurons':[]};

        $httpBackend.expectGET(expectedUrl)
          .respond(objectToRespond);

        service.getNeuronsUser();

        $httpBackend.flush();
      });
    });

  });
})();
