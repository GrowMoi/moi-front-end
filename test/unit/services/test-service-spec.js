(function () {
  'use strict';

  describe('TestService', function () {
    var service,
        $httpBackend,
        $auth,
        PopupService,
        ModalService,
        StorageService,
        ENV,
        testId,
        answers,
        scope,
        test,
        data,
        $state;

    beforeEach(function(){
      /*jshint camelcase: false */
      testId = 1;
      answers = [
        {
          content_id: 6,
          answer_id: 7
        },
        {
          content_id: 7,
          answer_id: 10
        }
      ];
      scope = {};
      test = {
        id: 1,
        questions: [
          {
            'content_id':6,
            'title':'Content 6',
            'media_url': 'some_url',
            'possible_answers':[
              {
                'id':7,
                'text':'Possible answer 7'
              },
              {
                'id':8,
                'text':'Possible answer 8'
              },
              {
                'id':9,
                'text':'Possible answer 9'
              }
            ]
          },
          {
            'content_id':7,
            'title':'Content 7',
            'media_url': null,
            'possible_answers':[
              {
                'id':10,
                'text':'Possible answer 10'
              },
              {
                'id':11,
                'text':'Possible answer 11'
              },
              {
                'id':12,
                'text':'Possible answer 12'
              }
            ]
          }
        ]
      };
      data = {
        successAnswers: 3,
        totalQuestions: 4,
        meta: {
          current_learnt_contents: 10,
          total_approved_contents: 20
        }
      };
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

    beforeEach(module('moi.services', function($provide){
      $provide.factory('ModalService', function(){
        return {
          showModel: function(){
            return null;
          }
        };
      });
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
            role: 'admin',
            username: 'admin'
          }
        };
      });
      $provide.factory('StorageService', function(){
        return {
          get: function(){
            return {
              then: function(){
                return null;
              }
            };
          },
          changeLanguage: function() {
            return null;
          }
        };
      });
    }));

    beforeEach(inject(
      function (_$httpBackend_,
                _TestService_,
                _PopupService_,
                _ModalService_,
                _StorageService_,
                _$state_,
                _$auth_,
                _ENV_) {
        $httpBackend = _$httpBackend_;
        service = (_TestService_);
        PopupService = _PopupService_;
        ModalService = _ModalService_;
        $state = _$state_;
        $auth = _$auth_;
        StorageService = _StorageService_;
        ENV = _ENV_;
      })
    );

    afterEach(function () {
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.verifyNoOutstandingExpectation();
    });

    describe('#service', function(){
      it('should respond with 200', function(){
        /*jshint camelcase: false */
        var expectedUrl = ENV.apiHost + '/api/learn';

        $httpBackend.expectPOST(expectedUrl,
                                  {
                                    test_id: testId,
                                    answers: JSON.stringify(answers)
                                  }
                                ).respond(200);

        service.evaluateTest(testId, answers).then(function(response){
          chai.expect(response.status).to.deep.equals(200);
        });

        $httpBackend.flush();
      });

      it('should call ionicPopup if it fails. Also should get 500', function(){
        /*jshint camelcase: false */
        var expectedUrl = ENV.apiHost + '/api/learn';
        var spy = sinon.spy(PopupService, 'showModel');
        $httpBackend.expectPOST(expectedUrl,
                                  {
                                    test_id: testId,
                                    answers: JSON.stringify(answers)
                                  }
                                ).respond(500);

        service.evaluateTest(testId, answers).then(function(response){
          chai.expect(spy.called).to.be.equal(true);
          chai.expect(response.status).to.deep.equals(500);
        });

        $httpBackend.flush();
      });

      it('should call ModalService when goTest', function(){
        var spy = sinon.spy(ModalService, 'showModel');
        service.goTest(scope, test);
        chai.expect(spy.called).to.be.equal(true);
      });

      it('should call ModalService when scoreTest', function(){
        var spy = sinon.spy(ModalService, 'showModel');
        service.scoreTest(scope, data);
        chai.expect(spy.called).to.be.equal(false);
      });

    });

  });
})();
