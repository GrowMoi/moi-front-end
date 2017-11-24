(function () {
  'use strict';

  describe('TutorRecommendationsService', function () {
    var service,
      $httpBackend,
      expectedUrl,
      ENV,
      PopupService;

    beforeEach(module('moi.services', function ($provide) {
      $provide.factory('PopupService', function () {
        return {
          showModel: function () {
            return null;
          }
        };
      });
    }));

    beforeEach(function () {
      module('config', function ($provide) {
        $provide.constant('ENV', {
          name: 'development',
          apiHost: 'http://localhost:5000'
        });
        $provide.constant('$ionicPopup', {
          alert: sinon.stub()
        });
      });
    });

    beforeEach(inject(function (_$httpBackend_, _TutorRecommendationsService_, _ENV_, _PopupService_) {
        $httpBackend = _$httpBackend_;
        service = _TutorRecommendationsService_;
        ENV = _ENV_;
        PopupService = _PopupService_;
      }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.verifyNoOutstandingExpectation();
    });

    describe('Get tutor recommendations', function () {
      beforeEach(function () {
        expectedUrl = ENV.apiHost + '/api/tutors/recommendations';
      });

      it('should do a request to /api/tutors/recommendations', function () {
        var contents = {
          contents: [{
            id: 1,
            name: 'contenido 1',
          },{
            id: 2,
            name: 'contenido 2',
          },{
            id: 3,
            name: 'contenido 3',
          },{
            id: 4,
            name: 'contenido 4',
          }],
          meta: {
            total_contents: 8 //jshint ignore:line
          }
        };

        $httpBackend.expectGET(expectedUrl).respond(contents);
        service.getTutorRecommendations();
        $httpBackend.flush();
      });

      it('PopupService should be called when the backend responds 400', function () {
        var spy = sinon.spy(PopupService, 'showModel');

        $httpBackend.whenGET(expectedUrl).respond(400);
        service.getTutorRecommendations();
        $httpBackend.flush();
        chai.expect(spy.called).to.be.equal(true);
      });
    });

  });
})();
