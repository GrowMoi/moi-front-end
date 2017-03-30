(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('ProfileController', function (user, $auth, $state) {

    var vmProfile = this,
        currentUser = $auth.user;
    vmProfile.user = user;
    vmProfile.isCurrentUser = user.id === currentUser.id;
    vmProfile.showGifSearch = false;
    vmProfile.finishedAnimationSearch = finishedAnimationSearch;
    vmProfile.loadedGif = loadedGif;

    function finishedAnimationSearch() {
      $state.go('searches');
    }

    function loadedGif(key) {
      vmProfile[key] = true;
    }
  });

})();
