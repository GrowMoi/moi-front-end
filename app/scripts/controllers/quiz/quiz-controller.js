(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('QuizController',
    function (QuizService,
              $scope,
              $rootScope,
              quizData,
              $auth,
              HoverAnimationService) {

    var vmTest = this;
    vmTest.selectAnswer = selectAnswer;
    vmTest.currentUser = $auth.user;
    vmTest.next = next;
    var $backgroundSound = angular.element(document.querySelector('#backgroundSound'));
    init();

    function init() {
      /*jshint camelcase: false */
      vmTest.answers = [];
      vmTest.indexShow = 0;
      vmTest.percentage = 0;
      // vmTest.questions = shuffle(quizData.questions);
      vmTest.testComplete = !!quizData.answers;
      vmTest.answersQuiz = quizData.answers;
      vmTest.timeQuiz = quizData.time || 0;
      vmTest.successAnswers = rigthAnswers(quizData.answers || []);
      vmTest.questions = shuffle(quizData.questions.questions || []);
      vmTest.testId = quizData.quiz_id;
      vmTest.playerId = quizData.player_id;
      vmTest.playerName = quizData.player_name;
      vmTest.questions[0].showQuestion = true;
      vmTest.totalQuestions = vmTest.questions.length;
      vmTest.nextQuestion = false;
      vmTest.hideTest = false;
      vmTest.selectedAnswer = {};
      vmTest.answerBackend = {};
      vmTest.increaseSize = HoverAnimationService.increaseSize;
      vmTest.cssOptions = {
        styles: []
      };
      vmTest.frameOptions = {
        type: 'marco_arbol'
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
      var params = {
        quizId: vmTest.testId,
        playerId: vmTest.playerId,
        answers: vmTest.answers
      };
      QuizService.evaluateQuiz(params).then(function(res){
        var data = {
          totalQuestions: vmTest.totalQuestions,
          successAnswers: rigthAnswers(res.data.result)
        };
        if(data.successAnswers > 1 ){
          $backgroundSound[0].pause();
        }
        QuizService.scoreQuiz($scope, data);
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
