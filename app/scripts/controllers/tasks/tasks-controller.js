(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('TasksController', function($scope, UserService){
    var tasksmodel = this;
    tasksmodel.noMoreItemsAvailable = true;
    tasksmodel.currentPage = 1;
    tasksmodel.template = 'templates/tasks/partials/notes-section.html';
    tasksmodel.tabSelected = 'notes';
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

    tasksmodel.tabs = [
      {
        field:'notes',
        name: 'Notas',
        image: 'images/notes_tasks.png',
        selected: true,
        template: 'templates/tasks/partials/notes-section.html'
      },
      {
        field:'recomendations',
        name: 'Recomendaciones',
        image: 'images/recomendations_tasks.png',
        selected: false,
        template: 'templates/tasks/partials/default-section.html'
      },
      {
        field:'tasks',
        name: 'Tareas',
        image: 'images/notifications_tasks.png',
        selected: false,
        template: 'templates/tasks/partials/tasks-section.html'
      },
      {
        field:'notifications',
        name: 'Notificaciones',
        image: 'images/notifications_tasks.png',
        selected: false,
        template: 'templates/tasks/partials/default-section.html'
      },
      {
        field:'favorites',
        name: 'Favoritos',
        image: 'images/favorites_tasks.png',
        selected: false,
        template: 'templates/tasks/partials/default-section.html'
      }
    ];

    initData();

    tasksmodel.changeTab = function(field) {
      angular.forEach(tasksmodel.tabs, function(tab) {
        if(tab.field === field){
          tab.selected = true;
          tasksmodel.template = tab.template;
          tasksmodel.tabSelected = tab.field;
          initData();
        }else{
          tab.selected = false;
        }
      });
    };

    tasksmodel.removeTask = function(content) {
      UserService.deleteTask(content).then(function(resp) {
        if(resp.status === 202){
          var contentIndex = tasksmodel.contents.indexOf(content);
          tasksmodel.contents.splice(contentIndex, 1);
        }
      });
    };

    function initData() {
      tasksmodel.noMoreItemsAvailable = true;
      tasksmodel.currentPage = 1;
      if(tasksmodel.tabSelected === 'notes'){
        UserService.getNotes(1).then(resolveNotes);
      } else if(tasksmodel.tabSelected === 'tasks'){
        UserService.getTasks(1).then(resolveTasks);
      }
    }

    function resolveTasks(data) {
      tasksmodel.currentPage += 1;
      /*jshint camelcase: false */
      tasksmodel.contents = data.content_tasks.content_tasks;
      /*jshint camelcase: false */
      tasksmodel.totalItems = data.meta.total_items;
      if(tasksmodel.totalItems > 4){
        tasksmodel.noMoreItemsAvailable = false;
        tasksmodel.loadMoreTasks = loadMoreTasks;
      }
    }

    function resolveNotes(data) {
      tasksmodel.currentPage += 1;
      /*jshint camelcase: false */
      tasksmodel.notes = data.content_notes.content_notes;
      /*jshint camelcase: false */
      tasksmodel.totalItems = data.meta.total_items;
      if(tasksmodel.totalItems > 2){
        tasksmodel.noMoreItemsAvailable = false;
        tasksmodel.loadMoreNotes = loadMoreNotes;
      }
    }

    function loadMoreTasks() {
      UserService.getTasks(tasksmodel.currentPage).then(function(data) {
        /*jshint camelcase: false */
        tasksmodel.contents = tasksmodel.contents.concat(data.content_tasks.content_tasks);
        tasksmodel.currentPage += 1;
        if ( tasksmodel.contents.length === tasksmodel.totalItems ) {
          tasksmodel.noMoreItemsAvailable = true;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    }

    function loadMoreNotes() {
      UserService.getNotes(tasksmodel.currentPage).then(function(data) {
        /*jshint camelcase: false */
        tasksmodel.notes = tasksmodel.notes.concat(data.content_notes.content_notes);
        tasksmodel.currentPage += 1;
        if ( tasksmodel.notes.length === tasksmodel.totalItems ) {
          tasksmodel.noMoreItemsAvailable = true;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    }
  });
})();
