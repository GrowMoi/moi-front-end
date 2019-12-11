(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('ProfileEditController', function (user,
                                                $ionicPopup,
                                                $state,
                                                UserService,
                                                ImagesLogin,
                                                ModalService,
                                                UploadImageService) {

    var vmProfileEdit = this;
    vmProfileEdit.errorImage = false;

    vmProfileEdit.test = function(){
      if (vmProfileEdit.filepreview) {
        UploadImageService.uploadImageUser(vmProfileEdit.filepreview).then(function(resp){
          vmProfileEdit.user.image = resp.image;
          vmProfileEdit.filepreview = null;
        }, function(){
          vmProfileEdit.filepreview = user.image;
          vmProfileEdit.errorImage = true;
          vmProfileEdit.file = null;
        });
      }
    };

    vmProfileEdit.user = user;
    vmProfileEdit.user.image = user.avatar || user.image;

    vmProfileEdit.editProfile = editProfile;
    vmProfileEdit.buttonsOptions = {
      neuron: {},
      content: {},
      disabledAnimations: true,
      buttons: {
        search: true,
        recomendation: true,
        showTasks: true
      }
    };
    vmProfileEdit.frameOptions = {
      type: 'content_max',
      showBackButton: true,
      wholeFrame: true
    };
    vmProfileEdit.images = ImagesLogin.paths;

    function editProfile(){
      UserService.updateProfile(vmProfileEdit.user)
        .then(function() {
          $ionicPopup.alert({
            title: 'Actualización de Usuario',
            template: 'Actualización Exitosa'
          }).then(function(){
            /*jshint camelcase: false */
            $state.go('profile', {username: vmProfileEdit.user.username});
          });
        })
        .catch(function(resp) {
          var msg = '';
          if(resp.status === 401){
            msg = 'No Autorizado';
          }else{
            msg = resp.data.join(', ');
          }
          $ionicPopup.alert({
            title: 'Ups!',
            /*jshint camelcase: false */
            template: msg
          });
        });
    }
    vmProfileEdit.onSelectImage = function(image){
      /*jshint camelcase: false */
      vmProfileEdit.user.authorization_key = image.key;
    };

    dontUseNewLogin();

    function dontUseNewLogin(){
      /*jshint camelcase: false */
      if(!(!!vmProfileEdit.user.username)){
        showAlert();
      }
    }


    function showAlert(){
      var notification = {
        title: 'Actualización de Datos y Acceso'
      };
      notification.description = 'Estimado Usuarix: estamos actualizando nuestro sistema de login para hacer '+
                                    'nuestra plataforma más accesible. Por esta razón necesitamos que actualices '+
                                    'tu perfil con un "Nombre de Usuario" y una "Imagen Secreta". Luego de guardar '+
                                    'los cambios, deberás ingresar a Mi Aula BdP utilizando tu Nombre de Usuario e Imágen '+
                                    'Secreta. Por esta razón, te recomendamos anotar esta información o memorizarla, '+
                                    'para que puedas usar Mi Aula BdP cuando quieras.';
      var dialogOptions = {
        templateUrl: 'templates/partials/modal-show-notification.html',
        model: notification
      };
      ModalService.showModel(dialogOptions);
    }
  });
})();
