(function () {
  'use strict';

  describe('ContentService', function () {
    var service, $httpBackend, ENV, PopupService, $state, $auth;

    beforeEach(module('moi.services', function($provide){
      $provide.factory('PopupService', function(){
        return {
          showModel: function(){
            return null;
          }
        };
      });
      $provide.service('$auth', function() {
        return {
          user: {
            id: 1,
            email: 'admin@example.com',
            name: 'admin',
            role: 'admin'
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

    beforeEach(inject(
      function (_$httpBackend_,
                _$state_,
                _ContentService_,
                _ENV_,
                _PopupService_,
                _$auth_) {

        $httpBackend = _$httpBackend_;
        $state = _$state_;
        service = (_ContentService_);
        ENV = _ENV_;
        PopupService = _PopupService_;
        $auth = _$auth_;
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
        var expectedUrl = ENV.apiHost + '/api/neurons/' + neuronId + '/contents/' + contentId + '/read';

        $httpBackend.expectPOST(expectedUrl).respond(200);

        var content = {
                        id: 1,
                        neuron_id: 1
                      };

        service.readContent(content).then(function(response){
          chai.expect(response.status).to.deep.equals(200);
        });

        $httpBackend.flush();
      });

      it('should call PopupService if it fails. Also should get 500', function(){
        var neuronId = 1;
        var contentId = 1;
        /*jshint camelcase: false */
        var expectedUrl = ENV.apiHost + '/api/neurons/' + neuronId + '/contents/' + contentId + '/read';

        $httpBackend.expectPOST(expectedUrl).respond(500);

        var content = {
                        id: 1,
                        neuron_id: 1
                      };
        var spy = sinon.spy(PopupService, 'showModel');

        service.readContent(content).then(function(response){
          chai.expect(spy.called).to.be.equal(true);
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

      it('should call PopupService when cant add a note. Also should get 500', function() {
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
        var spy = sinon.spy(PopupService, 'showModel');

        service.addNotesToContent(content).then(function(response){
          chai.expect(spy.called).to.be.equal(true);
          chai.expect(response.status).to.deep.equals(500);
        });

        $httpBackend.flush();
      });

      it('should respond with 200 when get recommended contents into max content.', function() {
        var neuronId = 1;
        var kind = 'Que es';

        /*jshint camelcase: false */
        var expectedUrl = ENV.apiHost + '/api/neurons/' + neuronId + '/recommended_contents/' + kind;
        var objectToRespond = {contents:[]};
        var content = {
                        id: 1,
                        neuron_id: 1,
                        kind: 'Que es'
                      };

        $httpBackend.expectGET(expectedUrl).respond(objectToRespond);

        service.recommendedContents(content);

        $httpBackend.flush();
      });

      it('should respond with 500 when cant get recommended contents into max content.', function() {
        var neuronId = 1;
        var kind = 'Que es';

        /*jshint camelcase: false */
        var expectedUrl = ENV.apiHost + '/api/neurons/' + neuronId + '/recommended_contents/' + kind;
        var content = {
                        id: 1,
                        neuron_id: 1,
                        kind: 'Que es'
                      };
        var spy = sinon.spy(PopupService, 'showModel');

        $httpBackend.expectGET(expectedUrl).respond(500);

        service.recommendedContents(content).then(function(response){
          chai.expect(spy.called).to.be.equal(true);
          chai.expect(response.status).to.deep.equals(500);
        });

        $httpBackend.flush();
      });
    });

  });
})();
