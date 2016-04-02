(function () {
  'use strict';

  angular
    .module('moi.directives')
    .directive('gridContents', gridContents);

  function gridContents() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'templates/directives/grid-contents/grid-contents.html',
      scope: {
        contents: '=',
        settings: '='
      },
      controller: gridController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  function gridController($scope,
                          $http,
                          $state,
                          $filter,
                          ContentService){

    var vm = this;
    vm.selectContent = selectContent;
    vm.sendContent = sendContent;

    init();

    function init(){
      vm.contentsFilter = filterContents(vm.contents);
      buildGrid(vm.contentsFilter);
    }

    function selectContent(content) {
      /*remove class last selected content*/
      if (vm.contentSelected) {
        vm.contentSelected.isSelected = false;
      }
      /*save scope content*/
      vm.contentSelected = content;
      /*add class new content selected*/
      content.isSelected = true;
    }

    function filterContents(contents){
      var newContents = contents.filter(function(content){
        return content.learnt === false;
      });
      newContents = orderContents(newContents);
      return newContents;
    }

    /* add content indexes based on settings user
      and then filter by index */

    function orderContents(contents){
      var kinds = ['que-es', 'como-funciona', 'por-que-es', 'quien-cuando-donde'];
      angular.forEach(contents, function(content){
        var position = kinds.indexOf(content.kind);
        if (vm.settings[position].level === content.level){
          content.index = position;
        }else{
          content.index = parseInt('' + (position + 1) + content.level);
        }
      });
      contents = $filter('orderBy')(contents, 'index');
      return contents;
    }

    function buildGrid(contents){
      vm.firstRow = contents.slice(0,2);
      vm.secondRow = contents.slice(2,5);

      if (vm.firstRow.length > 0) {
        selectContent(vm.firstRow[0]);
      }

      vm.rowsGrid = {
        'firstRow': {
          'class': 'col-50',
          'items': vm.firstRow
        },
        'secondRow': {
          'class': 'col-33',
          'items': vm.secondRow
        }
      };
    }

    function sendContent(neuronId, contentId){
      $state.go('content', {neuronId: neuronId,contentId: contentId});
    }
    // listeners

    /*if a content was learning by a user should be remove of grid*/
    $scope.$on('neuron:remove-content', function(){
      ContentService.learnContent(vm.contentSelected).then(function(){
        var index = vm.contentsFilter.indexOf(vm.contentSelected);
        vm.contentsFilter.splice(index, 1);
        buildGrid(vm.contentsFilter);
      });
    });

  }

})();
