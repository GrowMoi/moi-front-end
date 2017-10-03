(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('QuizService', QuizService);

  function QuizService($http,
                      $ionicPopup,
                      $window,
                      ENV,
                      ModalService,
                      PopupService){

    var service = {
      getQuiz: getQuiz,
      scoreQuiz: scoreQuiz,
      evaluateQuiz: evaluateQuiz
    };

    var popupOptions = { title: 'Error'};

    return service;

    function scoreQuiz(scope, data) {
      var modelData = {};
      modelData.successAnswers = data.successAnswers;
      modelData.totalQuestions = data.totalQuestions;
      modelData.onClick = reloadPage;
      modelData.isQuiz = true;
      ModalService.showModel(
        {
          parentScope: scope,
          templateUrl: 'templates/partials/modal-score-test.html',
          model: modelData
        }
      );
    }

    function reloadPage() {
      $window.location.reload();
    }

    function evaluateQuiz(params) {
      /*jshint camelcase: false */
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/quizzes/' + params.quizId + '/players/' + params.playerId + '/answer',
        data: {
          quiz_id: params.quizId,
          player_id: params.playerId,
          answers: JSON.stringify(params.answers)
        }
      }).then(function success(res) {
        return res;
      }, function error(err) {
        if(err.status !== 404){
          popupOptions.content = err.statusText;
          PopupService.showModel('alert', popupOptions);
        }
        return err;
      });
    }

    function getQuiz(params) {
      /*jshint camelcase: false */
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/quizzes/' + params.quizId + '/players/' + params.playerId
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        if(err.status !== 404){
          popupOptions.content = err.statusText;
          PopupService.showModel('alert', popupOptions);
        }
        return err;
      });
    }

  }
})();
