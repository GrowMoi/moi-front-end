(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('ProfileController', function (user, $auth) {

    var vmProfile = this,
        currentUser = $auth.user;
    vmProfile.user = user;
    vmProfile.isCurrentUser = user.id === currentUser.id;
    vmProfile.buttonsOptions = {
      neuron: {},
      content: {},
      buttons: {
        search: true,
        recomendation: true,
        showTasks: true
      }
    };
  });
})();
