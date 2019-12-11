(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('RecoverPasswordController', RecoverPasswordController);

  function RecoverPasswordController($state,
                                    RecoverPasswordService,
                                    PopupService,
                                    MoiAnimationService,
                                    ImagesLogin,
                                    ModalService) {
    var recoverVm = this,
        answerSelected = {};
    recoverVm.recoverForm = {};
    recoverVm.contentsRead = [];
    recoverVm.tempData = {};
    recoverVm.step = 1;
    recoverVm.recoverPassword = recoverPassword;
    recoverVm.cssOptions = {
      styles: []
    };
    recoverVm.selectAnswer = selectAnswer;
    recoverVm.increaseSize = MoiAnimationService.increaseSize;
    recoverVm.backStep = backStep;
    recoverVm.onSubmit = onSubmit;

    function recoverPassword() {
      RecoverPasswordService.validate(recoverVm.recoverForm.username, recoverVm.recoverForm.birth_year) //jshint ignore:line
      .then(function(resp) {
        recoverVm.step = 2;
        recoverVm.tempData = resp;
        recoverVm.contentsRead = shufleItems(resp.contents);
      }, function(error) {
        var popupOptions = {
          title: 'Ups',
          content: error.data.message
        };
        recoverVm.step = 1;
        recoverVm.contentsRead = [];
        recoverVm.tempData = {};
        PopupService.showModel('alert', popupOptions);
      });
    }

    function shufleItems(items) {
      var array = items.slice();
      var counter = array.length;
      while (counter > 0) {
          var index = Math.floor(Math.random() * counter);
          counter--;
          var temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
      }
      return array;
    }

    function selectAnswer(answer) {
      recoverVm.contentsRead.forEach(function(ans) {
        ans.selected = ans.id === answer.id;
      });
      answerSelected = answer;
    }

    function backStep() {
      recoverVm.step = 1;
    }

    function onSubmit() {
      RecoverPasswordService.recover(
        recoverVm.tempData.user_id,//jshint ignore:line
        recoverVm.tempData.content_reading_id,//jshint ignore:line
        answerSelected.id
      ).then(function(resp) {
        var passwordKey = ImagesLogin.paths.find(function(path) {
          return resp.key === path.key;
        });
        if (passwordKey) {
          var dialogOptions = {
            templateUrl: 'templates/partials/modal-alert-content.html',
            model: {
              message: 'Para disfrutar de Mi Aula BdP inicia sesión con la siguiente clave\n'+
                       '<<' + passwordKey.name + '>>',
              image: passwordKey.path,
              callbacks: {
                btnCenter: function() {
                  dialogOptions.model.closeModal();
                  $state.go('login.first_step');
                }
              },
              labels: {
                btnCenter: 'Ok'
              }
            }
          };
          ModalService.showModel(dialogOptions);
        }
      }, function(error) {
        var popupOptions = {
          title: 'Ups',
          content: error.data.message
        };
        answerSelected.selected = false;
        recoverVm.contentsRead = shufleItems(recoverVm.contentsRead);
        PopupService.showModel('alert', popupOptions);
      });
    }
  }
})();
