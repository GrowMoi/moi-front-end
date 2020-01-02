(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('TestController',
    function ($stateParams,
              TestService,
              $scope,
              $auth,
              $state,
              $window,
              $timeout,
              ModalService,
              MediaAchievements,
              MoiAnimationService,
              UserNotificationsService,
              test) {

    var vmTest = this;
    vmTest.selectAnswer = selectAnswer;
    vmTest.next = next;
    vmTest.exit = exit;
    var currentUser = $auth.user;
    var countModalsActived = 0;
    var $backgroundSound = angular.element(document.querySelector('#backgroundSound'));
    var language = $auth.user.language;

    init();

    function init() {
      var passData = $stateParams.testData ? $stateParams.testData : {};
      var testData = {
        testQuestions: passData.testQuestions || test.questions,
        testId: passData.testId || test.id
      };
      if (test && test.answers) {
        var questionsData = questionsMapping(test.answers);
        var data = {
          questions: questionsData.questions,
          totalQuestions: test.questions.length,
          successAnswers: questionsData.rigthAnswers,
          meta: {}
        };
        showModalResulTest(data);
      } else {
        vmTest.answers = [];
        vmTest.indexShow = 0;
        vmTest.percentage = 0;
        vmTest.questions = shuffle(testData.testQuestions);
        vmTest.testId = testData.testId;
        vmTest.questions[0].showQuestion = true;
        vmTest.totalQuestions = vmTest.questions.length;
        vmTest.nextQuestion = false;
        vmTest.hideTest = false;
        vmTest.isCheckingResultTest = false;
        vmTest.selectedAnswer = {};
        vmTest.answerBackend = {};
        vmTest.frameOptions = {
          type: 'marco_arbol',
          wholeFrame: true
        };
        vmTest.increaseSize = MoiAnimationService.increaseSize;
        vmTest.cssOptions = {
          styles: []
        };
      }
    }

    function selectAnswer(contentId, answer) {
      vmTest.answerBackend = {
        'content_id' : contentId,
        'answer_id' : answer.id,
        'answer_text': answer.text
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

    function exit(removeContents) {
      if(removeContents) {
        TestService.cancelTest(vmTest.testId).then(function() {
          $window.history.back();
        });
      }else {
        $window.history.back();
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
      $timeout(function(){vmTest.isCheckingResultTest = true;});
      TestService.evaluateTest(vmTest.testId, vmTest.answers).then(function(res){
        var questionsData = questionsMapping(res.data.result);
        var data = {
          questions: questionsData.questions,
          totalQuestions: vmTest.totalQuestions,
          successAnswers: questionsData.rigthAnswers,
          meta: res.data.meta
        };
        if(data.successAnswers > 1 ){
          $backgroundSound[0].pause();
        }
        localStorage.setItem('successAnswers', data.successAnswers);

        UserNotificationsService.getNewDetailsNotifications();

        showModalResulTest(data, res);
      });
    }

    function showModalResulTest (data, res) {
      res = res || { data: {} };
      TestService.scoreTest($scope, data).then(function() {
        var recommendations = res.data.recommendations || [];
        var achievements = res.data.achievements || [];

        if(res.data.super_event && res.data.super_event.completed){//jshint ignore:line
          var beginningNameSuperEvent = language === 'es' ?  'el super evento: ' : 'the super event: ';
          var achievementSuperEvent = {
            name: beginningNameSuperEvent + res.data.super_event.info.event_achievement.title,//jshint ignore:line
            bagde: res.data.super_event.info.event_achievement.image//jshint ignore:line
          };
          showUserAchievement(achievementSuperEvent);
        }

        if(res.data.event && res.data.event.completed){
          var beginningNameEvent = language === 'es' ?  'el evento: ' : 'the event: ';
          var achievementEvent = {
            name: beginningNameEvent + res.data.event.info.title,
            bagde: res.data.event.info.image
          };
          showUserAchievement(achievementEvent);
        }

        if (recommendations.length > 0) {
          showModalAchievement(recommendations);
        }
        if (achievements.length > 0) {
          showUserAchievement(achievements[0]);
        }else{
          if(countModalsActived === 0){
            $state.go('tree', {
              username: currentUser.username
            });
          }
        }
      });
    }

    function questionsMapping(results) {
      /*jshint camelcase: false */
      var NEURON_COLOR = {
        yellow: 'images/tree/nodos/nodo-fuccia.png',
        blue: 'images/tree/nodos/nodo-azul.png',
        red: 'images/tree/nodos/nodo-fuccia.png',
        green: 'images/tree/nodos/nodo-verde.png'
      };
      var rigthAnswersCount = 0;
      var resultQuestions = angular.forEach(results, function(result){
        result.image = NEURON_COLOR[result.neuron_color];
        if(result.correct) {
          rigthAnswersCount++;
        }
      });
      return {
        questions: resultQuestions,
        rigthAnswers: rigthAnswersCount
      };
    }

    function showModalAchievement(recommendations) {
      var modelData = extractModelData(recommendations) ;
      modelData.user = currentUser;
      var templateModal = 'templates/partials/modal-tutor-achievement';
      ModalService.showModel(
        {
          parentScope: $scope,
          templateUrl: templateModal,
          model: modelData
        }
      );
    }

    function showUserAchievement(achievement){
      if (achievement && achievement.number === 7) {
        var justCompletedAchievement = true;
        TestService.goFinalTest(null, currentUser, currentUser.username, justCompletedAchievement, null, 'atleast_one_content');
      } else {
        var language = $auth.user.language;
        var messageModal = language === 'es' ? 'Felicidades '+currentUser.username+'! Acabas de completar '+achievement.name+'. '+
        'Activa este item en el inventario y disfruta de tus logros aprendiendo con Mi Aula BdP': 'Congratulations ' + currentUser.username +
        '! You have just completed '+ achievement.name +'. '+ 'Activate this item in the inventory and enjoy your achievements learning with Mi Aula BdP';
        var btnRightLabel = language === 'es' ? 'Ir al inventario' : 'Go to inventory';
        var dialogContentModel = {
          message: messageModal,
          callbacks: {
            btnRight: function(){
              dialogContentModel.closeModal();
              $state.go('inventory');
            },
            btnLeft: function(){
              dialogContentModel.closeModal();
              countModalsActived--;
              if(countModalsActived === 0) {
                $state.go('tree', {
                  username: currentUser.username
                });
              }
            }
          },
          labels: {
            btnRight: btnRightLabel,
            btnLeft: 'Ok'
          },
          image: achievement.bagde || MediaAchievements[achievement.number].settings.badge,
          addCongratulations: true
        };

        var dialogOptions = {
          templateUrl: 'templates/partials/modal-alert-content.html',
          model: dialogContentModel
        };
        countModalsActived++;
        ModalService.showModel(dialogOptions);
      }
    }

    function extractModelData(recommendations) {
      var tutorAuthors,
          achievements,
          tutorAuthorNames,
          achievementNames = '';

      if (recommendations.length > 1) {
        var tutorNames = recommendations.map(function (r) { return r.tutor.name; });
        var names = recommendations.map(function (r) { return r.achievement.name; });
        var uniqAchievementsNames = names.reduce(function (a, b) {
          if (a.indexOf(b) < 0) {
            a.push(b);
          }
          return a;
        }, []);
        tutorAuthorNames = tutorNames.join(', ');
        tutorAuthors = 'de los tutores ' + tutorAuthorNames;
        achievementNames = uniqAchievementsNames.join(', ');
        if (uniqAchievementsNames.length > 1) {
          achievements = achievementNames;
        } else {
          achievements = 'un ' + uniqAchievementsNames[0];
        }
      } else {
        tutorAuthors = 'del tutor ' + recommendations[0].tutor.name;
        tutorAuthorNames = recommendations[0].tutor.name;
        achievements = 'un ' + recommendations[0].achievement.name;
        achievementNames = recommendations[0].achievement.name;
      }

      return {
        tutorAuthors: tutorAuthors,
        tutorAuthorNames: tutorAuthorNames,
        achievements: achievements,
        achievementNames: achievementNames
      };
    }
  });

})();
