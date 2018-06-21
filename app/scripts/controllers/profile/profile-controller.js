(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('ProfileController', function (user,
                                            certificates,
                                            $auth,
                                            $stateParams,
                                            $scope,
                                            ModalService,
                                            UserService,
                                            SocialService) {

    var vmProfile = this,
        currentUser = $auth.user;
    vmProfile.user = user;
    vmProfile.isCurrentUser = user.id === currentUser.id;
    vmProfile.showLeaderboard = showLeaderboard;
    vmProfile.certificates = certificates.certificates;
    vmProfile.showCertificate = showCertificate;
    vmProfile.removeCertificate = UserService.deleteCertificate;
    vmProfile.noMoreItemsAvailable = true;
    vmProfile.currentPage = 2;
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

    vmProfile.tabs = [
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
    ];

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

    function showLeaderboard(){
      UserService.getLeaderboard(vmProfile.user.id).then(function(data){
        var dialogOptions = {
          templateUrl: 'templates/partials/modal-show-leaderboard.html',
          model: {
            leaders: data.leaders,
            /*jshint camelcase: false */
            user: data.meta.user_data,
            total_contents: data.meta.total_contents,
            hideFooter: currentUserIsLeader(data.leaders)
          }
        };
        ModalService.showModel(dialogOptions);
      });
    }

    function currentUserIsLeader(leaders){
      var leader = leaders.find(function(leader){return leader.user_id === vmProfile.user.id;}); //jshint ignore:line
      return leader ? true : false;
    }

    function shareProfile() {
      var data = {
        title: 'My Profile',
        description: 'Screenshot'
      };
      SocialService.showModal(data);
    }

    function showCertificate(url_certificate){ //jshint ignore:line
      var dialogOptions = {
        templateUrl: 'templates/partials/modal-finish-certificate.html',
        model: {
          /*jshint camelcase: false */
          certificate: url_certificate,
          sharedCertificate: sharedCertificate
        }
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
      var data = {
        title: 'Certificate',
        description: 'Screenshot',
        image_url: image_url, //jshint ignore:line
        publicUrl: image_url //jshint ignore:line
      };
      SocialService.showModal(data);
    }

  });
})();
