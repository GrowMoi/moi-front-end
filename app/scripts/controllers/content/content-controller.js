(function(){
  'use strict';
  angular.module('moi.controllers')
  .controller('ContentController', function($scope,
                                            content,
                                            ContentService,
                                            ModalService,
                                            TestService,
                                            $state,
                                            $window)
  {
    var vmContent = this;
    vmContent.showImage = showImage;
    vmContent.sendNotes = sendNotes;
    vmContent.showGifSearch = false;
    vmContent.showGifRead = false;
    vmContent.finishedAnimationSearch = finishedAnimationSearch;
    vmContent.finishedAnimationRead = finishedAnimationRead;
    vmContent.initAnimationRead = initAnimationRead;
    vmContent.initAnimationSearch = initAnimationSearch;
    vmContent.callbackBackButton = callbackBackButton;

    activate();

    function activate() {
      vmContent.content = content;
      vmContent.media = content.videos.concat(content.media);
    }

    function showImage(urlImage) {
      var modelData = {};
      modelData.contentSrc = urlImage;
      modelData.isImage = true;
      ModalService.showModel({
                parentScope: $scope,
                templateUrl: 'templates/partials/modal-image.html',
                model: modelData});
    }

    function sendNotes() {
      /*jshint camelcase: false */
      ContentService.addNotesToContent(vmContent.content);
    }

    function initAnimationSearch() {
      vmContent.showGifSearch = true;
    }

    function initAnimationRead() {
      vmContent.showGifRead = true;
    }

    function finishedAnimationSearch() {
      $state.go('searches');
    }

    function finishedAnimationRead() {
      ContentService.readContent(vmContent.content).then(function(response) {
        /*jshint camelcase: false */
        if (response.data.perform_test) {
          TestService.goTest($scope, response.data.test);
        }else{
          $state.go('neuron', { neuronId: vmContent.content.neuron_id });
        }
      });
      vmContent.showGifRead = false;
    }

    function callbackBackButton() {
      $window.history.back();
    }
  });
})();
