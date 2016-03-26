(function () {
  'use strict';

  describe('ContentService', function () {
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
      function (_$httpBackend_, _ContentService_, _ENV_, _$ionicPopup_) {
        $httpBackend = _$httpBackend_;
        service = (_ContentService_);
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
        var neuronId = 1;
        var contentId = 1;
        /*jshint camelcase: false */
        var expectedUrl = ENV.apiHost + '/api/neurons/' + neuronId + '/contents/' + contentId + '/learn';

        $httpBackend.expectPOST(expectedUrl).respond(200);

        var content = {
                        id: 1,
                        neuron_id: 1
                      };

        service.learnContent(content).then(function(response){
          chai.expect(response.status).to.deep.equals(200);
        });

        $httpBackend.flush();
      });

      it('should call ionicPopup if it fails. Also should get 500', function(){
        var neuronId = 1;
        var contentId = 1;
        /*jshint camelcase: false */
        var expectedUrl = ENV.apiHost + '/api/neurons/' + neuronId + '/contents/' + contentId + '/learn';

        $httpBackend.expectPOST(expectedUrl).respond(500);

        var content = {
                        id: 1,
                        neuron_id: 1
                      };

        service.learnContent(content).then(function(response){
          sinon.assert.calledOnce($ionicPopup.alert);
          chai.expect(response.status).to.deep.equals(500);
        });

        $httpBackend.flush();
      });

      it('should respond with 200 when the user add a note in max content', function() {
        var neuronId = 1;
        var contentId = 1;

        /*jshint camelcase: false */
        var expectedUrl = ENV.apiHost + '/api/neurons/' + neuronId + '/contents/' + contentId + '/notes';
        var data = {note: 'note in content-max'};

        $httpBackend.expectPOST(expectedUrl, data).respond(200);

        var content = {
                        id: 1,
                        neuron_id: 1,
                        user_notes: 'note in content-max'
                      };

        service.addNotesToContent(content).then(function(response){
          chai.expect(response.status).to.deep.equals(200);
        });

        $httpBackend.flush();
      });

      it('should call ionicPopup when cant add a note. Also should get 500', function() {
        var neuronId = 1;
        var contentId = 1;

        /*jshint camelcase: false */
        var expectedUrl = ENV.apiHost + '/api/neurons/' + neuronId + '/contents/' + contentId + '/notes';

        $httpBackend.expectPOST(expectedUrl).respond(500);

        var content = {
                        id: 1,
                        neuron_id: 1,
                        user_notes: 'note in content-max'
                      };

        service.addNotesToContent(content).then(function(response){
          sinon.assert.calledOnce($ionicPopup.alert);
          chai.expect(response.status).to.deep.equals(500);
        });

        $httpBackend.flush();
      });
    });

  });
})();
