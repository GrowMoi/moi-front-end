(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('QuizController',
    function (QuizService,
              $scope,
              $rootScope,
              quizData) {

    var vmTest = this;
    vmTest.selectAnswer = selectAnswer;
    vmTest.next = next;

    var questions = [
      {
        'title': 'que es matematica 1',
        'content_id': 15,
        'media_url': 'http://localhost:5000/uploads/content_media/media/53/jhon_snow_art.jpg',
        'possible_answers': [
          {
            'id': 39,
            'text': 'correcta'
          },
          {
            'id': 40,
            'text': 'incorrecta'
          },
          {
            'id': 41,
            'text': 'incorrecta'
          }
        ]
      },
      {
        'title': 'como funciona matematica 1',
        'content_id': 16,
        'media_url': 'http://localhost:5000/uploads/content_media/media/54/skywaker.jpg',
        'possible_answers': [
          {
            'id': 42,
            'text': 'correcta'
          },
          {
            'id': 43,
            'text': 'incorrecta'
          },
          {
            'id': 44,
            'text': 'incorrecta'
          }
        ]
      },
      {
        'title': 'Como funciona 1?',
        'content_id': 2,
        'media_url': null,
        'possible_answers': [
          {
            'id': 2,
            'text': 'respuesta 1'
          },
          {
            'id': 15,
            'text': 'respuesta  2'
          },
          {
            'id': 16,
            'text': 'respuesta  3'
          }
        ]
      },
      {
        'title': 'Geoogia1',
        'content_id': 20,
        'media_url': 'http://localhost:5000/uploads/content_media/media/60/Captura_de_pantalla_2016-07-21_a_las_10.04.08_a.m..png',
        'possible_answers': [
          {
            'id': 53,
            'text': 'correcta'
          }
        ]
      }
    ];

    init();

    function init() {
      /*jshint camelcase: false */
      vmTest.answers = [];
      vmTest.indexShow = 0;
      vmTest.percentage = 0;
      // vmTest.questions = shuffle(quizData.questions);
      vmTest.questions = shuffle(questions);
      vmTest.testId = quizData.test_id;
      vmTest.playerId = quizData.player_id;
      vmTest.playerName = quizData.player_name;
      vmTest.questions[0].showQuestion = true;
      vmTest.totalQuestions = vmTest.questions.length;
      vmTest.nextQuestion = false;
      vmTest.hideTest = false;
      vmTest.selectedAnswer = {};
      vmTest.answerBackend = {};
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
      QuizService.evaluateTest(params).then(function(res){
        var data = {
          totalQuestions: vmTest.totalQuestions,
          successAnswers: rigthAnswers(res.data.result)
        };
        if(data.successAnswers > 1 ){
          $rootScope.$broadcast('moiSound:kill-sound');
        }
        QuizService.scoreTest($scope, data);
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
