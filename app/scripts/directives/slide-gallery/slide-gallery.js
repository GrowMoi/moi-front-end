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
        images: '='
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
      var modelData = {};
      modelData.contentSrc = url;
      modelData.isImage = isImage(url);
      ModalService.showModel({
                parentScope: $scope,
                templateUrl: 'templates/partials/modal-image.html',
                model: modelData});
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
