(function() {
  'use strict';

  describe('UserService', function() {
    var service,
      $httpBackend,
      userId,
      expectedUrl,
      ENV,
      PopupService,
      ModalService,
      $state;

    beforeEach(module('moi.services', function($provide) {
      $provide.factory('PopupService', function() {
        return {
          showModel: function() {
            return null;
          }
        };
      });
      $provide.factory('ModalService', function(){
        return {
          showModel: function(){
            return null;
          }
        };
      });
    }));

    beforeEach(angular.mock.module(function ($provide) {
      $provide.provider('$state', function () {
        return {
          $get: function () {
            return {
              go: function(){
                return null;
              }
            };
          }
        };
      });
    }));

    beforeEach(function() {
      module('config', function($provide) {
        $provide.constant('ENV', {
          name: 'development',
          apiHost: 'http://localhost:5000'
        });
        $provide.constant('$ionicPopup', {
          alert: sinon.stub()
        });
      });
    });

    beforeEach(inject(
      function(_$httpBackend_, _UserService_, _ENV_, _PopupService_, _$state_,
        _ModalService_) {
        $httpBackend = _$httpBackend_;
        service = _UserService_;
        ENV = _ENV_;
        PopupService = _PopupService_;
        $state = _$state_;
        ModalService = _ModalService_;
      }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.verifyNoOutstandingExpectation();
    });

    describe('#service', function() {
      beforeEach(function() {
        userId = 4;
        /*jshint camelcase: false */
        expectedUrl = ENV.apiHost + '/api/users/' + userId + '/profile';
      });

      it('should do a request to /api/users/:id/profile', function(){
        var objectToRespond = {
          name: 'jhon doe',
          city: 'loja',
          age: '12'
        };

        $httpBackend.expectGET(expectedUrl)
          .respond(objectToRespond);
        service.profile(userId);
        $httpBackend.flush();
      });

      it('should not call to PopupService when respond with 404', function() {
        var spy = sinon.spy(PopupService, 'showModel');
        $httpBackend.expectGET(expectedUrl).respond(404);
        service.profile(userId).then(function(){
          chai.expect(spy.called).to.not.be.equal(true);
        });
        $httpBackend.flush();
      });
    });

  });
})();
