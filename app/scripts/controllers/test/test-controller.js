(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('TestController',
    function ($stateParams,
              TestService,
              $scope,
              $rootScope,
              AdviceService) {

    var vmTest = this;
    vmTest.selectAnswer = selectAnswer;
    vmTest.next = next;

    init();

    function init() {
      vmTest.answers = [];
      vmTest.indexShow = 0;
      vmTest.percentage = 0;
      vmTest.questions = shuffle($stateParams.testData.testQuestions);
      vmTest.testId = $stateParams.testData.testId;
      vmTest.questions[0].showQuestion = true;
      vmTest.totalQuestions = vmTest.questions.length;
      vmTest.nextQuestion = false;
      vmTest.hideTest = false;
      vmTest.selectedAnswer = {};
      vmTest.answerBackend = {};
      vmTest.frameOptions = {
        type: 'marco_arbol',
        advices: AdviceService.getStatic('test', 0)
      };
    }

    function selectAnswer(contentId, answer) {
      vmTest.answerBackend = {
        'content_id' : contentId,
        'answer_id' : answer.id
      };
      vmTest.selectedAnswer.selected = false;
      vmTest.selectedAnswer = answer;
      vmTest.selectedAnswer.selected = true;
      vmTest.nextQuestion = true;
    }

    function next() {
      if (!vmTest.nextQuestion) {
        return;
      }
      vmTest.answers.push(vmTest.answerBackend);
      percentage();
      if(vmTest.frameOptions.advices.length > 0){
        vmTest.frameOptions.advices[0].show = false;
      }
      if (vmTest.answers.length === vmTest.totalQuestions) {
        scoreTest();
      }else{
        vmTest.questions[vmTest.indexShow].showQuestion = false;
        vmTest.indexShow += 1;
        vmTest.questions[vmTest.indexShow].showQuestion = true;
        vmTest.nextQuestion = false;
      }
    }

    function shuffle(questions) {
      return questions.map(function(obj){
        /*jshint camelcase: false */
        var array = obj.possible_answers;
        var counter = array.length;
        while (counter > 0) {
            var index = Math.floor(Math.random() * counter);
            counter--;
            var temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return obj;
      });
    }

    function percentage() {
      vmTest.percentage = Math.round((vmTest.answers.length/vmTest.totalQuestions) * 100);
    }

    function scoreTest() {
      vmTest.hideTest = true;
      TestService.evaluateTest(vmTest.testId, vmTest.answers).then(function(res){
        var data = {
          totalQuestions: vmTest.totalQuestions,
          successAnswers: rigthAnswers(res.data.result)
        };
        if(data.successAnswers > 1 ){
          $rootScope.$broadcast('moiSound:kill-sound');
        }
        TestService.scoreTest($scope, data);
      });
    }

    function rigthAnswers(results) {
      var count = 0;
      angular.forEach(results, function(result){
        if (result.correct) {
          count += 1;
        }
      });
      return count;
    }
  });

})();
