(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('ContentTasksController', function($scope, UserService){
    var contenttasksmodel = this;
    contenttasksmodel.noMoreItemsAvailable = true;
    contenttasksmodel.currentPage = 1;

    initData();

    contenttasksmodel.removeTask = function(content) {
      UserService.deleteTask(content).then(function(resp) {
        if(resp.status === 202){
          var contentIndex = contenttasksmodel.contents.indexOf(content);
          contenttasksmodel.contents.splice(contentIndex, 1);
        }
      });
    };

    function initData() {
      contenttasksmodel.noMoreItemsAvailable = true;
      contenttasksmodel.currentPage = 1;
      UserService.getTasks(1).then(resolveTasks);
    }

    function resolveTasks(data) {
      contenttasksmodel.currentPage += 1;
      /*jshint camelcase: false */
      contenttasksmodel.contents = data.content_tasks.content_tasks;
      /*jshint camelcase: false */
      contenttasksmodel.totalItems = data.meta.total_items;
      if(contenttasksmodel.totalItems > 4){
        contenttasksmodel.noMoreItemsAvailable = false;
        contenttasksmodel.loadMoreTasks = loadMoreTasks;
      }
    }

    function loadMoreTasks() {
      UserService.getTasks(contenttasksmodel.currentPage).then(function(data) {
        /*jshint camelcase: false */
        contenttasksmodel.contents = contenttasksmodel.contents.concat(data.content_tasks.content_tasks);
        contenttasksmodel.currentPage += 1;
        if ( contenttasksmodel.contents.length === contenttasksmodel.totalItems ) {
          contenttasksmodel.noMoreItemsAvailable = true;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    }
  });
})();
