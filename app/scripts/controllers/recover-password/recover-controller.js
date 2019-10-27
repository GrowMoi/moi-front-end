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
    var recoverVm = this;
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

    function recoverPassword() {
      RecoverPasswordService.validate(recoverVm.recoverForm.username, recoverVm.recoverForm.email)
      .then(function(resp) {
        recoverVm.step = 2;
        recoverVm.tempData = resp;
        recoverVm.contentsRead = resp.contents;
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

    function selectAnswer(answer) {
      recoverVm.contentsRead.forEach(function(ans) {
        ans.selected = ans.id === answer.id;
      });
      RecoverPasswordService.recover(
        recoverVm.tempData.user_id,//jshint ignore:line
        recoverVm.tempData.content_reading_id,//jshint ignore:line
        answer.id
      ).then(function(resp) {
        var passwordKey = ImagesLogin.paths.find(function(path) {
          return resp.key === path.key;
        });
        if (passwordKey) {
          var dialogOptions = {
            templateUrl: 'templates/partials/modal-alert-content.html',
            model: {
              message: 'En hora buena, para disfruta de moi ahora podras ' +
                      'iniciar sesión con la siguiente clave <<' + passwordKey.name + '>>',
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
        PopupService.showModel('alert', popupOptions);
      });
    }

    function backStep() {
      recoverVm.step = 1;
    }
  }
})();
