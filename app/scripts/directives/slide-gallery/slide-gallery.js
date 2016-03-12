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
    var modelData = {};

    vmSlide.showImage = showImage;
    vmSlide.slideChanged = slideChanged;
    vmSlide.slideImages = createGroupedArray(vmSlide.images, parseInt(vmSlide.itemPerSlide));
    vmSlide.next = next;
    vmSlide.previous = previous;

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

    function showImage(urlImage) {
      modelData.imageSrc = urlImage;
      ModalService.showModel({
                parentScope: $scope,
                templateUrl: 'templates/partials/modal-image.html',
                model: modelData});
    }

    // Called each time the slide changes
    function slideChanged(index) {
      vmSlide.slideIndex = index;
    }

  }
})();
