(function() {
  'use strict';
  angular.module('moi.controllers')
    .controller('InventoryController', function($ionicPopup,
                                                data,
                                                UserService,
                                                MediaAchievements,
                                                HoverAnimationService,
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
      vmInv.finishedAnimation = finishedAnimation;
      vmInv.activateAchievement = activateAchievement;
      vmInv.achievementSelected = {};
      vmInv.achievements = data.achievements;
      vmInv.increaseSize = HoverAnimationService.increaseSize;
      vmInv.cssOptions = {
        styles: []
      };
      vmInv.frameOptions = {
        type: 'content_max',
        showBackButton: true
      };
      var $backgroundSound = angular.element(document.querySelector('#backgroundSound'));

      setMediaIntoAchievements(vmInv.achievements);

      function finishedAnimation(){
        vmInv.showInventory = true;
        $backgroundSound[0].play();
        $backgroundSound[0].autoplay = true;
      }

      function setMediaIntoAchievements(achievements){
        if(achievements.length > 0){
          angular.forEach(achievements, function(achievement, index){
            achievements[index].settings = MediaAchievements[achievement.number].settings;
          });
        }
      }

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
