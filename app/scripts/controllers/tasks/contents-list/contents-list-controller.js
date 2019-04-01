(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('ContentsListController', function(gridParams){
    var contentsList = this;
    var gridContentsApi = null;
    contentsList.gridContentsOptions = {
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
