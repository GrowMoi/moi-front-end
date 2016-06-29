(function () {
  'use strict';

  describe('TestController', function () {
    var ctrl,
        $controller,
        $scope,
        $rootScope,
        dependencies,
        TestService,
        $stateParams,
        dataTest,
        contentId,
        answer;

    beforeEach(module('moi.controllers'));

    beforeEach(function(){
      dataTest =  {
        testQuestions: [
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
        ],
        testId: 1
      };
      /*jshint camelcase: false */
      contentId = dataTest.testQuestions[0].content_id;
      answer = dataTest.testQuestions[0].possible_answers[0];
    });

    beforeEach(module('moi.services', function($provide){
      $provide.factory('TestService', function(){
        return {
          evaluateTest: function(){
            return {
              then: function(){
                return null;
              }
            };
          }
        };
      });
    }));

    beforeEach(angular.mock.module(function ($provide) {
      $provide.provider('$stateParams', function () {
        return {
          $get: function () {
            return {
              testData: dataTest
            };
          }
        };
      });
    }));

    beforeEach(inject(
      function (_$controller_,
                _$stateParams_,
                _TestService_,
                _$rootScope_) {
        $controller = _$controller_;
        $stateParams = _$stateParams_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        TestService = _TestService_;

        dependencies = {
          TestService: TestService,
          $scope: $scope,
          $stateParams: $stateParams
        };
        ctrl = $controller('TestController', dependencies);
      })
    );

    describe('on load', function(){
      it('should controller.test be the same of data', function(){
        chai.expect(ctrl.neuron).to.deep.equals(dependencies.data);
      });
    });

    describe('events', function(){
      it('should be selected when click a answer', function(){
        ctrl.selectAnswer(contentId, answer);
        chai.expect(answer.selected).to.be.equal(true);
      });

      it('should not avance if the user not selected a answer', function(){
        ctrl.next();
        chai.expect(ctrl.nextQuestion).to.be.equal(false);
      });

      it('should add answer to array answers to send backend', function(){
        ctrl.answerBackend = answer;
        ctrl.nextQuestion = true;
        ctrl.next();
        chai.expect(ctrl.answers.length).to.be.equal(1);
      });

      it('should call TestService to evaluate test', function(){
        /*jshint camelcase: false */
        ctrl.nextQuestion = true;
        ctrl.answers = [
          {content_id: 6, answer_id: 7}
        ];
        var spy = sinon.spy(TestService, 'evaluateTest');
        ctrl.next();
        chai.expect(spy.called).to.be.equal(true);
      });

    });

  });
})();