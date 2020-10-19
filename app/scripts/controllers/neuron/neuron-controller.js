(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('NeuronController',
    function (data,
              $scope,
              $timeout,
              $auth,
              SocialService,
              dataInventory,
              ModalService,
              EventsService) {

    var vmNeuron = this,
        ApiButtons = null,
        ApiContent = null,
        timeoutPromise = null,
        currentUser = $auth.user || {},
        $backgroundSound = null,
        isLoadingEvents = false;
    vmNeuron.frameOptions = {
      type: 'content_max'
    };
    vmNeuron.userAchievements = dataInventory && dataInventory.achievements ? dataInventory.achievements : [];

    /*jshint camelcase: false */
    function init(){
      vmNeuron.neuron = data;
      var showNeuronVideo = (localStorage.getItem('neuronVideo') !== 'true') && vmNeuron.neuron && vmNeuron.neuron.video;
      if (showNeuronVideo) {
        vmNeuron.neuron.video = changeLinkProtocol(vmNeuron.neuron.video);
        showVideoModal(vmNeuron.neuron.video);
      }
      vmNeuron.buttonsOptions = {
        neuron: vmNeuron.neuron,
        content: vmNeuron.neuron.contents[0],
        readOnly: vmNeuron.neuron.read_only,
        onRegisterApi: onRegisterApiMoiButtons,
        externalAnimationIdle: true,
        buttons: {
          learn: true,
          search: true,
          share: true,
          recomendation: true,
          saveTask: true,
          showTasks: true,
          addFavorites: true
        },
        shareCallback: shareNeuron
      };

      vmNeuron.contentsOptions = {
        readOnly: !!vmNeuron.neuron.read_only,
        contents: vmNeuron.neuron.contents,
        settings: currentUser.content_preferences,
        maxLevel: 3,
        minLevel: 1,
        onSelect: onSelectItem,
        externalAnimationIdle: true,
        onRegisterApi: onRegisterApiContents,
        //set default theme
        theme:'moi_verde',
        isMoitheme: true
      };
    }

    init();
    setTheme();

    function onRegisterApiMoiButtons(api) {
      ApiButtons = api;
      ApiButtons.finishedAnimation(function () {
        activeAnimation(ApiContent);
      });
    }

    function onRegisterApiContents(api) {
      ApiContent = api;
      ApiContent.finishedAnimation(function () {
        activeAnimation(ApiButtons);
      });
    }

    function activeAnimation(api) {
      if (!timeoutPromise) {
        timeoutPromise = $timeout(function(){
          timeoutPromise = null;
          if (api && api.activeAnimation) {
            api.activeAnimation();
          }
        }, 3000);
      }
    }

    function onSelectItem(content) {
      //update content on Init
      vmNeuron.buttonsOptions.content = content;
      if (ApiButtons) {
        ApiButtons.contentSelected(content);
      }
    }

    $scope.$on('IdleStart', function() {
      ApiContent.activeAnimation();
    });

    $scope.$on('IdleEnd', function() {
      $timeout.cancel(timeoutPromise);
      timeoutPromise = null;
    });

    function shareNeuron() {
      var data = {
        title: vmNeuron.neuron.contents[0].title,
        media: vmNeuron.neuron.contents[0].media[0],
        description: vmNeuron.neuron.contents[0].description
      };
      SocialService.showModal(data);
    }

    function setTheme() {
      var currentAchievement = vmNeuron.userAchievements.filter(function(achievement) {
        return achievement.active && achievement.rewards && achievement.rewards.theme;
      });

      if (currentAchievement[0]) {
        var currentTheme = currentAchievement[0].rewards.theme;
        vmNeuron.contentsOptions.theme = currentTheme;
        vmNeuron.contentsOptions.isMoitheme = currentTheme && currentTheme.includes('moi');
      }
    }

    function showVideoModal(url) {
      var modelData = {
          isImage: false,
          contentSrc: url,
          isEmbedVideo: false,
          shown: function() {
            $backgroundSound = angular.element(document.querySelector('#backgroundSound'));
            $backgroundSound[0].pause();
          }
        },
        modalOptionsConfig = {
          parentScope: $scope,
          templateUrl: 'templates/partials/modal-image.html',
          model: modelData,
          onHide: onHideModalVideo
        };
      ModalService.showModel(modalOptionsConfig);
    }

    function changeLinkProtocol(link) {
      var isVideoFromCloudinary = link.includes('cloudinary.com');
      return isVideoFromCloudinary ? link.replace(/^http:\/\//i, 'https://') : link;
    }

    function onHideModalVideo() {
      if ($backgroundSound) {
        $backgroundSound[0].play();
      }
      localStorage.setItem('neuronVideo', 'true');
      //load daily events
      if(!isLoadingEvents && !localStorage.getItem('seenDailyEvents')){
        showEventsModal();
      }
    }

    function showEventsModal() {
      isLoadingEvents = true;
      EventsService.showDailyEvents().then(function(resp){
        if(resp && (resp.events.length > 0 || resp.superevent.length > 0)){
          EventsService.showSetEvents(resp.events, resp.superevent);
          localStorage.setItem('seenDailyEvents', true);
          isLoadingEvents = false;
        }
      });
    }
  });
})();
