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
                          AnimationService,
                          MoiAnimationService,
                          GAService){

    var vm = this,
        indexContentActiveIdle = 0,
        arrayElements = [],
        emitters = {
          finishedAnimation: null
        };

    vm.selectContent = selectContent;
    vm.sendContent = sendContent;
    vm.activeIdle = false;
    vm.increaseSize = MoiAnimationService.increaseSize;
    vm.cssOptions = {
      scale: '1.02',
      styles: []
    };

    init();

    function init(){
      vm.options.contents = vm.options.readOnly ? vm.options.contents : filterContents(vm.options.contents);
      vm.externalAnimationIdle = !!vm.options.externalAnimationIdle;
      buildGrid(vm.options.contents);

      if (vm.options.onRegisterApi) {
        var api = createPublicApi();
        vm.options.onRegisterApi(api);
      }
    }

    // Api
    function createPublicApi() {
      return {
        activeAnimation: activeAnimation,
        finishedAnimation: finishedAnimation
      };
    }

    function finishedAnimation(cb){
      emitters.finishedAnimation = cb;
    }

    function activeAnimation() {
      if (arrayElements.length === 0) {
        emitters.finishedAnimation();
        return;
      }
      if (arrayElements.length === 1) {
        $scope.$apply(function() {
          vm.contentsShown[indexContentActiveIdle].animated = true; //init
        });
      } else {
        loopAnimations();
      }
    }
    // end Api

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
      var filterContents = filterContentsLearntAndNotLearnt(contents);
      var contentLearnt = filterContents.learnt;
      var contentNotLearnt = filterContents.notLearnt;

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

    function filterContentsLearntAndNotLearnt(contents) {
      var learnt = [],
          notLearnt = [];
      angular.forEach(contents, function(elm){
        if (elm.learnt) {
          learnt.push(elm);
        }else{
          notLearnt.push(elm);
        }
      });
      return {
        learnt: learnt,
        notLearnt: notLearnt
      };
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

    function buildGrid(contents, withAnimation){
      var copyContents = angular.copy(contents),
          firstColumn = copyContents.slice(0,1),
          secondColumn = copyContents.slice(1,3);

      if (firstColumn.length > 0) {
        selectContent(firstColumn[0]);
      }

      if(withAnimation){
        animateContentBox(firstColumn, secondColumn);
      }else {
        initGrid(firstColumn, secondColumn);
      }
    }

    function sendContent(content){
      GAService.track('send', 'event', 'Abrir contenido desde recomendaciones ' + content.title, 'Click');
      $state.go('content', {neuronId: content.neuron_id, contentId: content.id});// jshint ignore:line
    }

    function animateContentBox(firstColumn, secondColumn) {
      var $contentGridElement = document.querySelector('.content-selected');
      var $contentBorderlement = $contentGridElement.parent().children()[0];
      MoiAnimationService.animateWidget($contentBorderlement, 'zoomOutDown');
      MoiAnimationService.animateWidget($contentGridElement, 'zoomOutDown').then(function(){
        initGrid(firstColumn, secondColumn);
      });
    }

    function initGrid(firstColumn, secondColumn) {
      vm.rowsGrid = {
        'firstColumn': {
          'class': 'col-first',
          'items': firstColumn
        },
        'secondColumn': {
          'class': 'col-second',
          'items': secondColumn
        }
      };
      vm.contentsShown = firstColumn.concat(secondColumn);
      arrayElements = Array(vm.contentsShown.length);// jshint ignore:line
    }

    // listeners

    /*if a content was reading by a user should be remove of grid*/
    $scope.$on('neuron:remove-content', removeContentGrid);

    function removeContentGrid() {
      /*jshint camelcase: false */
      var index = getIndex(vm.options.contents, vm.contentSelected);
      vm.options.contents.splice(index, 1);
      buildGrid(vm.options.contents, true);
    }

    function getIndex(contents, selectContent){
      var indexFound = 0;
      angular.forEach(contents, function(content, index){
        if (content.id === selectContent.id) {
          indexFound = index;
        }
      });
      return indexFound;
    }

    ///idle Animations

    vm.overlayOptions = AnimationService.getButton({
      key: 'overlay',
      callbacks: {
        finishedAnimation: function(){
          if (vm.externalAnimationIdle) {
            if (arrayElements.length === 1) {
              $scope.$apply(function() {
                vm.contentsShown[indexContentActiveIdle].animated = false; //reset
              });
            }
            emitters.finishedAnimation();
          }else{
            loopAnimations();
          }
        }
      }
    });

    function loopAnimations() {
      var num = randomActiveContent(arrayElements, indexContentActiveIdle);
      $scope.$apply(function() {
        vm.contentsShown[indexContentActiveIdle].animated = false;
        vm.contentsShown[num].animated = true;
        indexContentActiveIdle = num;
      });
    }

    function randomActiveContent(elements, index) {
      var size = elements.length;
      if (size !== 1) {
        var num = randomElement(elements);
        return (num === index) ? randomActiveContent(elements, index) : num;
      }else{
        return index;
      }
    }

    function randomElement(arrayElements) {
      return Math.floor(Math.random() * arrayElements.length);
    }

    function runOrCancelAnimation(active) {
      vm.activeIdle = active;
      if (!vm.externalAnimationIdle) {
        vm.contentsShown[indexContentActiveIdle].animated = active;
      }
    }

    $scope.$on('IdleStart', function() {
      runOrCancelAnimation(true);
    });

    $scope.$on('IdleEnd', function() {
      runOrCancelAnimation(false);
    });

  }

})();
