(function () {
  'use strict';

  angular
    .module('moi.directives')
    .directive('moiButtons', moiButtons);

  function moiButtons() {
    var directive = {
      restrict: 'AE',
      replace: false,
      templateUrl: 'templates/directives/moi-buttons/moi-buttons.html',
      scope: {
        options: '='
      },
      controller: moiButtonsController,
      controllerAs: 'vm',
      bindToController: true
    };

    function moiButtonsController($state,
                                  $rootScope,
                                  AnimationService,
                                  UserService,
                                  ModalService,
                                  ContentService,
                                  StorageService,
                                  $scope,
                                  $timeout,
                                  $auth,
                                  TestService,
                                  UserNotificationsService) {
      var vm = this;

      var dialogContentModel = {
        message: 'Para aprender este concepto, aún debes superar algunos conceptos previos',
        callbacks: {
          btnRight: function(){dialogContentModel.closeModal();},
          btnLeft: modalCallbak
        },
        labels: {
          btnRight: 'Seguir leyendo',
          btnLeft: 'Regresar a mi arbol'
        }
      };

      var idleBtns = [],
          btnActive = '',
          timeoutPromise = null,
          emitters = {
            finishedAnimation: null
          };

      /*jshint camelcase: false */
      function init(){
        var options = vm.options || {};
        vm.neuron = options.neuron || {};
        vm.content = options.content || {};
        vm.buttons = options.buttons || {};
        vm.readOnly = !!options.readOnly;
        vm.showModalAction = showModalAction;
        vm.emptyContent = (Object.keys(vm.content).length === 0);
        vm.emptyNeuron = (Object.keys(vm.neuron).length === 0);
        vm.shareCallback = options.shareCallback;
        vm.externalAnimationIdle = !!vm.options.externalAnimationIdle;
        vm.totalNotifications = UserNotificationsService.totalNotifications +
                                UserNotificationsService.totalRecommendations;

        if (vm.content.read === undefined) {
          vm.gifLearnActive = false;
        }else{
          vm.gifLearnActive = !vm.content.read;
        }

        if (vm.options.onRegisterApi) {
          var api = createPublicApi();
          vm.options.onRegisterApi(api);
        }

        //idle Animations
        idleBtns = idleBtnsActive(vm.buttons);
        vm.activeIdle = false;

        getButtons();
      }

      init();

      //Api
      function createPublicApi() {
        return {
          contentSelected: contentSelected,
          activeAnimation: activeAnimation,
          finishedAnimation: finishedAnimation
        };
      }

      function finishedAnimation(cb){
        emitters.finishedAnimation = cb;
      }

      function activeAnimation() {
        loopAnimations();
      }
      //end Api

      function idleBtnsActive(buttons) {
        var btns = ['search', 'recomendation', 'learn']; //TODO: change to constants
        var activeBtns = btns.filter(function(btn){
          if (buttons[btn]) {
            return btn;
          }
        });
        return activeBtns;
      }

      function contentSelected(content) {
        vm.gifLearnActive = !content.read;
        vm.content = content;
      }

      function getButtons() {
        vm.searchOptions = AnimationService.getButton({
          key: 'search',
          readOnly: vm.readOnly,
          callbacks: {
            onClickReadOnly: showNotificationModal,
            finishedAnimation: finishedAnimationSearch
          }
        });

        vm.recomendationOptions = AnimationService.getButton({
          key: 'recomendation',
          readOnly: vm.readOnly,
          callbacks: {
            onClickReadOnly: showNotificationModal,
            finishedAnimation: finishedAnimationRecomendation
          }
        });

        vm.learnOptions = AnimationService.getButton({
          key: 'learn',
          readOnly: vm.readOnly,
          callbacks: {
            onClickReadOnly: showNotificationModal,
            finishedAnimation: finishedAnimationRead
          }
        });

        vm.shareOptions = AnimationService.getButton({
          key: 'share',
          readOnly: vm.readOnly,
          callbacks: {
            onClickReadOnly: showNotificationModal,
            finishedAnimation: vm.shareCallback
          }
        });

        vm.saveTasksOptions = AnimationService.getButton({
          key: 'saveTasks',
          readOnly: vm.readOnly,
          callbacks: {
            onClickReadOnly: showNotificationModal,
            finishedAnimation: finishedAnimationsaveTasks
          }
        });

        vm.showTasksOptions = AnimationService.getButton({
          key: 'showTasks',
          readOnly: vm.readOnly,
          callbacks: {
            onClickReadOnly: showNotificationModal,
            finishedAnimation: finishedAnimationShowTasks
          }
        });

        vm.addFavoritesOptions = AnimationService.getButton({
          key: 'addFavorites',
          readOnly: vm.readOnly,
          callbacks: {
            onClickReadOnly: showNotificationModal,
            finishedAnimation: finishedAnimationAddFavorites
          }
        });

        //idle Animations

        vm.searchIdleOptions = AnimationService.getButton({
          key: 'searchIdle',
          readOnly: vm.readOnly,
          callbacks: {
            onClickReadOnly: showNotificationModal,
            finishedAnimation: function(){
              animateNextBtn();
            }
          }
        });

        vm.recomendationIdleOptions = AnimationService.getButton({
          key: 'recomendationIdle',
          readOnly: vm.readOnly,
          callbacks: {
            onClickReadOnly: showNotificationModal,
            finishedAnimation: function(){
              animateNextBtn();
            }
          }
        });

        vm.learnIdleOptions = AnimationService.getButton({
          key: 'learnIdle',
          readOnly: vm.readOnly,
          callbacks: {
            onClickReadOnly: showNotificationModal,
            finishedAnimation: function(){
              animateNextBtn();
            }
          }
        });
      }

      function animateNextBtn() {
        if (vm.externalAnimationIdle) {
          emitters.finishedAnimation();
        }else{
          timeoutPromise = $timeout(function(){
            timeoutPromise = null;
            loopAnimations();
          }, 3000);
        }
      }

      function loopAnimations() {
        var btn = randomActiveBtn(idleBtns, btnActive);
        $scope.$apply(function() {
          vm.activateBtn = btn;
          btnActive = vm.activateBtn;
        });
      }

      function randomActiveBtn(elements, btn) {
        var size = elements.length;
        if (size !== 1) {
          var num = randomElement(elements);
          return (elements[num] === btn) ? randomActiveBtn(elements, btn) : elements[num];
        }else{
          return btn;
        }
      }

      function randomElement(arrayElements) {
        return Math.floor(Math.random() * arrayElements.length);
      }

      //callbacks functions

      function finishedAnimationSearch() {
        $state.go('searches');
      }

      function finishedAnimationRead() {
        ContentService.readContent(vm.content).then(function(response){
          var data = response.data,
              page = $state.current.name;
          if (page === 'neuron') {
            $rootScope.$broadcast('neuron:remove-content');
          }
          if (data.perform_test) {
            TestService.goTest($scope, data.test);
          }
          if (page === 'content' && !data.perform_test) {
            StorageService.get().then(function(resp) {
              var storage = resp.data.storage;
              storage.content = {'advices': ['advice0']};
              StorageService.update(storage);
            });
            $state.go('neuron', {
              neuronId: vm.content.neuron_id
            });
          }
        });
      }

      function finishedAnimationsaveTasks() {
        UserService.addTasks(vm.content).then(function(response) {
          if(response.data.exist){
            dialogContentModel = {
              message: 'Este contenido ya esta en tus tareas, intenta guardar un contenido diferente.',
              callbacks: {
                btnCenter: function(){dialogContentModel.closeModal();}
              },
              labels: {
                btnCenter: 'Seguir leyendo'
              }
            };
            showModal();
          }else if ($state.current.name === 'content') {
            $state.go('neuron', {
              neuronId: vm.content.neuron_id
            });
          }
        });
      }

      function finishedAnimationAddFavorites() {
        UserService.addFavorites(vm.content).then(function(response) {
          vm.content.favorite = response.data.favorite;
        });
      }

      function finishedAnimationRecomendation() {
        var id = $state.params.neuronId;
        UserService.recommendedNeuron(id);
      }

      function finishedAnimationShowTasks() {
        if(vm.showTasksOptions.totalNotifications){
          $state.go('tasks.notifications');
        }else{
          $state.go('tasks.notes');
        }
      }

      function showModal() {
        var dialogOptions = {
          templateUrl: 'templates/partials/modal-alert-content.html',
          model: dialogContentModel
        };
        ModalService.showModel(dialogOptions);
      }

      function showNotificationModal() {
        var dialogOptions = {
          templateUrl: 'templates/partials/modal-notification-join-app.html',
          model: dialogContentModel
        };
        ModalService.showModel(dialogOptions);
      }

      function modalCallbak() {
        dialogContentModel.closeModal();
        $state.go('tree', {
          username: $auth.user.username,
          neuronId: vm.neuron.neuron_id || vm.neuron.id
        });
      }

      function showModalAction() {
        if (vm.readOnly) {
          showNotificationModal();
        }else if (!vm.neuron.can_read){
          showModal();
        }
      }

      $scope.$on('IdleStart', function() {
        vm.activeIdle = true;
        if (!vm.externalAnimationIdle) {
          vm.activateBtn = randomActiveBtn(idleBtns, btnActive);
          btnActive = vm.activateBtn;
        }
      });

      $scope.$on('IdleEnd', function() {
        //reset flags
        vm.activeIdle = false;
        vm.activateBtn = '';
        $timeout.cancel(timeoutPromise);
        timeoutPromise = null;
      });

      $rootScope.$on('notifications.updateCount', function(){
        vm.totalNotifications = UserNotificationsService.totalNotifications +
                                UserNotificationsService.totalRecommendationContents;
      });
    }

    return directive;
  }
})();
