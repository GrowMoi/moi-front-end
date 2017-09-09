(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('ContentsListController', function($scope, $state, UserService){
    var contentsList = this;
    contentsList.noMoreItemsAvailable = true;
    contentsList.currentPage = 1;
    contentsList.isFavorites = $state.current.name === 'tasks.favorites';

    initData();

    contentsList.removeItem = function(content) {
      UserService.deleteTask(content).then(function(resp) {
        if(resp.status === 202){
          var contentIndex = contentsList.contents.indexOf(content);
          contentsList.contents.splice(contentIndex, 1);
        }
      });
    };

    function initData() {
      contentsList.noMoreItemsAvailable = true;
      contentsList.currentPage = 1;
      if(contentsList.isFavorites){
        UserService.getFavorites(1).then(resolveContents);
      }else{
        UserService.getTasks(1).then(resolveContents);
      }
    }

    function resolveContents(data) {
      contentsList.currentPage += 1;
      /*jshint camelcase: false */
      contentsList.contents = data.content_tasks.content_tasks;
      /*jshint camelcase: false */
      contentsList.totalItems = data.meta.total_items;
      if(contentsList.totalItems > 4){
        contentsList.noMoreItemsAvailable = false;
        contentsList.loadMoreItems = loadMoreItems;
      }
    }

    function loadMoreItems() {
      if(contentsList.isFavorites){
        UserService.getFavorites(contentsList.currentPage).then(getMoreItems);
      }else{
        UserService.getTasks(contentsList.currentPage).then(getMoreItems);
      }
    }

    function getMoreItems(data){
      /*jshint camelcase: false */
      contentsList.contents = contentsList.contents.concat(data.content_tasks.content_tasks);
      contentsList.currentPage += 1;
      if ( contentsList.contents.length === contentsList.totalItems ) {
        contentsList.noMoreItemsAvailable = true;
      }
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }
  });
})();
