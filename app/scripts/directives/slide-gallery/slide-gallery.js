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

  function slideGalleryController($element, $scope, ModalService) {
    var vmSlide = this;
    var modelData = {};

    vmSlide.showImage = showImage;
    vmSlide.slideChanged = slideChanged;
    vmSlide.slideImages = createGroupedArray(vmSlide.images, parseInt(vmSlide.itemPerSlide));

    function createGroupedArray(arr, chunkSize) {
      var groups = [], i;
      for (i = 0; i < arr.length; i += chunkSize) {
          groups.push(arr.slice(i, i + chunkSize));
      }
      return groups;
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
