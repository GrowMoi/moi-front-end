(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('TestService', TestService);

  function TestService($http,
                      $ionicPopup,
                      ENV,
                      ModalService,
                      PopupService,
                      StorageService,
                      $state,
                      $auth,
                      $q){

    var service = {
      goTest: goTest,
      scoreTest: scoreTest,
      evaluateTest: evaluateTest,
      goFinalTest: goFinalTest,
      createFinalTest: createFinalTest,
      getFinalTest: getFinalTest,
      evaluateFinalTest: evaluateFinalTest
    };

    var popupOptions = { title: 'Error'};

    return service;

    function goFinalTest(scope, name) {
      StorageService.get().then(function(value){
        var storage = value.data.storage || {};
        var templateModal = storage.language === 'es' ? 'templates/partials/modal-launch-final-test.html' : 'templates/partials/modal-launch-final-test-en.html';
        var modelData = {
          name: name,
          createFinalTest: function(){
            $state.go('finaltest');
            modelData.closeModal();
          }
        };
        ModalService.showModel(
          {
            parentScope: scope,
            templateUrl: templateModal,
            model: modelData
          }
        );
      });
    }

    function goTest(scope, test) {
      StorageService.get().then(function(value){
        var storage = value.data.storage || {};
        var templateModal = storage.language === 'es' ? 'templates/partials/modal-launch-test.html' : 'templates/partials/modal-launch-test-en.html';
        var modelData = {};
        modelData.testId = test.id;
        modelData.testQuestions = test.questions;
        modelData.contentsLearnt = modelData.testQuestions.length;
        ModalService.showModel(
          {
            parentScope: scope,
            templateUrl: templateModal,
            model: modelData
          }
        );
      });
    }

    function scoreTest(scope, data) {
      var modelData = {};
      modelData.successAnswers = data.successAnswers;
      modelData.totalQuestions = data.totalQuestions;
      modelData.onClick = function(){
        modelData.closeModal();
        $state.go('tree', {
          username: $auth.user.username
        });
      };
      return $q(function(resolve) {
        StorageService.get().then(function(value){
          var storage = value.data.storage || {};
          var templateModal = storage.language === 'es' ? 'templates/partials/modal-score-test.html' : 'templates/partials/modal-score-test-en.html';
          ModalService.showModel(
            {
              parentScope: scope,
              templateUrl: templateModal,
              onHide: function() {
                resolve();
              },
              model: modelData
            }
          );
        });
      });

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
        if(err.status !== 404){
          popupOptions.content = err.statusText;
          PopupService.showModel('alert', popupOptions);
        }
        return $q.reject(err);
      });
    }

    function createFinalTest() {
      /*jshint camelcase: false */
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/users/final_test ',
        data: {}
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        if(err.status !== 404){
          popupOptions.content = err.statusText;
          PopupService.showModel('alert', popupOptions);
        }
        return $q.reject(err);
      });
    }

    function getFinalTest(id) {
      /*jshint camelcase: false */
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/users/final_test/' + id
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

    function evaluateFinalTest(params) {
      /*jshint camelcase: false */
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/users/final_test/' + params.id + '/answer',
        data: {
          id: params.id,
          answers: JSON.stringify(params.answers || [])
        }
      }).then(function success(res) {
        return res;
      }, function error(err) {
        if(err.status !== 404){
          popupOptions.content = err.statusText;
          PopupService.showModel('alert', popupOptions);
        }
        return $q.reject(err);
      });
    }
  }
})();
