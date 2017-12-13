/*jshint camelcase: false */
(function () {
  'use strict';

  describe('TreeController', function () {
    var ctrl,
      $controller,
      $scope,
      $auth,
      dependencies,
      $rootScope,
      PreloadAssets,
      ModalService;

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
          },
          shouldPreloadVideo: function(){
            return false;
          }
        };
      });
      $provide.factory('ModalService', function(){
        return {
          showModel: function(){
            return null;
          }
        };
      });
    }));

    beforeEach(inject(
      function (_$controller_,
                _$rootScope_,
                _PreloadAssets_,
                _ModalService_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        PreloadAssets = _PreloadAssets_;
        ModalService = _ModalService_;
        $auth = {
          user: {
            id: 1,
            email: 'admin@example.com',
            name: 'admin',
            role: 'admin',
            content_preferences: {}//jshint ignore:line
          }
        };
        dependencies = {
          $scope: $scope,
          data: {tree: [{id:1}], meta:{depth:4}},
          $auth: $auth,
          ModalService: ModalService
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
