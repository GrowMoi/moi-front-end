(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('ProfileEditController', function (user,
                                                $auth,
                                                $ionicPopup,
                                                $state,
                                                UserService,
                                                AnimationService) {

    var vmProfileEdit = this;
    vmProfileEdit.user = user;
    vmProfileEdit.editProfile = editProfile;

    vmProfileEdit.searchOptions = AnimationService.getButton({
      key: 'search',
      callbacks: {
        finishedAnimation: finishedAnimationSearch
      }
    });

    vmProfileEdit.recomendationOptions = AnimationService.getButton({
      key: 'recomendation',
      callbacks: {
        finishedAnimation: finishedAnimationRecomendation
      }
    });

    vmProfileEdit.showTasksOptions = AnimationService.getButton({
      key: 'showTasks',
      callbacks: {
        finishedAnimation: finishedAnimationShowTasks
      }
    });

    function finishedAnimationSearch() {
      $state.go('searches');
    }

    function finishedAnimationRecomendation() {
      var id = $state.params.neuronId;
      UserService.recommendedNeuron(id);
    }

    function finishedAnimationShowTasks() {
      $state.go('tasks');
    }

    function editProfile(){
      UserService.updateProfile(vmProfileEdit.user)
        .then(function() {
          $ionicPopup.alert({
            title: 'Actualización de Usuario',
            template: 'Actualización Exitosa'
          }).then(function(){
            /*jshint camelcase: false */
            vmProfileEdit.user.current_password = '';
            vmProfileEdit.user.password = '';
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
  });
})();
