(function () {
  'use strict';

  describe('TestService', function () {
    var service,
        $httpBackend,
        $ionicPopup,
        ModalService,
        ENV,
        testId,
        answers,
        scope,
        test,
        data;

    beforeEach(module('moi.services'));

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
        totalQuestions: 4
      };
    });

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
    }));

    beforeEach(inject(
      function (_$httpBackend_,
                _TestService_,
                _$ionicPopup_,
                _ModalService_,
                _ENV_) {
        $httpBackend = _$httpBackend_;
        service = (_TestService_);
        $ionicPopup = _$ionicPopup_;
        ModalService = _ModalService_;
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

        $httpBackend.expectPOST(expectedUrl,
                                  {
                                    test_id: testId,
                                    answers: JSON.stringify(answers)
                                  }
                                ).respond(500);

        service.evaluateTest(testId, answers).then(function(response){
          sinon.assert.calledOnce($ionicPopup.alert);
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
        chai.expect(spy.called).to.be.equal(true);
      });

    });

  });
})();
