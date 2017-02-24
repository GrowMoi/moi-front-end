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
                          ContentService,
                          TestService){

    var vm = this;
    vm.selectContent = selectContent;
    vm.sendContent = sendContent;

    init();

    function init(){
      vm.contents = filterContents(vm.contents);
      buildGrid(vm.contents);
    }

    function filterContents(contents) {
      var newContents = contents.filter(function (content) {
        return content.read === false || content.learnt === true;
      });
      newContents = orderContents(newContents);
      return newContents;
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

      if (vm.settings && angular.isFunction(vm.settings.onSelect)) {
        vm.settings.onSelect(vm.contentSelected);
      }
    }

    /* add content indexes based on settings user
      and then filter by index */

    function orderContents(contents){
      var kinds = ['que-es', 'como-funciona', 'por-que-es', 'quien-cuando-donde'];
      angular.forEach(contents, function(content){
        var position = kinds.indexOf(content.kind);
        if (parseInt(vm.settings[position].level) === content.level){
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

    /*if a content was reading by a user should be remove of grid*/
    $scope.$on('neuron:remove-content', function(){
      ContentService.readContent(vm.contentSelected).then(function(response){
        /*jshint camelcase: false */
        var index = vm.contents.indexOf(vm.contentSelected);
        vm.contents.splice(index, 1);
        buildGrid(vm.contents);
        if (response.data.perform_test) {
          TestService.goTest($scope, response.data.test);
        }
      });
    });

  }

})();
