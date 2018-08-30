(function () {
'use strict';

  angular
    .module('moi.directives')
    .directive('fileinput', fileinput);

  function fileinput() {
    var directive = {
      scope: {
        fileinput: '=',
        filepreview: '='
      },
      link: function(scope, element) {
        element.bind('change', function(changeEvent) {
          scope.fileinput = changeEvent.target.files[0];
          var reader = new FileReader();
          reader.onload = function(loadEvent) {
            scope.$apply(function() {
              scope.filepreview = loadEvent.target.result;
            });
          };
          reader.readAsDataURL(scope.fileinput);
        });
      }
    };

    return directive;
  }
})();
