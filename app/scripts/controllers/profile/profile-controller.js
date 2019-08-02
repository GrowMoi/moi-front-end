(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('ProfileController', function (user,
                                            certificates,
                                            $auth,
                                            $ionicPopup,
                                            $stateParams,
                                            $state,
                                            $scope,
                                            $window,
                                            ModalService,
                                            UserService,
                                            SocialService,
                                            myEvents,
                                            GAService,
                                            LeaderboardService) {

    var vmProfile = this,
        currentUser = $auth.user;
    var language = $auth.user.language;
    vmProfile.paramsToLeaderboard = {
      user_id: user.id //jshint ignore:line
    };
    vmProfile.user = user;
    vmProfile.user.tree_image = vmProfile.user.tree_image || 'images/default-tree.png'; //jshint ignore:line
    vmProfile.myEvents = myEvents;
    vmProfile.imageUser = vmProfile.user.image || 'images/edit-profile/userphoto.png';
    vmProfile.isCurrentUser = user.id === currentUser.id;
    vmProfile.showLeaderboard = LeaderboardService.showLeaderboard;
    vmProfile.showEventsboard = showEventsboard;
    vmProfile.logout = logout;
    vmProfile.certificates = certificates.certificates;
    vmProfile.showCertificate = showCertificate;
    vmProfile.removeCertificate = UserService.deleteCertificate;
    vmProfile.noMoreItemsAvailable = true;
    vmProfile.currentPage = 2;
    vmProfile.page = 1;
    vmProfile.resultsPerPage = 10;
    vmProfile.enableInfiniteScroll = false;
    vmProfile.frameOptions = {
      type: 'content_max',
      showBackButton: true
    };
    vmProfile.buttonsOptions = {
      neuron: {},
      content: {},
      readOnly: currentUser.id ? false : true,
      buttons: {
        search: true,
        share: true,
        recomendation: true,
        showTasks: true
      },
      shareCallback: shareProfile
    };
    vmProfile.tabs = language === 'es' ?
    [
      {
        field:'lasts-contents',
        name: 'Ultimos 4',
        partial: 'templates/profile/partials/lasts-contents.html',
        selected: false
      },
      {
        field:'awards',
        name: 'Logros',
        partial: 'templates/profile/partials/awards.html',
        selected: false
      },
      {
        field:'certificates',
        name: 'Premios',
        partial: 'templates/profile/partials/certificates.html',
        selected: false
      }
    ]:
    [
      {
        field:'lasts-contents',
        name: 'Last 4',
        partial: 'templates/profile/partials/lasts-contents.html',
        selected: false
      },
      {
        field:'awards',
        name: 'Awards',
        partial: 'templates/profile/partials/awards.html',
        selected: false
      },
      {
        field:'certificates',
        name: 'Certificates',
        partial: 'templates/profile/partials/certificates.html',
        selected: false
      }
    ];
    vmProfile.goToTree = goToTree;
    vmProfile.changeTab = function(field) {
      angular.forEach(vmProfile.tabs, function(tab) {
        if(tab.field === field){
          tab.selected = true;
          vmProfile.viewSelected = tab.partial;
        }else{
          tab.selected = false;
        }
      });
    };

    init();
    initTab();

    function init() {
      /*jshint camelcase: false */
      vmProfile.totalItems = certificates.meta.total_items;
      if(vmProfile.totalItems > 2){
        vmProfile.noMoreItemsAvailable = false;
        vmProfile.loadMoreCertificates = loadMoreCertificates;
      }
    }

    function initTab() {
      var defaultTab = $stateParams.defaultTab || 'lasts-contents';
      vmProfile.changeTab(defaultTab);
    }

    function showEventsboard(){
      var dialogEventsOpts = {
        templateUrl: 'templates/partials/modal-show-events-completed.html',
        model: {
          events: vmProfile.myEvents.events
        }
      };
      ModalService.showModel(dialogEventsOpts);
    }

    function logout(){
      GAService.track('set', 'userId', null);
      GAService.track('set', 'dimension1', user.id);
      $window.localStorage.clear();
      $window.location='/';
    }

    function shareProfile() {
      var data = language === 'es' ?
      {
        title: 'Mira todos mis avances en mi perfil Moi',
        description: 'Conoce todo mi progreso y empieza a crecer tú también con Moi Aprendizaje Social'
      } :
      {
        title: 'See all my progress in my profile Moi',
        description: 'Know all my progress and start to grow you too with Moi Social Learning'
      };
      SocialService.showModal(data);
    }

    function showCertificate(url_certificate){ //jshint ignore:line
      var templateModal = 'templates/partials/modal-finish-certificate.html';
      var dialogOptions = {
        templateUrl: templateModal,
        model: {
          /*jshint camelcase: false */
          certificate: url_certificate,
          sharedCertificate: sharedCertificate
        }
      };
      dialogOptions.model.close = function(){
        dialogOptions.model.closeModal();
      };
      ModalService.showModel(dialogOptions);
    }

    function loadMoreCertificates() {
      UserService.getCertificates(vmProfile.currentPage).then(function(data) {
        /*jshint camelcase: false */
        vmProfile.certificates = vmProfile.certificates.concat(data.certificates);
        vmProfile.currentPage += 1;
        if ( vmProfile.certificates.length === vmProfile.totalItems ) {
          vmProfile.noMoreItemsAvailable = true;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    }

    function sharedCertificate(image_url){//jshint ignore:line
      var data = language === 'es' ?
      {
        title: 'Mira todo lo que aprendí jugando Moi Aprendizaje Social',
        description: 'Consigue crédito escolar por tu desempeño con Moi Aprendizaje Social',
        image_url: image_url, //jshint ignore:line
        publicUrl: image_url //jshint ignore:line
      } :
      {
        title: 'See everything I learned playing Moi Social Learning',
        description: 'Get school credit for your performance with Moi Social Learning',
        image_url: image_url, //jshint ignore:line
        publicUrl: image_url //jshint ignore:line
      };
      SocialService.showModal(data);
    }

    function goToTree() {
      if (vmProfile.user.id) {
        $state.go('tree', {
          username: vmProfile.user.username
        });
      }else{
        $ionicPopup.alert({
          title: 'Ups!',
          template: 'Algo fallo'
        });
      }
    }
  });
})();
