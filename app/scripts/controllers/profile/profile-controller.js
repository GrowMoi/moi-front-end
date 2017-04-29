(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('ProfileController', function (user,
                                            $auth,
                                            $state,
                                            AnimationService,
                                            UserService) {

    var vmProfile = this,
        currentUser = $auth.user;
    vmProfile.user = user;
    vmProfile.isCurrentUser = user.id === currentUser.id;

    vmProfile.searchOptions = AnimationService.getButton({
      key: 'search',
      callbacks: {
        finishedAnimation: finishedAnimationSearch
      }
    });

    vmProfile.recomendationOptions = AnimationService.getButton({
      key: 'recomendation',
      callbacks: {
        finishedAnimation: finishedAnimationRecomendation
      }
    });

    vmProfile.showTasksOptions = AnimationService.getButton({
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
  });

})();
