(function() {
  'use strict';
  angular.module('moi.controllers')
    .controller('InventoryController', function($ionicPopup,
                                                data,
                                                UserService,
                                                MediaAchievements) {
      var vmInv = this;

      vmInv.buttonsOptions = {
        neuron: null,
        content: null,
        buttons: {
          learn: true,
          search: true,
          share: true,
          recomendation: true,
          saveTask: true,
          showTasks: true
        }
      };
      vmInv.showInventory = true;
      vmInv.finishedAnimation = finishedAnimation;
      vmInv.activateAchievement = activateAchievement;
      vmInv.achievementSelected = {};
      vmInv.achievements = data.achievements;
      vmInv.increaseSize = increaseSize;
      vmInv.cssCell = [];
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
        }else{
          $backgroundSound[0].pause();
          vmInv.showInventory = false;
          vmInv.urlVideo = achievement.settings.video;
        }
      }

      function increaseSize(increase, index) {
        var scale = 1 + '.05';
        if (increase) {
          vmInv.cssCell[index] = {
            transform: 'scale(' + scale + ')',
            transition: '0.2s ease-in-out'
          };
        }else{
          delete vmInv.cssCell[index].transform;
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
