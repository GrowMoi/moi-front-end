(function () {
  'use strict';

  angular
    .module('moi.directives')
    .directive('gridContents', gridContents);

  function gridContents() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'templates/directives/grid-contents.html',
      scope: {
        contents: '='
      },
      controller: gridController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  function gridController($scope,
                          $http,
                          $ionicPopup,
                          ENV){

    var vm = this;
    vm.selectContent = selectContent;

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
        return content.kind !== 'enlaces' && content.kind !== 'videos';
      });
      return newContents;
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

    function learnContent(neuronId, contentId) {
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/neurons/' + neuronId + '/contents' + contentId + '/learn'
      }).then(function success(res) {
        if (res.status === 200) {
          var index = vm.contentsFilter.indexOf(vm.contentSelected);
          vm.contentsFilter.splice(index, 1);
          buildGrid(vm.contentsFilter);
        }
      }, function error(err) {
        $ionicPopup.alert({
          title: 'Ups!',
          content: 'Ha ocurrido un error'
        });
        console.error('ERR', err);
      });
    }

    // listeners
    /*if a content was learning by a user should be remove of grid*/
    $scope.$on('neuron:remove-content', function(){
      /* jshint camelcase: false */
      learnContent(vm.contentSelected.id, vm.contentSelected.neuron_id);
    });

  }

})();
