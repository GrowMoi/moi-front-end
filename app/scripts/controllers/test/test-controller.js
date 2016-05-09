(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('TestController',
    function ($stateParams) {

    var vmTest = this;
    vmTest.selectAnswer = selectAnswer;
    vmTest.next = next;

    init();

    function init() {
      vmTest.answers = [];
      vmTest.indexShow = 0;
      vmTest.percentage = 0;
      vmTest.questions = $stateParams.testData.test;
      vmTest.questions[0].showQuestion = true;
      vmTest.nextQuestion = false;
    }

    function selectAnswer(answer, index) {
      var current = 'question-' + index;
      if (vmTest.hasOwnProperty(current)) {
        vmTest[current].selected = false;
      }
      vmTest[current] = answer;
      answer.selected = true;
      answers(answer, index);
      vmTest.nextQuestion = true;
      percentage();
    }

    function next() {
      if (!vmTest.nextQuestion) {
        return;
      }
      var condition = vmTest.questions.length - 1;
      var newVal = vmTest.indexShow + 1;
      if (vmTest.indexShow !== condition) {
        vmTest.questions[vmTest.indexShow].showQuestion = false;
        vmTest.indexShow = newVal;
        vmTest.questions[vmTest.indexShow].showQuestion = true;
        vmTest.nextQuestion = false;
      }
    }

    /*user answers to backend check*/
    function answers(answer, index){
      vmTest.answers[index] = answer;
    }

    function percentage() {
      vmTest.percentage = Math.round((vmTest.answers.length/vmTest.questions.length) * 100);
    }

  });

})();
