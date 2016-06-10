(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('TestService', TestService);

  function TestService(ModalService,
                            $http,
                            $ionicPopup,
                            ENV) {

    var service = {
      goTest: goTest,
      scoreTest: scoreTest,
      evaluateTest: evaluateTest
    };

    return service;

    function goTest(scope, test) {
      var modelData = {};
      modelData.testId = test.id;
      modelData.testQuestions = test.questions;
      modelData.contentsLearnt = modelData.testQuestions.length;
      ModalService.showModel({
                parentScope: scope,
                templateUrl: 'templates/partials/modal-launch-test.html',
                model: modelData});
    }

    function scoreTest(scope, data) {
      var modelData = {};
      modelData.successAnswers = data.successAnswers;
      modelData.totalQuestions = data.totalQuestions;
      ModalService.showModel({
                parentScope: scope,
                templateUrl: 'templates/partials/modal-score-test.html',
                model: modelData});
    }

    function evaluateTest(id, answers) {
      /*jshint camelcase: false */
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/learn',
        data: {
          test_id: id,
          answers: JSON.stringify(answers)
        }
      }).then(function success(res) {
        return res;
      }, function error(err) {
        $ionicPopup.alert({
          title: 'Ups!',
          content: 'Ha ocurrido un error'
        });
        return err;
      });
    }
  }
})();
