(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('TestService', TestService);

  function TestService($http,
                      TreeService,
                      ENV,
                      ModalService,
                      $state,
                      $auth,
                      $q,
                      $timeout,
                      MoiAnimationService){

    var service = {
      goTest: goTest,
      scoreTest: scoreTest,
      evaluateTest: evaluateTest,
      goFinalTest: goFinalTest,
      createFinalTest: createFinalTest,
      getFinalTest: getFinalTest,
      evaluateFinalTest: evaluateFinalTest,
      cancelTest: cancelTest,
      getTest: getTest
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

    function goFinalTest(scope, user, username, justCompletedTree, idTest) {
      var templateModal = 'templates/partials/modal-launch-final-test.html';
      var modelData = {
        user: user,
        justCompletedTree: justCompletedTree,
        createFinalTest: function(){
          $state.go('finaltest', {id: idTest});
          modelData.closeModal();
        },
        onCloseModal: function() {
          if(username) {
            $state.go('tree', { username: username });
          }
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
    }

    function goTest(scope, test) {
      var templateModal = 'templates/partials/modal-launch-test.html';
      var modelData = {};
      modelData.testId = test.id;
      modelData.testQuestions = test.questions;
      modelData.user = $auth.user;
      modelData.contentsLearnt = test.total_contents; //jshint ignore:line
      ModalService.showModel(
        {
          parentScope: scope,
          templateUrl: templateModal,
          model: modelData
        }
      );
    }

    function scoreTest(scope, data) {
      var modelData = {};
      var progressTree = TreeService.progressTree(data.meta);
      $timeout(function(){scope.vmTest.isCheckingResultTest = false;});
      modelData.percentageLevel = progressTree.userLevel.percentage;
      modelData.userLevel = progressTree.userLevel.level;
      modelData.percentage = progressTree.percentage;
      modelData.questions = data.questions;
      modelData.userInfo = $auth.user;
      modelData.userInfo.content_summary = data.meta; //jshint ignore:line
      modelData.successAnswers = data.successAnswers;
      modelData.totalQuestions = data.totalQuestions;
      modelData.cssOptions = {
        styles: []
      };
      modelData.increaseSize = function(increase, cssOpts, id){
        cssOpts.scale = (id.includes('answer') || id.includes('btn_ok')) ? '1.3' : null;
        MoiAnimationService.increaseSize(increase, cssOpts, id);
      };

      modelData.onClick = function(){
        modelData.closeModal();
      };

      modelData.shown = function(){
        $timeout(animateModalWidgets, 1000);
      };

      return $q(function(resolve) {
        ModalService.showModel(
          {
            parentScope: scope,
            templateUrl: 'templates/partials/modal-summary-test.html',
            onHide: function() {
              resolve();
            },
            model: modelData
          }
        );
      });
    }

    function animateModalWidgets(){
      var percentageTreeWidget = document.querySelector('#percentageTree-finalmodal');
      var levelUserWidget = document.querySelector('#levelUser-finalmodal');
      var elementList = angular.element(document.querySelectorAll('.question .answer .icon')).toArray();
      elementList.push(levelUserWidget);
      elementList.push(percentageTreeWidget);
      animateElements(elementList);
    }

    function animateElements(elements) {
      var element = elements.shift();
      if(element || elements.length !== 0) {
        var defaultAnimation = 'zoomIn faster';
        if(elements.length <= 1) {
          defaultAnimation = 'pulse faster';
          MoiAnimationService.animateWidget(element, defaultAnimation);
          var lastElement = elements.shift();
          MoiAnimationService.animateWidget(lastElement, defaultAnimation);
        }else{
          angular.element(element).css('visibility', 'visible');
          MoiAnimationService.animateWidget(element, defaultAnimation).then(function() {
            animateElements(elements);
          });
        }
      }
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
          dialogContentModel.message = err.statusText;
          ModalService.showModel(dialogOptions);
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
          dialogContentModel.message = err.statusText;
          ModalService.showModel(dialogOptions);
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
          dialogContentModel.message = err.statusText;
          ModalService.showModel(dialogOptions);
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
          dialogContentModel.message = err.statusText;
          ModalService.showModel(dialogOptions);
        }
        return $q.reject(err);
      });
    }

    function cancelTest(testId) {
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/learn/cancel',
        data: {
          test_id: testId //jshint ignore:line
        }
      }).then(function success(res) {
        return res;
      }, function error(err) {
        if(err.status !== 404){
          dialogContentModel.message = err.statusText;
          ModalService.showModel(dialogOptions);
        }
        return $q.reject(err);
      });
    }

    function getTest(id) {
      /*jshint camelcase: false */
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/users/test/' + id
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
