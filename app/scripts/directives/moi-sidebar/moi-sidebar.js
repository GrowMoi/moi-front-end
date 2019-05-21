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

    function sidebarController($scope, $state, $auth, AnimationService, ModalService) {
      var vm = this;
      vm.user = $auth.user;
      vm.user.tree_image = vm.user.tree_image || 'images/default-tree.png'; //jshint ignore:line
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
        var templateModal = 'templates/partials/modal-notification-join-app.html';
        var dialogOptions = {
          templateUrl: templateModal,
          model: {}
        };
        ModalService.showModel(dialogOptions);
      }
      $scope.$on('scanner-started', function(event, args) {
        vm.user.tree_image = args.any.tree_image.url; //jshint ignore:line
      });
    }

    return directive;
  }
})();
