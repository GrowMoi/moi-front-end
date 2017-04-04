(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('ProfileController', function (user, $auth, $state, AnimationService) {

    var vmProfile = this,
        currentUser = $auth.user;
    vmProfile.user = user;
    vmProfile.isCurrentUser = user.id === currentUser.id;

    vmProfile.searchOptions = AnimationService.searchButton({
      finishedAnimation: finishedAnimationSearch
    });

    function finishedAnimationSearch() {
      $state.go('searches');
    }

  });

})();
