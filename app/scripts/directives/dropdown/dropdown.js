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

    function MoiDropdownController($document, $timeout) {
      var vm = this;
      var dropdownPlaceholder = 'Seleccionar...';
      vm.optionSelected = vm.options && vm.options.optionSelected ? vm.options.optionSelected : dropdownPlaceholder;
      vm.showOptions = false;
      vm.onOpenDropdown = onOpenDropdown;
      vm.onSelectOption = onSelectOption;
      if (vm.options.onRegisterApi) {
        var api = createPublicApi();
        vm.options.onRegisterApi(api);
      }

      function onOpenDropdown() {
        vm.showOptions = true;
      }

      function onSelectOption(option) {
        vm.optionSelected = option;
        vm.showOptions = false;
        vm.options.onChangeOpt(option);
      }

      function createPublicApi() {
        return {
          initOptions: initOptions
        };
      }

      function initOptions() {
        vm.optionSelected = dropdownPlaceholder;
      }

      $document.on('click', function(event){
        if(!event.target.className.includes('option-selected') && vm.showOptions) {
          $timeout(function(){vm.showOptions = false;});
        }
      });
    }
  })();