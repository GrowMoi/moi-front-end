(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('NotesController', function($scope, UserService){
    var notesmodel = this;
    notesmodel.noMoreItemsAvailable = true;
    notesmodel.currentPage = 1;

    initData();

    function initData() {
      notesmodel.noMoreItemsAvailable = true;
      notesmodel.currentPage = 1;
      UserService.getNotes(1).then(resolveNotes);
    }

    function resolveNotes(data) {
      notesmodel.currentPage += 1;
      /*jshint camelcase: false */
      notesmodel.notes = data.content_notes.content_notes;
      /*jshint camelcase: false */
      notesmodel.totalItems = data.meta.total_items;
      if(notesmodel.totalItems > 2){
        notesmodel.noMoreItemsAvailable = false;
        notesmodel.loadMoreNotes = loadMoreNotes;
      }
    }

    function loadMoreNotes() {
      UserService.getNotes(notesmodel.currentPage).then(function(data) {
        /*jshint camelcase: false */
        notesmodel.notes = notesmodel.notes.concat(data.content_notes.content_notes);
        notesmodel.currentPage += 1;
        if ( notesmodel.notes.length === notesmodel.totalItems ) {
          notesmodel.noMoreItemsAvailable = true;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    }
  });
})();
