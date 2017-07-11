(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('FavoritesController', function($scope, UserService){
    var contentFavoritesModel = this;
    contentFavoritesModel.noMoreItemsAvailable = true;
    contentFavoritesModel.currentPage = 1;

    initData();

    function initData() {
      contentFavoritesModel.noMoreItemsAvailable = true;
      contentFavoritesModel.currentPage = 1;
      UserService.getFavorites(1).then(resolveFavorites);
    }

    function resolveFavorites(data) {
      contentFavoritesModel.currentPage += 1;
      /*jshint camelcase: false */
      contentFavoritesModel.contents = data.content_tasks.content_tasks;
      /*jshint camelcase: false */
      contentFavoritesModel.totalItems = data.meta.total_items;
      if(contentFavoritesModel.totalItems > 4){
        contentFavoritesModel.noMoreItemsAvailable = false;
        contentFavoritesModel.loadMoreTasks = loadMoreTasks;
      }
    }

    function loadMoreTasks() {
      UserService.getFavorites(contentFavoritesModel.currentPage).then(function(data) {
        /*jshint camelcase: false */
        contentFavoritesModel.contents = contentFavoritesModel.contents.concat(data.content_tasks.content_tasks);
        contentFavoritesModel.currentPage += 1;
        if ( contentFavoritesModel.contents.length === contentFavoritesModel.totalItems ) {
          contentFavoritesModel.noMoreItemsAvailable = true;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    }
  });
})();
