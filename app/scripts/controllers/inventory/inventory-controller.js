(function() {
  'use strict';
  angular.module('moi.controllers')
    .controller('InventoryController', function($ionicPopup,
                                                data,
                                                events,
                                                UserService,
                                                HoverAnimationService,
                                                ModalService,
                                                TestService,
                                                $auth,
                                                UtilityService) {
      var vmInv = this,
          $backgroundSound,
          allEventItems = [],
          allAchievements = [],
          splitedAchivements = [],
          itemsPerTab = 12;

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
      vmInv.changeTab = changeTab;
      allEventItems = formatEventsItems();
      allAchievements = formatAchievementsImage(data.achievements.concat(allEventItems));
      splitedAchivements = UtilityService.splitArrayIntoChunks(allAchievements, itemsPerTab);
      vmInv.tabs = formatTabs(splitedAchivements.length);
      vmInv.achievements = splitedAchivements[0];
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

      function formatEventsItems() {
        var superEventsMapped = [],
            eventsMapped = [];
        if(events) {
          superEventsMapped = events.superevents.map(formatEventAchievement);
          eventsMapped = events.events.map(formatEventAchievement);
        }
        return superEventsMapped.concat(eventsMapped);
      }

      function formatEventAchievement(event){
        var eventItem = {
          desactive: !event.completed,
          description: event.description,
          name: event.title,
          is_available: event.completed //jshint ignore:line
        };
        return eventItem;
      }

      function activateAchievement(achievement){
        if (achievement.is_available && achievement.rewards) { //jshint ignore:line
          if (achievement.rewards.theme){
            vmInv.achievementSelected = achievement;
            UserService.activeAchievement(achievement.id).then(showpopup);
          }
          if (achievement.rewards.video) {
            $backgroundSound[0].pause();
            vmInv.showInventory = false;
            vmInv.urlVideo = achievement.rewards.video;
          }
          if (achievement.rewards.runFunction === 'openModal') {
            TestService.goFinalTest(null, vmInv.user.name);
          }
        } else {
          achievement.badgeFull = achievement.image;
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

      function changeTab(currentTab) {
        vmInv.achievements = [];
        vmInv.achievements = splitedAchivements[currentTab.page];
        angular.forEach(vmInv.tabs, function(tab) {
          tab.selected = tab.field === currentTab.field;
        });
      }

      function formatTabs(pages) {
        var formatField = 'achievement_pag';
        var formatedTabs = [];
        for (var index = 0; index < pages; index++) {
          var tab = {
            field: formatField + index,
            page: index,
            name: index + 1,
            selected: index === 0
          };
          formatedTabs.push(tab);
        }
        return formatedTabs;
      }

      function formatAchievementsImage(achievements) {
        return achievements.map(function (achievement) {
          achievement.image = achievement.image || '//:0';//jshint ignore:line
          achievement.inactive_image = achievement.inactive_image || '//:0';//jshint ignore:line
          return achievement;
        });
      }
    });
})();
