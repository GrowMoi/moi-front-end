(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('FinalTestController',
    function (TestService,
              $scope,
              $rootScope,
              $auth,
              testData,
              ModalService,
              TreeService) {

    var vmTest = this;
    vmTest.selectAnswer = selectAnswer;
    vmTest.next = next;
    vmTest.user = $auth.user;
    var $backgroundSound = angular.element(document.querySelector('#backgroundSound'));
    init();

    function init() {
      /*jshint camelcase: false */
      vmTest.answers = [];
      vmTest.indexShow = 0;
      vmTest.percentage = 0;
      vmTest.testComplete = !!testData.answers;
      vmTest.answersQuiz = testData.answers;
      vmTest.timeQuiz = testData.time || 0;
      vmTest.successAnswers = rigthAnswers(testData.answers || []);
      vmTest.questions = shuffle(testData.questions.questions || []);
      vmTest.testId = testData.questions.id;
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
        id: vmTest.testId,
        answers: vmTest.answers
      };
      TestService.evaluateFinalTest(params).then(function(res){
        var data = {
          totalQuestions: vmTest.totalQuestions,
          successAnswers: rigthAnswers(res.data.result)
        };
        if(data.successAnswers > 1 ){
          $backgroundSound[0].pause();
        }

        console.log('result: ', data);
        console.log('backend data: ', res);
        // TestService.scoreQuiz($scope, data);
        makeReportToCertificate(data, res);
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

    function makeReportToCertificate(data, res) {
      var progressTree = TreeService.progressTree(res.data);
      var percentageTest = getPercentage(data.totalQuestions,data.successAnswers);
      var dataReport = {
        user: vmTest.user,
        progressTree: progressTree.percentage,
        resultFinalTest: percentageTest,
        pieChart: getPercentageByBranch(res.data),
        timeOfReading: res.data.time,
        totalContentsLearnt: res.data.current_learnt_contents //jshint ignore:line
      };
      showCertificate(dataReport);
    }

    function getPercentage(total, value, decimals) {
      var numberOfDecimals = decimals || 1;
      var percentage = (value * 100) / total;
      return parseFloat(percentage.toFixed(numberOfDecimals));
    }

    function getPercentageByBranch(data) {
      var totalContentLearns = 0;
      var finalData = [];
      //Colores por ramas
      var colors = {
        'Aprender': {value: '#0089b6', color: 'azul'},
        'Artes': {value: '#b83b67', color: 'rojo'},
        'Lenguaje': {value: '#f7af1f', color: 'amarillo'},
        'Naturaleza': {value: '#359b3d', color: 'verde'},
      };
      //TODO: Cambiar por el valor de total de contenidos aprendidos que retorna el backend
      angular.forEach(data.contents_learnt_by_branch, function(branch) { //jshint ignore:line
        totalContentLearns += branch.total_contents_learnt; //jshint ignore:line
      });

      angular.forEach(data.contents_learnt_by_branch, function(branch) { //jshint ignore:line
        var dataByBranch = {
          'title': branch.title,
          'value': getPercentage(totalContentLearns, branch.total_contents_learnt, 2), //jshint ignore:line
          'color': colors[branch.title].value
        };
        finalData.push(dataByBranch);
      });
      return finalData;
    }

    function showCertificate(dataModel){
      var dialogOptions = {
        templateUrl: 'templates/partials/modal-finish-certificate.html',
        model: dataModel
      };
      ModalService.showModel(dialogOptions);
    }

  });

})();
