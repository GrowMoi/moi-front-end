(function() {
  'use strict';
  angular.module('moi.controllers')
    .controller('InventoryController', function(data, UserService, MediaAchievements) {
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
      vmInv.achievements = data.achievements;
      vmInv.increaseSize = increaseSize;
      vmInv.cssCell = [];

      setMediaIntoAchievements(vmInv.achievements);

      function finishedAnimation(){
        vmInv.showInventory = true;
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
          if(!achievement.active){
            achievement.active = true;
          }else{
            achievement.active = false;
          }
          UserService.activeAchievement(achievement.id);
        }else{
          vmInv.showInventory = false;
          vmInv.urlVideo = achievement.settings.video;
        }
      }

      function increaseSize(increase, index) {
        var scale = 1 + '.10';
        if (increase) {
          vmInv.cssCell[index] = {
            transform: 'scale(' + scale + ')'
          };
        }else{
          delete vmInv.cssCell[index].transform;
        }
      }
    });
})();
