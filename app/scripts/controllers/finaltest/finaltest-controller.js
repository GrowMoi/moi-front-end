(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('FinalTestController',
    function (TestService,
              $auth,
              $state,
              $ionicLoading,
              testData,
              ModalService,
              TreeService,
              StorageService,
              $timeout,
              ScreenshotService,
              UploadImageService,
              UserService,
              SocialService) {

    var vmTest = this;
    vmTest.selectAnswer = selectAnswer;
    vmTest.next = next;
    vmTest.user = $auth.user;
    var dataReport = {};
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
      vmTest.questions.map( function(obj){
        obj.possible_answers.map( function(ins){ //jshint ignore:line
            if(ins.text.length > 100){
              obj.isClass = true;
            }
          }
        );
        return obj;
      });
      vmTest.testId = testData.questions.id;
      vmTest.questions[0].showQuestion = true;
      vmTest.totalQuestions = vmTest.questions.length;
      vmTest.nextQuestion = false;
      vmTest.hideTest = false;
      vmTest.hideQuestionTest = false;
      vmTest.selectedAnswer = {};
      vmTest.answerBackend = {};
      vmTest.finishedCredits = finishedCredits;
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
      vmTest.hideQuestionTest = true;
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
      var language = $auth.user.language;
      var dirImage = language === 'es' ? 'images/diploma/title.png' : 'images/diploma/title_ingles.png';
      var progressTree = TreeService.progressTree(res.data);
      var percentageTest = getPercentage(data.totalQuestions,data.successAnswers);
      var time = (res.data.time).replace(/\s/g, '');
      dataReport = {
        user: vmTest.user,
        progressTree: progressTree.percentage,
        resultFinalTest: percentageTest,
        pieChart: getPercentageByBranch(res.data),
        image: dirImage,
        timeOfReading: time,
        totalContentsLearnt: res.data.current_learnt_contents, //jshint ignore:line
        close: function(){
          saveAndSharedCertificate();
        },
        sharedCertificate: function(){
          saveAndSharedCertificate(true);
        }
      };

      if(dataReport.resultFinalTest >= 70){
        vmTest.hideTest = true;
      }else{
        $state.go('inventory');
      }
    }

    function finishedCredits() {
      $state.go('profile', {username: vmTest.user.username, defaultTab: 'certificates'}).then(function(){
        showCertificate();
      });
    }

    function saveAndSharedCertificate(actionShared){
      var view = document.querySelector('.modal-certificate'),
          image_url = ''; //jshint ignore:line
      $ionicLoading.show({
        content: 'Sharing',
        animation: 'fade-in',
        showBackdrop: true,
        showDelay: 0
      });
      ScreenshotService.getBase64Image(view).then(function(imageBase64){
        dataReport.closeModal();
        UploadImageService.uploadFile(imageBase64).then(function(resp) {
          image_url = resp.data.url; //jshint ignore:line
          UserService.saveCertificate(resp.data.url).then(function() {
            $ionicLoading.hide();
            if(actionShared){
              var data = {
                title: 'Mira todo lo que aprendí jugando Moi Aprendizaje Social',
                description: 'Consigue crédito escolar por tu desempeño con Moi Aprendizaje Social',
                image_url: image_url, //jshint ignore:line
                publicUrl: image_url //jshint ignore:line
              };
              SocialService.showModal(data);
            }else{
              $state.reload();
            }
          });
        });
      });
    }

    function getPercentage(total, value, decimals) {
      var numberOfDecimals = decimals || 1;
      var percentage = (value * 100) / total;
      return parseFloat(percentage.toFixed(numberOfDecimals));
    }

    function getPercentageByBranch(data) {
      var totalContentLearns = 0;
      var pieChartData = {
        data: [],
        colors: [],
        labels: []
      };
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
        var label = branch.title;
        var value = getPercentage(totalContentLearns, branch.total_contents_learnt, 2); //jshint ignore:line
        var color = colors[branch.title].value;
        pieChartData.data.push(value);
        pieChartData.labels.push(label);
        pieChartData.colors.push(color);
      });
      return pieChartData;
    }

    function showCertificate(){
      var templateModal = 'templates/partials/modal-finish-certificate.html';
      var dialogOptions = {
        templateUrl: templateModal,
        model: dataReport
      };
      ModalService.showModel(dialogOptions);
      $timeout(function() {
        var config = {
          type: 'doughnut',
          data: {
            datasets: [{
              data: dataReport.pieChart.data,
              backgroundColor: dataReport.pieChart.colors
            }],
            labels: dataReport.pieChart.labels
          },
          options: {
            maintainAspectRatio: false,
            legend: false,
            tooltips: false,
            pieceLabel: {
              render: 'percentage',
              fontSize: 10,
              arc: true,
              fontColor: 'white'
            }
          }
        };
        var ctx = document.getElementById('chart-area').getContext('2d');
        vmTest.myDoughnut = new Chart(ctx, config); // jshint ignore:line
      }, 0);
    }

  });

})();
