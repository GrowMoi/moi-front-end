(function() {
  'use strict';
  angular.module('moi.controllers')
    .controller('InventoryController', function($ionicPopup,
                                                data,
                                                UserService,
                                                MediaAchievements,
                                                HoverAnimationService,
                                                ModalService,
                                                StorageService,
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
      var desactiveAchievements = [
  	      {
            desactive: true,
            description: 'Aprende tus primeros 4 contenidos para ganar este item',
            name: 'Contenidos Aprendidos',
            number:1,
            settings:{badge:'images/inventory/badges/item1.png'}
          },
          {
            desactive: true,
            description: 'Aprende 20 contenidos de color amarillo para ganar este item',
            name: 'Contenidos color Amarillo',
            number:2,
            settings:{badge:'images/inventory/badges/item2.png'}
          },
          {
            desactive: true,
            description: 'Aprende 20 contenidos de color rojo para ganar este item',
            name: 'Contenidos color Rojo',
            number:3,
            settings:{badge:'images/inventory/badges/item3.png'}
          },
          {
            desactive: true,
            description: 'Aprende 20 contenidos de color azul',
            name: 'Contenidos color Azul',
            number:4,
            settings:{badge:'images/inventory/badges/item4.png'}
          },
          {
            desactive: true,
            description: 'Aprende 20 contenidos de color verde para ganar este item',
            name: 'Contenidos color verde',
            number:5,
            settings:{badge:'images/inventory/badges/item9.png'}
          },
          {
            desactive: true,
            description: 'Despliega 25 pruebas para ganar este item',
            name: 'Despliega 25 pruebas',
            number:6,
            settings:{badge:'images/inventory/badges/item5.png'}
          },
          {
            desactive: true,
            description: 'Aprende un contenido en cada fruto para ganar este item',
            name: 'Contenidos de cada fruto',
            number:7,
            settings:{badge:'images/inventory/badges/item7.png'}
          },
          {
            desactive: true,
            description: 'Aprende todos los contenidos para ganar este item',
            name: 'Aprende todos los contenidos',
            number:8,
            settings:{badge:'images/inventory/badges/item8.png'}
          },
          {
            desactive: true,
            description: 'Completa 4 pruebas sin errores (16 preguntas sin errores) para ganar este item',
            name: 'Completa 4 pruebas',
            number:9,
            settings:{badge:'images/inventory/badges/item6.png'}
          },
          {
            desactive: true,
            description: 'Alcanzar el nivel 9 para ganar este item',
            name: 'Final del juego',
            number:10,
            settings:{badge:'images/inventory/badges/item10.png'}
          }
      ];
      var desactiveAchievementsEn = [
        {
          desactive: true,
          description: 'Learn your first 4 contents to win this item',
          name: 'Learned 4 contents',
          number:1,
          settings:{badge:'images/inventory/badges/item1.png'}
        },
        {
          desactive: true,
          description: 'Learn 20 yellow contents to win this item',
          name: 'Learned yellow contents',
          number:2,
          settings:{badge:'images/inventory/badges/item2.png'}
        },
        {
          desactive: true,
          description: 'Learn 20 red contents to win this item,',
          name: 'Learned red contents',
          number:3,
          settings:{badge:'images/inventory/badges/item3.png'}
        },
        {
          desactive: true,
          description: 'Learn 20 blue contents to win this item',
          name: 'Learned blue contents',
          number:4,
          settings:{badge:'images/inventory/badges/item4.png'}
        },
        {
          desactive: true,
          description: 'Learn 20 green contents to win this item',
          name: 'Learned green contents',
          number:5,
          settings:{badge:'images/inventory/badges/item9.png'}
        },
        {
          desactive: true,
          description: 'Deploy 25 tests to win this item',
          name: 'Deploy 25 tests',
          number:6,
          settings:{badge:'images/inventory/badges/item5.png'}
        },
        {
          desactive: true,
          description: 'Learn at least one content in each fruit in the Moi tree to win this item',
          name: 'One content in each fruit',
          number:7,
          settings:{badge:'images/inventory/badges/item7.png'}
        },
        {
          desactive: true,
          description: 'Learn every content in the Moi tree to win this item',
          name: 'Learn every content in the tree',
          number:8,
          settings:{badge:'images/inventory/badges/item8.png'}
        },
        {
          desactive: true,
          description: 'Finish 4 tests without mistakes to win this item',
          name: 'Four tests',
          number:9,
          settings:{badge:'images/inventory/badges/item6.png'}
        },
        {
          desactive: true,
          description: 'Reach the last level of the tree to win this item',
          name: 'Final test',
          number:10,
          settings:{badge:'images/inventory/badges/item10.png'}
        }
      ];
      var arr1=[];
      var language = $auth.user.language;
      var arrAchievements = language === 'es' ? desactiveAchievements : desactiveAchievementsEn;
      arrAchievements.map(function(obj){
        var findAchievement = achievements.find(function(acc){
          return obj.number === acc.number;
        });
        if (!findAchievement) {
          arr1.push(obj);
        }
      });
      arr1.map(function(obj){
        achievements.push(obj);
      });
      vmInv.achievements = achievements;
      vmInv.increaseSize = HoverAnimationService.increaseSize;
      vmInv.cssOptions = {
        styles: []
      };
      $backgroundSound = angular.element(document.querySelector('#backgroundSound'));

      setMediaIntoAchievements(vmInv.achievements);
      vmInv.finishedAnimation= function(){
        vmInv.showInventory = true;
        $backgroundSound[0].play();
        $backgroundSound[0].autoplay = true;
      };
      function setMediaIntoAchievements(achievements){
        if(achievements.length > 0){
          angular.forEach(achievements, function(achievement, index){
            if(!achievement.desactive) {
              achievements[index].settings = MediaAchievements[achievement.number].settings;
            }
          });
        }
      }

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
