(function () {
  'use strict';

  describe('TutorRecommendationsService', function () {
    var service,
      $httpBackend,
      expectedUrl,
      ENV,
      ModalService;

    beforeEach(module('moi.services', function ($provide) {
      $provide.factory('ModalService', function () {
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

    beforeEach(inject(function (_$httpBackend_, _TutorRecommendationsService_, _ENV_, _ModalService_) {
        $httpBackend = _$httpBackend_;
        service = _TutorRecommendationsService_;
        ENV = _ENV_;
        ModalService = _ModalService_;
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

      it('ModalService should be called when the backend responds 400', function () {
        var spy = sinon.spy(ModalService, 'showModel');

        $httpBackend.whenGET(expectedUrl).respond(400);
        service.getTutorRecommendations();
        $httpBackend.flush();
        chai.expect(spy.called).to.be.equal(true);
      });
    });


    describe('Get tutor recommendations details', function () {
      beforeEach(function () {
        expectedUrl = ENV.apiHost + '/api/tutors/details';
      });

      it('should do a request to /api/tutors/details', function () {
        var details = {
          details: {
            total_recommendations: 5, //jshint ignore:line
            recommendations_in_progress: 3, //jshint ignore:line
            recommendations_reached: 2 //jshint ignore:line
          }
        };

        $httpBackend.expectGET(expectedUrl).respond(details);
        service.getTutorRecommendationsDetails();
        $httpBackend.flush();
      });

      it('ModalService should be called when the backend responds 400', function () {
        var spy = sinon.spy(ModalService, 'showModel');
        $httpBackend.whenGET(expectedUrl).respond(400);
        service.getTutorRecommendationsDetails();
        $httpBackend.flush();
        chai.expect(spy.called).to.be.equal(true);
      });
    });

  });
})();
