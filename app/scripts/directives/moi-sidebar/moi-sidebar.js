(function () {
  'use strict';

  angular
    .module('moi.directives')
    .directive('moiSidebar', moiSidebar);

  function moiSidebar() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'templates/directives/moi-sidebar/moi-sidebar.html',
      scope: false,
      replace: true,
      controller: sidebarController,
      controllerAs: 'vm',
      bindToController: true,
    };

    function sidebarController($state, $auth, AnimationService, ModalService) {
      var vm = this;
      vm.user = $auth.user;
      vm.goToTree = goToTree;

      vm.settingOptions = AnimationService.getButton({
        key: 'settings',
        callbacks: {
          finishedAnimation: vm.user.id ? goToSetting : showNotificationModal
        }
      });

      vm.profileOptions = AnimationService.getButton({
        key: 'profile',
        callbacks: {
          finishedAnimation: vm.user.id ? goToProfile : showNotificationModal
        }
      });

      vm.inventoryOptions = AnimationService.getButton({
        key: 'inventory',
        callbacks: {
          finishedAnimation: vm.user.id ? goToInventory : showNotificationModal
        }
      });

      function goToSetting() {
        $state.go('settings');
      }

      function goToProfile() {
        $state.go('profile', {userId: vm.user.id});
      }

      function goToInventory() {
        $state.go('inventory');
      }

      function goToTree() {
        if (vm.user.id) {
          $state.go('tree', {
            username: $auth.user.username
          });
        }else{
          showNotificationModal();
        }
      }

      function showNotificationModal() {
        var dialogOptions = {
          templateUrl: 'templates/partials/modal-notification-join-app.html',
          model: {}
        };
        ModalService.showModel(dialogOptions);
      }

    }

    return directive;
  }
})();
