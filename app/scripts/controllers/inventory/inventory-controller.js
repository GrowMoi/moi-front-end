(function() {
  'use strict';
  angular.module('moi.controllers')
    .controller('InventoryController', function($ionicPopup,
                                                data,
                                                UserService,
                                                MediaAchievements,
                                                MediaAchievementsEn,
                                                HoverAnimationService,
                                                ModalService,
                                                DesactiveAchievements,
                                                DesactiveAchievementsEn,
                                                TestService,
                                                $auth) {
      var vmInv = this;
      vmInv.user = $auth.user;
      vmInv.buttonsOptions = {
        neuron: null,
        content: null,
        buttons: {
          learn: true,
          search: true,
          recomendation: true,
          showTasks: true
        }
      };
      vmInv.showInventory = true;
      vmInv.activateAchievement = activateAchievement;
      vmInv.achievementSelected = {};
      var $backgroundSound;
      var achievements = data.achievements;
      var language = $auth.user.language;
      var arrAchievements = language === 'es' ? DesactiveAchievements : DesactiveAchievementsEn;
      achievements.map(function(achievement) {
        var currentAchievement = arrAchievements[achievement.number];
        if(currentAchievement) {
          arrAchievements[achievement.number] =  achievement;
          if(!achievement.desactive) {
            arrAchievements[achievement.number].settings = MediaAchievements[achievement.number].settings;
          }
          if(language === 'en'){
            arrAchievements[achievement.number].name = MediaAchievementsEn[achievement.number].name;
          }
        }
      });
      vmInv.achievements = arrAchievements;
      vmInv.increaseSize = HoverAnimationService.increaseSize;
      vmInv.cssOptions = {
        styles: []
      };
      $backgroundSound = angular.element(document.querySelector('#backgroundSound'));
      vmInv.finishedAnimation= function(){
        vmInv.showInventory = true;
        $backgroundSound[0].play();
        $backgroundSound[0].autoplay = true;
      };

      vmInv.frameOptions = {
        type: 'content_max',
        showBackButton: true
      };

      function activateAchievement(achievement){
        if(achievement.settings.theme){
          vmInv.achievementSelected = achievement;
          UserService.activeAchievement(achievement.id).then(showpopup);
        }
        if (achievement.settings.video) {
          $backgroundSound[0].pause();
          vmInv.showInventory = false;
          vmInv.urlVideo = achievement.settings.video;
        }
        if (achievement.settings.runFunction === 'openModal') {
          TestService.goFinalTest(null, vmInv.user.name);
        }
        if(achievement.desactive) {
          achievement.badgeFull = achievement.settings.badge .replace('item', 'badge');
          var dialogContentModel = {
            templateUrl: 'templates/partials/modal-inventory.html',
            model: achievement
          };
          ModalService.showModel(dialogContentModel);
        }
      }

      function showpopup(){
        $ionicPopup.alert({
          title: 'Cambios exitosos de mi perfil',
          template: 'Actualización Exitosa'
        }).then(setSelectedAchievement);
      }

      function setSelectedAchievement(){
        angular.forEach(vmInv.achievements, function(ach, index) {
          if(!vmInv.achievementSelected.active && vmInv.achievementSelected.number === ach.number){
            vmInv.achievements[index].active = true;
          }else{
            vmInv.achievements[index].active = false;
          }
        });
      }

    });
})();
