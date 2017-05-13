(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('TasksController', function($scope, UserService){
    var tasksmodel = this;
    tasksmodel.noMoreItemsAvailable = true;
    tasksmodel.currentPage = 1;
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

    tasksmodel.removeTask = function(content) {
      UserService.deleteTask(content).then(function(resp) {
        if(resp.status === 202){
          var contentIndex = tasksmodel.contents.indexOf(content);
          tasksmodel.contents.splice(contentIndex, 1);
        }
      });
    };

    function initData() {
      UserService.getTasks(1).then(function(data) {
        tasksmodel.currentPage += 1;
        /*jshint camelcase: false */
        tasksmodel.contents = data.content_tasks.content_tasks;
        /*jshint camelcase: false */
        tasksmodel.totalItems = data.meta.total_items;
        if(tasksmodel.totalItems > 4){
          tasksmodel.noMoreItemsAvailable = false;
          tasksmodel.loadMore = loadMore;
        }
      });
    }

    function loadMore() {
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

  });
})();
