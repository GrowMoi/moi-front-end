/*jshint camelcase: false */
(function () {
  'use strict';

  describe('TreeController', function () {
    var ctrl,
      $controller,
      $scope,
      dependencies,
      $rootScope,
      VIDEOS,
      PreloadAssets;

    beforeEach(module('moi.controllers'));
    beforeEach(module('moi.services', function($provide){
      $provide.factory('PreloadAssets', function(){
        return {
          cache: function(){
            return {
              then: function(){
                return null;
              }
            };
          }
        };
      });
    }));
    beforeEach(function(){
      module('config', function ($provide) {
        $provide.constant('VIDEOS', {
          paths: ['video/video1', 'video/video2']
        });
      });
    });
    beforeEach(inject(
      function (_$controller_,
                _$rootScope_,
                _PreloadAssets_,
                _VIDEOS_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        PreloadAssets = _PreloadAssets_;
        VIDEOS= _VIDEOS_;
        dependencies = {
          $scope: $scope,
          data: {tree: [{id:1}], meta:{depth:4}}
        };

        ctrl = $controller('TreeController', dependencies);

      })
    );

    describe('on load', function(){
      it('should controller.tree be the same of data', function(){
        chai.expect(ctrl.neurons).to.deep.equals(dependencies.data.tree);
      });
    });

  });
})();
