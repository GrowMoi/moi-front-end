(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('EventsController', function(gridParams){
    var eventsModel = this;
    var gridContentsApi = null;

    eventsModel.gridContentsOptions = {
      disabledInfiniteScroll: true,
      itemsPerPage: 4,
      showDeleteIcon: gridParams.showDeleteIcon,
      onRegisterApi: onRegisterApi,
      apiCallHandler: gridParams.apiCallHandler,
      promiseDataAccessor: gridParams.promiseDataAccessor
    };

    function onRegisterApi(api) {
      gridContentsApi = api;

      gridContentsApi.onSelectDelete(function (content, contents) {
        gridParams.onSelectDelete(content, contents);
      });
    }

  });
})();
