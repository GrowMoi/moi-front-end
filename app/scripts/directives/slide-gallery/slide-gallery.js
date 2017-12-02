(function () {
  'use strict';

  angular
    .module('moi.directives')
    .directive('slideGallery', slideGalleryDirective);

  function slideGalleryDirective() {
    return {
      restrict: 'EA',
      templateUrl: 'templates/directives/slide-gallery/slide-gallery.html',
      scope: {
        itemPerSlide: '@',
        images: '=',
        options: '='
      },
      controller: slideGalleryController,
      controllerAs: 'vmSlide',
      bindToController: true
    };
  }

  function slideGalleryController($element, $scope, $ionicSlideBoxDelegate, ModalService) {
    var vmSlide = this;

    vmSlide.showMedia = showMedia;
    vmSlide.slideChanged = slideChanged;
    vmSlide.slideImages = createGroupedArray(vmSlide.images, parseInt(vmSlide.itemPerSlide));
    vmSlide.next = next;
    vmSlide.previous = previous;
    vmSlide.isImage = isImage;
    vmSlide.setImageForVideo = setImageForVideo;
    var $backgroundSound = angular.element(document.querySelector('#backgroundSound'));

    var emitters = {
      onImageHiddenCBs: [],
      onImageSelectedCBs: []
    };

    loadApi();

    function loadApi() {
      if (angular.isFunction(vmSlide.options.onRegisterApi)) {
        var api = getPublicApi();
        vmSlide.options.onRegisterApi(api);
      }
    }

    function getPublicApi() {
      return {
        onImageHidden: onImageHidden,
        onImageSelected: onImageSelected
      };
    }

    function onImageHidden(cb) {
      emitters.onImageHiddenCBs.push(cb);
    }

    function onImageSelected(cb) {
      emitters.onImageSelectedCBs.push(cb);
    }

    function createGroupedArray(arr, chunkSize) {
      var groups = [], i;
      for (i = 0; i < arr.length; i += chunkSize) {
          groups.push(arr.slice(i, i + chunkSize));
      }
      return groups;
    }

    function next() {
      $ionicSlideBoxDelegate.next();
    }

    function previous() {
      $ionicSlideBoxDelegate.previous();
    }

    function showMedia(url) {
      var onHideCB,
          modelData = {};

      modelData.contentSrc = url;
      modelData.isImage = isImage(url);
      modelData.frameColor = vmSlide.options.modalFrameColor;

      emitters.onImageSelectedCBs.forEach(function(cb){
        cb(url);
      });
      onHideCB = function (){
        if(!modelData.isImage){
          $backgroundSound[0].play();
        }
        emitters.onImageHiddenCBs.forEach(function(cb){
          cb();
        });
      };

      if(!modelData.isImage){
        $backgroundSound[0].pause();
      }
      ModalService.showModel({
        parentScope: $scope,
        templateUrl: 'templates/partials/modal-image.html',
        model: modelData,
        onHide: onHideCB
      });
    }

    // Called each time the slide changes
    function slideChanged(index) {
      vmSlide.slideIndex = index;
    }

    function isImage(params) {
      return typeof params === 'string';
    }

    function setImageForVideo(params) {
      return params.thumbnail === null ? 'images/video_placeholder.png' : params.thumbnail;
    }
  }
})();
