(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('TasksController', function($state,
                                          $rootScope,
                                          $auth,
                                          StorageService,
                                          UserNotificationsService,
                                          GAService){
    var tasksmodel = this;

    tasksmodel.buttonsOptions = {
      neuron: {},
      content: {},
      buttons: {
        search: true,
        recomendation: true,
        showTasks: {
          disabled: true
        }
      }
    };

    var tabs = [
      {
        field:'notes',
        name: 'Notas',
        image: 'images/notes_tasks.png',
        selected: false,
        state: 'tasks.notes'
      },
      {
        field:'recommendations',
        name: 'Recomendaciones',
        image: 'images/recomendations_tasks.png',
        selected: false,
        state: 'tasks.recommendations'
      },
      {
        field:'contents',
        name: 'Tareas',
        image: 'images/list_tasks.png',
        selected: false,
        state: 'tasks.contents'
      },
      {
        field:'notifications',
        name: 'Notificaciones',
        image: 'images/notifications_tasks.png',
        selected: false,
        state: 'tasks.notifications'
      },
      {
        field:'favorites',
        name: 'Favoritos',
        image: 'images/favorites_tasks.png',
        selected: false,
        state: 'tasks.favorites'
      },
      {
        field:'events',
        name: 'Eventos',
        image: 'images/events_tasks.png',
        selected: false,
        state: 'tasks.events'
      }
    ];

    var tabsEn = [
      {
        field:'notes',
        name: 'Notes',
        image: 'images/notes_tasks.png',
        selected: false,
        state: 'tasks.notes'
      },
      {
        field:'recommendations',
        name: 'Recommendations',
        image: 'images/recomendations_tasks.png',
        selected: false,
        state: 'tasks.recommendations'
      },
      {
        field:'contents',
        name: 'Contents',
        image: 'images/notifications_tasks.png',
        selected: false,
        state: 'tasks.contents'
      },
      {
        field:'notifications',
        name: 'Notifications',
        image: 'images/notifications_tasks.png',
        selected: false,
        state: 'tasks.notifications'
      },
      {
        field:'favorites',
        name: 'Favorites',
        image: 'images/favorites_tasks.png',
        selected: false,
        state: 'tasks.favorites'
      },
      {
        field:'events',
        name: 'Events',
        image: 'images/events_tasks.png',
        selected: false,
        state: 'tasks.events'
      }
    ];
    var language = $auth.user.language;
    tasksmodel.tabs = language === 'es' ? tabs : tabsEn;

    tasksmodel.changeTab = function(field) {
      GAService.track('send', 'event', 'Seleccionar tab ' + field, 'Click');
      angular.forEach(tasksmodel.tabs, function(tab) {
        if(tab.field === field){
          tab.selected = true;
          tasksmodel.tabSelected = tab.field;
        }else{
          tab.selected = false;
        }
      });
    };

    initTab();
    tasksmodel.totalNotifications = UserNotificationsService.totalNotifications;
    tasksmodel.totalRecommendationContents = UserNotificationsService.totalRecommendationContents;

    function initTab() {
      var stateField = $state.current.name.replace('tasks.', '');
      tasksmodel.changeTab(stateField);
    }

    $rootScope.$on('notifications.updateCount', function(){
      tasksmodel.totalNotifications = UserNotificationsService.totalNotifications;
      tasksmodel.totalRecommendationContents = UserNotificationsService.totalRecommendationContents;
    });
  });
})();
