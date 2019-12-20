(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('QuizService', QuizService);

  function QuizService($http,
                      $window,
                      ENV,
                      $auth,
                      ModalService){

    var service = {
      getQuiz: getQuiz,
      scoreQuiz: scoreQuiz,
      evaluateQuiz: evaluateQuiz
    };

    var dialogContentModel = {
      title: 'Error',
      message: ''
    };

    var dialogOptions = {
      templateUrl: 'templates/partials/modal-error.html',
      model: dialogContentModel
    };

    return service;

    function scoreQuiz(scope, data) {
      var modelData = {};
      modelData.successAnswers = data.successAnswers;
      modelData.totalQuestions = data.totalQuestions;
      modelData.user = $auth.user;
      modelData.onClick = reloadPage;
      modelData.isQuiz = true;
      var templateModal = 'templates/partials/modal-score-test.html';
      ModalService.showModel(
        {
          parentScope: scope,
          templateUrl: templateModal,
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
          dialogContentModel.message = err.statusText;
          ModalService.showModel(dialogOptions);
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
          dialogContentModel.message = err.statusText;
          ModalService.showModel(dialogOptions);
        }
        return err;
      });
    }

  }
})();
