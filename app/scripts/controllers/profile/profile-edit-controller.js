(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('ProfileEditController', function (user,
                                                $ionicPopup,
                                                $state,
                                                UserService,
                                                ImagesLogin) {

    var vmProfileEdit = this;
    vmProfileEdit.user = user;
    vmProfileEdit.editProfile = editProfile;
    vmProfileEdit.buttonsOptions = {
      neuron: {},
      content: {},
      buttons: {
        search: true,
        recomendation: true,
        showTasks: true
      }
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
            $state.go('profile', {userId: vmProfileEdit.user.id});
          });
        })
        .catch(function(resp) {
          var msg;
          if(resp.status === 401){
            msg = 'No Autorizado';
          }else{
            msg = resp.data.errors.join(', ');
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
  });
})();
