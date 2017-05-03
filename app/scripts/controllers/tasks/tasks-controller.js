(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('TasksController', function(UserService){
    var tasksmodel = this;

    tasksmodel.tabs = [
      {
        field:'notes',
        name: 'Notas',
        image: 'images/notes_tasks.png',
        selected: false
      },
      {
        field:'recomendations',
        name: 'Recomendaciones',
        image: 'images/recomendations_tasks.png',
        selected: false
      },
      {
        field:'tasks',
        name: 'Tareas',
        image: 'images/notifications_tasks.png',
        selected: true
      },
      {
        field:'notifications',
        name: 'Notificaciones',
        image: 'images/notifications_tasks.png',
        selected: false
      },
      {
        field:'favorites',
        name: 'Favoritos',
        image: 'images/favorites_tasks.png',
        selected: false
      }
    ];
    tasksmodel.template = 'templates/tasks/partials/tasks-section.html';

    initData();

    tasksmodel.changeTab = function(field) {
      angular.forEach(tasksmodel.tabs, function(tab) {
        if(tab.field === field){
          tab.selected = true;
        }else{
          tab.selected = false;
        }
      });
    };

    function initData() {
      UserService.getTasks(1).then(function(data) {
        /*jshint camelcase: false */
        tasksmodel.contents = data.content_tasks.content_tasks;
      });
    }
  });
})();
