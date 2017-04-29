(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('TasksController', function(){
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
  });
})();
