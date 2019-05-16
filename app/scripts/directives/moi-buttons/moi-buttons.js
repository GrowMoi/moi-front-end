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
                                  $scope,
                                  $timeout,
                                  $auth,
                                  TestService,
                                  StorageService,
                                  UserNotificationsService,
                                  GAService) {
      var vm = this;
      var language = $auth.user.language;
      var messageModal = language === 'es' ? 'Para aprender este concepto, aún debes superar algunos conceptos previos' : 'To learn this concept, you still have to overcome some previous concepts';
      var lblbtnRight = language === 'es' ? 'Seguir Leyendo' : 'Keep reading';
      var lblbtnLeft = language === 'es' ? 'Regresar a mi arbol' : 'Back to tree';
      var dialogContentModel = {
        message: messageModal,
        callbacks: {
          btnRight: function(){dialogContentModel.closeModal();},
          btnLeft: modalCallbak
        },
        labels: {
          btnRight: lblbtnRight,
          btnLeft: lblbtnLeft
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
        vm.neuron.neuron_can_read = (vm.neuron.belongs_to_event) ? vm.neuron.belongs_to_event : vm.neuron.neuron_can_read;
        vm.content = options.content || {};
        vm.buttons = options.buttons || {};
        vm.readOnly = !!options.readOnly;
        vm.showModalAction = showModalAction;
        vm.emptyContent = (Object.keys(vm.content).length === 0);
        vm.emptyNeuron = (Object.keys(vm.neuron).length === 0);
        vm.shareCallback = options.shareCallback;
        vm.externalAnimationIdle = !!vm.options.externalAnimationIdle;
        vm.totalNotifications = UserNotificationsService.totalNotifications +
                                UserNotificationsService.totalRecommendations +
                                UserNotificationsService.totalContentEvents;

        if (vm.content.read === undefined) {
          vm.gifLearnActive = (vm.neuron.belongs_to_event) ? vm.neuron.belongs_to_event : false;
        }else{
          vm.gifLearnActive = (vm.neuron.belongs_to_event) ? vm.neuron.belongs_to_event : !vm.content.read;
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
        GAService.track('send', 'event', 'Ir a sección Buscar', 'Click');
        $state.go('searches');
      }

      function finishedAnimationRead() {
        GAService.track('send', 'event', 'Aprender contenido '+ vm.content.title, 'Click');
        ContentService.readContent(vm.content).then(function(response){
          var data = response.data,
              page = $state.current.name;
          if (page === 'neuron') {
            $rootScope.$broadcast('neuron:remove-content');
          }
          if (data.perform_test) {
            TestService.goTest($scope, data.test);
          }

          if(vm.content.belongs_to_event){
            updateEventsCounter();
            $state.go('tasks.events');
          }else if (page === 'content' && !data.perform_test) {
            $state.go('neuron', {
              neuronId: vm.content.neuron_id
            });
          }
        });
      }

      function updateEventsCounter(){
        UserNotificationsService.totalContentEvents--;
        $rootScope.$broadcast('notifications.updateCount');
      }

      function finishedAnimationsaveTasks() {
        GAService.track('send', 'event', 'Guardar tarea', 'Click');
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
        GAService.track('send', 'event', 'Ir a sección Buscar', 'Click');
        UserService.addFavorites(vm.content).then(function(response) {
          vm.content.favorite = response.data.favorite;
        });
      }

      function finishedAnimationRecomendation() {
        GAService.track('send', 'event', 'Generar recomendación aleatoria', 'Click');
        var id = $state.params.neuronId;
        UserService.recommendedNeuron(id);
      }

      function finishedAnimationShowTasks() {
        GAService.track('send', 'event', 'Mostrar tareas', 'Click');
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
        var templateModal = 'templates/partials/modal-notification-join-app.html';
        var dialogOptions = {
          templateUrl: templateModal,
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
                                UserNotificationsService.totalRecommendations +
                                UserNotificationsService.totalContentEvents;
      });
    }

    return directive;
  }
})();
