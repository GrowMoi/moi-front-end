(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('SettingsController', function (SettingsService,
                                              user,
                                              dragularService,
                                              StorageService,
                                              Interests,
                                              InterestsEn,
                                              $auth,
                                              $scope,
                                              $state,
                                              $filter) {

    var vm = this;
    vm.selectInterest = selectInterest;
    vm.contentSettings = contentSettings;
    vm.changeLanguage = StorageService.changeLanguage;
    var language = $auth.user.language;
    vm.state = language === 'es' ? false : true;
    vm.listSelected = [];
    vm.advicesOn = (localStorage.getItem('advicesOn') === 'true') || false;
    vm.updateAdvicesSettings = updateAdvicesSettings;
    /*jshint camelcase: false */
    vm.preferences = user.content_preferences;
    vm.preferences = $filter('orderBy')(vm.preferences, 'order');
    vm.frameOptions = {
      type: 'marco_arbol',
      showBackButton: true
    };

    dragularService('.drag-panel', {
      containersModel: [vm.preferences],
      scope: $scope
    });

    /* TODO
      1. Save interest in the backend with name/kind and image
      2. Associate interest to each user
      3. Create a endpoint to get/update the interests
    */
    vm.interests = language === 'es' ? Interests : InterestsEn;

    function selectInterest(interest){
      interest.selected = interest.selected === undefined ? true : !interest.selected;
      if (interest.selected) {
        vm.listSelected.push(interest);
      }else{
        var index = vm.listSelected.indexOf(interest);
        vm.listSelected.splice(index, 1);
      }
    }

    $scope.$on('dragulardrop', function(){
      var inorder = [],
          newPreferences = angular.copy(vm.preferences);
      angular.forEach(vm.preferences, function(setting, index){
        var obj = {};
        obj.kind = setting.kind;
        obj.order = index;
        inorder.push(obj);
        //update setting object
        newPreferences[index].order = index;
      });
      SettingsService.orderContentSettings(inorder).then(function(){
        user.content_preferences = newPreferences;
      });
    });

    function contentSettings(config){
      SettingsService.saveContentSettings(config);
    }

    function updateAdvicesSettings() {
      localStorage.setItem('advicesOn', vm.advicesOn);
    }
  });

})();
