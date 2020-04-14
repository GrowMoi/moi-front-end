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

    function sidebarController($scope, $state, $auth, MoiAnimationService, ModalService) {
      var vm = this;
      vm.user = $auth.user;
      vm.user.tree_image = vm.user.tree_image || 'images/default-tree.png'; //jshint ignore:line
      vm.goToTree = goToTree;
      vm.onPlayAnimation = onPlayAnimation;
      vm.increaseSize = MoiAnimationService.increaseSize;
      vm.cssOptions = {
        styles: []
      };
      vm.buttonsOptions = [
        {
          page: 'settings',
          translation: 'buttons.configuration',
          icon: '../images/sidebar/config_menu.png'
        },
        {
          page: 'profile',
          translation: 'buttons.profile',
          icon: '../images/sidebar/perfil_menu.png'
        },
        {
          page: 'inventory',
          translation: 'buttons.inventory',
          icon: '../images/sidebar/inventario_menu.png'
        }
      ];

      function onPlayAnimation(page) {
        var $btnSelected = document.querySelector('.btn-'+ page +'-sidebar');
        MoiAnimationService.animateWidget($btnSelected, 'tada').then(function(){
          goToPage(page);
        });
      }

      function goToPage(page) {
        if (vm.user.id) {
          switch (page) {
            case 'settings':
              $state.go('settings');
              break;
            case 'profile':
              $state.go('profile', {username: vm.user.username});
              break;
            case 'inventory':
              $state.go('inventory');
              break;
          }
        }
      }

      function goToTree() {
        if (vm.user.id) {
          $state.go('tree', {
            username: $auth.user.username
          });
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
