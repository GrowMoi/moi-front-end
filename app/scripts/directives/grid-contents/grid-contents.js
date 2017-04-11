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
        options: '='
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
      vm.options.contents = filterContents(vm.options.contents);
      buildGrid(vm.options.contents);
    }

    function filterContents(contents) {
      var newContents = contents.filter(function (content) {
        return content.read === false || content.learnt === true;
      });
      var settings = orderSettings(angular.copy(vm.options.settings));
      var params = {
        maxLevel: vm.options.maxLevel,
        minLevel: vm.options.minLevel
      };
      var isValid = vadidateSettingsFormat(settings);

      if (isValid) {
        newContents = orderContents(newContents, settings, params);
      }

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

      if (angular.isFunction(vm.options.onSelect)) {
        vm.options.onSelect(vm.contentSelected);
      }
    }

    /* add content indexes based on settings user
      and then filter by index */

    function orderContents(contents, settings, params) {
      var settingsIndex = getMaxMinSettingsIndex(settings);
      var contentLearnt = filterContentsLearnt(contents, true);
      var contentNotLearnt = filterContentsLearnt(contents, false);

      var orderOptions = {
        minIndex: settingsIndex.min,
        maxIndex: settingsIndex.max,
        maxLevel: params && params.maxLevel ? params.maxLevel : 0,
        minLevel: params && params.minLevel ? params.minLevel : 0,
        startWithIndex: 0,
        contents: contentNotLearnt,
        settings: settings
      };

      var result = [];
      contentNotLearnt = orderItems(orderOptions);

      //Update options
      orderOptions.contents = contentLearnt;
      orderOptions.startWithIndex = contentNotLearnt.length;

      contentLearnt = orderItems(orderOptions);

      result = contentNotLearnt.concat(contentLearnt);

      contents = $filter('orderBy')(result, 'index');

      return contents;
    }


    function getMaxMinSettingsIndex(settings) {
      var indexInfo = {
        min: 0,
        max: 0
      };
      if (angular.isObject(settings)) {
        var settingsLength = Object.keys(settings).length;
        if (settingsLength > 0) {
          indexInfo.max = settingsLength - 1;
        }
      }
      return indexInfo;
    }

    function vadidateSettingsFormat(settings) {
      var isValidSettings = true;
      angular.forEach(settings, function (value) {
        if (!isInteger(value.level) || !isInteger(value.order)) {
          isValidSettings = false;
        }
      });
      return isValidSettings;
    }

    function isInteger(value) {
      return Number.isInteger(value);
    }

    function filterContentsLearnt(contents, learnt) {
      return contents.filter(function (content) {
        return content.learnt === learnt;
      });
    }

    function getSettingByOrder(settings, order) {
      var setting = {};
      angular.forEach(settings, function (val, key) {
        if (val.order === order) {
          setting[key] = val;
        }
      });
      return setting;
    }

    function updateLevels(settings, min, max) {
      var step = 1;
      angular.forEach(settings, function (value) {
        if (value.level === max) {
          value.level = min;
        } else {
          value.level = value.level + step;
        }
      });
    }

    function cleanContents(contents, itemsToRemove) {
      angular.forEach(itemsToRemove, function (item) {
        var index = contents.indexOf(item);
        contents.splice(index, 1);
      });
    }

    function filterContentsByLevelAndKind(contents, setting) {
      var items = contents.filter(function (content) {
        if (setting[content.kind] && (content.level === setting[content.kind].level)) {
          return true;
        }
      });

      cleanContents(contents, items);

      return items;
    }

    function addIndex(result, start) {
      angular.forEach(result, function (elem) {
        elem.index = start;
        start++;
      });
    }

    function orderItems(orderOptions) {
      var options = angular.copy(orderOptions);
      var result = [];

      while (options.contents.length > 0) {

        var settings = options.settings;
        var specificContents = [];

        for (var order = options.minIndex; order <= options.maxIndex; order++) {
          var setting = getSettingByOrder(settings, order);
          var filtered = filterContentsByLevelAndKind(options.contents, setting);
          specificContents = specificContents.concat(filtered);
        }

        result = result.concat(specificContents);

        if (options.contents.length > 0) {
          updateLevels(options.settings, options.minLevel, options.maxLevel);
        }

      }

      addIndex(result, options.startWithIndex);

      return result;
    }

    function orderSettings(settings) {
      var obj = {};
      angular.forEach(settings, function(elm){
        obj[elm.kind] = {
          order: elm.order,
          level: elm.level
        };
      });
      return obj;
    }

    function buildGrid(contents){
      vm.firstRow = contents.slice(0,2);
      vm.secondRow = contents.slice(2,5);

      if (vm.firstRow.length > 0) {
        selectContent(vm.firstRow[0]);
      }

      vm.rowsGrid = {
        'firstRow': {
          'class': 'col-first',
          'items': vm.firstRow
        },
        'secondRow': {
          'class': 'col-second',
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
        var index = vm.options.contents.indexOf(vm.contentSelected);
        vm.options.contents.splice(index, 1);
        buildGrid(vm.options.contents);
        if (response.data.perform_test) {
          TestService.goTest($scope, response.data.test);
        }
      });
    });

  }

})();
