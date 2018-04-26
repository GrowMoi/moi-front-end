(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('TestController',
    function ($stateParams,
              TestService,
              $scope,
              $rootScope,
              $auth,
              $state,
              storage,
              AdviceService,
              ModalService,
              MediaAchievements,
              HoverAnimationService) {

    var vmTest = this;
    vmTest.selectAnswer = selectAnswer;
    vmTest.next = next;
    var currentUser = $auth.user;
    var $backgroundSound = angular.element(document.querySelector('#backgroundSound'));

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
        advices: AdviceService.getStatic('test', 0, storage)
      };
      vmTest.increaseSize = HoverAnimationService.increaseSize;
      vmTest.cssOptions = {
        styles: []
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
          $backgroundSound[0].pause();
        }
        localStorage.setItem('successAnswers', data.successAnswers);
        TestService.scoreTest($scope, data).then(function() {
          var recommendations = res.data.recommendations || [];
          var achievements = res.data.achievements || [];
          if (recommendations.length > 0) {
            showModalAchievement(recommendations);
          }
          if (achievements.length > 0) {
            showUserAchievement(achievements[0]);
          }else{
            $state.go('tree', {
              username: currentUser.username
            });
          }
        });
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

    function showModalAchievement(recommendations) {

      var modelData = extractModelData(recommendations) ;

      ModalService.showModel(
        {
          parentScope: $scope,
          templateUrl: 'templates/partials/modal-tutor-achievement.html',
          model: modelData
        }
      );
    }

    function showUserAchievement(achievement){
      var dialogContentModel = {
        message: 'Felicidades '+currentUser.username+'! Acabas de completar '+achievement.name+'. '+
                  'Activa este item en el inventario y disfruta de tus logros aprendiendo con Moi',
        callbacks: {
          btnRight: function(){
            $state.go('inventory');
            dialogContentModel.closeModal();
          },
          btnLeft: function(){
            $state.go('tree', {
              username: currentUser.username
            });
            dialogContentModel.closeModal();
          }
        },
        labels: {
          btnRight: 'Ir al inventario',
          btnLeft: 'Ok'
        },
        image: MediaAchievements[achievement.number].settings.badge,
        addCongratulations: true
      };

      var dialogOptions = {
        templateUrl: 'templates/partials/modal-alert-content.html',
        model: dialogContentModel
      };
      ModalService.showModel(dialogOptions);
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
