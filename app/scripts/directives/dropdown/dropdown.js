(function () {
  'use strict';

    angular
      .module('moi.directives')
      .directive('moiDropdown', moiDropdown);

    function moiDropdown() {
      var directive = {
        restrict: 'EA',
        templateUrl: 'templates/directives/dropdown/dropdown.html',
        scope: {
          options: '='
        },
        controller: MoiDropdownController,
        controllerAs: 'vm',
        bindToController: true
      };

      return directive;
    }

    function MoiDropdownController() {
      var vm = this;
      vm.optionSelected = vm.options.options[0] || 'Seleccionar...';
      vm.showOptions = false;
      vm.onOpenDropdown = onOpenDropdown;
      vm.onSelectOption = onSelectOption;

      function onOpenDropdown() {
        vm.showOptions = !vm.showOptions;
      }

      function onSelectOption(option) {
        vm.optionSelected = option;
        vm.showOptions = !vm.showOptions;
        vm.options.onChangeOpt(option);
      }
    }
  })();
