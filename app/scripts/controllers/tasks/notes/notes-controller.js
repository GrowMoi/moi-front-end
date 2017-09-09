(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('NotesController', function($scope, UserService){
    var notesModel = this;
    notesModel.noMoreItemsAvailable = true;
    notesModel.currentPage = 1;

    initData();

    function initData() {
      notesModel.noMoreItemsAvailable = true;
      notesModel.currentPage = 1;
      UserService.getNotes(1).then(resolveNotes);
    }

    function resolveNotes(data) {
      notesModel.currentPage += 1;
      /*jshint camelcase: false */
      notesModel.notes = data.content_notes.content_notes;
      /*jshint camelcase: false */
      notesModel.totalItems = data.meta.total_items;
      if(notesModel.totalItems > 2){
        notesModel.noMoreItemsAvailable = false;
        notesModel.loadMoreNotes = loadMoreNotes;
      }
    }

    function loadMoreNotes() {
      UserService.getNotes(notesModel.currentPage).then(function(data) {
        /*jshint camelcase: false */
        notesModel.notes = notesModel.notes.concat(data.content_notes.content_notes);
        notesModel.currentPage += 1;
        if ( notesModel.notes.length === notesModel.totalItems ) {
          notesModel.noMoreItemsAvailable = true;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    }
  });
})();
