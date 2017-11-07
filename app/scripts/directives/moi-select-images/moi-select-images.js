(function () {
'use strict';

  angular
    .module('moi.directives')
    .directive('moiSelectImages', moiSelectImagesDirective);

  function moiSelectImagesDirective() {
    return {
      restrict: 'EA',
      templateUrl: 'templates/directives/moi-select-images/moi-select-images.html',
      scope: {
        images: '=',
        onChange: '&'
      },
      controller: moiSelectImagesController,
      controllerAs: 'vmSelectImages',
      bindToController: true
    };
  }

  function moiSelectImagesController(){
    var vmSelectImages = this;
    vmSelectImages.onSelect = onSelect;

    function onSelect(key) {
      angular.forEach(vmSelectImages.images, function(image) {
        if(image.key === key){
          image.selected = true;
          vmSelectImages.onChange({image: image});
        }else{
          image.selected = false;
        }
      });
    }
  }
})();
