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
        readOnly: vm.user.id ? false : true,
        callbacks: {
          onClickReadOnly: showNotificationModal,
          finishedAnimation: goToSetting
        }
      });

      vm.profileOptions = AnimationService.getButton({
        key: 'profile',
        readOnly: vm.user.id ? false : true,
        callbacks: {
          onClickReadOnly: showNotificationModal,
          finishedAnimation: goToProfile
        }
      });

      vm.inventoryOptions = AnimationService.getButton({
        key: 'inventory',
        readOnly: vm.user.id ? false : true,
        callbacks: {
          onClickReadOnly: showNotificationModal,
          finishedAnimation: goToInventory
        }
      });

      function goToSetting() {
        $state.go('settings');
      }

      function goToProfile() {
        $state.go('profile', {username: vm.user.username});
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
