(function () {
  'use strict';

  describe('SettingsService', function () {
    var service, $httpBackend, ENV, $ionicPopup;

    beforeEach(module('moi.services'));
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
      function (_$httpBackend_, _SettingsService_, _ENV_, _$ionicPopup_) {
        $httpBackend = _$httpBackend_;
        service = (_SettingsService_);
        ENV = _ENV_;
        $ionicPopup = _$ionicPopup_;
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

      it('should call ionicPopup if it fails. Also should get 500', function(){
        var setting = {
          kind:'que-es',
          level:2
        };
        /*jshint camelcase: false */
        var expectedUrl = ENV.apiHost + '/api/content_preferences/' + setting.kind;

        $httpBackend.expectPUT(expectedUrl, {level: setting.level}).respond(500);

        service.saveContentSettings(setting).then(function(response){
          sinon.assert.calledOnce($ionicPopup.alert);
          chai.expect(response.status).to.deep.equals(500);
        });

        $httpBackend.flush();
      });
    });

  });
})();
