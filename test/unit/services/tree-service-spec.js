(function () {
  'use strict';

  describe('TreeService', function () {
    var service, $httpBackend, ENV, ModalService;

    beforeEach(module('moi.services', function($provide){
      $provide.factory('ModalService', function(){
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
      function (_$httpBackend_, _TreeService_, _ENV_, _ModalService_) {
        $httpBackend = _$httpBackend_;
        service = _TreeService_;
        ENV = _ENV_;
        ModalService = _ModalService_;
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
