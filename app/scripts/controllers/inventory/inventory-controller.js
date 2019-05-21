(function() {
  'use strict';
  angular.module('moi.controllers')
    .controller('InventoryController', function($ionicPopup,
                                                data,
                                                events,
                                                UserService,
                                                MediaAchievements,
                                                MediaAchievementsEn,
                                                HoverAnimationService,
                                                ModalService,
                                                DesactiveAchievements,
                                                DesactiveAchievementsEn,
                                                TestService,
                                                $auth) {
      var vmInv = this,
          $backgroundSound,
          achievements = data.achievements,
          language = $auth.user.language,
          allEventItems = {},
          allAchievements = {};

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
      vmInv.tabs = [
        {
          field: 'achievements',
          name: '1',
          selected: true
        },
        {
          field: 'event_items',
          name: '2',
          selected: false
        },
      ];
      vmInv.changeTab = changeTab;
      allEventItems = formatEvents();
      allAchievements = formatAchievements();
      vmInv.achievements = allAchievements;
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

      function formatAchievements() {
        var achievementsList = language === 'es' ? DesactiveAchievements : DesactiveAchievementsEn;
        achievements.map(function(achievement) {
          var currentAchievement = achievementsList[achievement.number];
          if(currentAchievement) {
            achievementsList[achievement.number] =  achievement;
            if(!achievement.desactive) {
              achievementsList[achievement.number].settings = MediaAchievements[achievement.number].settings;
            }
            if(language === 'en'){
              achievementsList[achievement.number].name = MediaAchievementsEn[achievement.number].name;
            }
          }
        });
        return achievementsList;
      }

      function formatEvents() {
        var eventsItems = {};
        events.map(function(event, index){
          var eventItem = {
            desactive: !event.completed,
            description: event.description,
            name: event.title,
            settings: {
              badge: event.completed ? event.image : event.inactive_image //jshint ignore:line
            }
          };
          eventsItems[index+1] = eventItem;
        });
        return eventsItems;
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

      function changeTab(field) {
        vmInv.achievements = (field === 'achievements') ? allAchievements : allEventItems;
        angular.forEach(vmInv.tabs, function(tab) {
          tab.selected = tab.field === field;
        });
      }

    });
})();
