(function () {
  'use strict';

  describe('SettingsService', function () {
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
      function (_$httpBackend_, _SettingsService_, _ENV_, _PopupService_) {
        $httpBackend = _$httpBackend_;
        service = (_SettingsService_);
        ENV = _ENV_;
        PopupService = _PopupService_;
      })
    );

    afterEach(function () {
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.verifyNoOutstandingExpectation();
    });

    describe('#service', function(){
      it('should respond with 200', function(){
        var setting = {
          kind:'que-es',
          level:2
        };
        /*jshint camelcase: false */
        var expectedUrl = ENV.apiHost + '/api/content_preferences/' + setting.kind;

        $httpBackend.expectPUT(expectedUrl, {level: setting.level}).respond(200);

        service.saveContentSettings(setting).then(function(response){
          chai.expect(response.status).to.deep.equals(200);
        });

        $httpBackend.flush();
      });

      it('should call PopupService if it fails. Also should get 500', function(){
        var setting = {
          kind:'que-es',
          level:2
        };
        var spy = sinon.spy(PopupService, 'showModel');
        /*jshint camelcase: false */
        var expectedUrl = ENV.apiHost + '/api/content_preferences/' + setting.kind;

        $httpBackend.expectPUT(expectedUrl, {level: setting.level}).respond(500);

        service.saveContentSettings(setting).then(function(response){
          chai.expect(spy.called).to.be.equal(true);
          chai.expect(response.status).to.deep.equals(500);
        });

        $httpBackend.flush();
      });
    });

  });
})();
