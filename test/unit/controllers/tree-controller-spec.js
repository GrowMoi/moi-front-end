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
      ModalService,
      TestService,
      StorageService;

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
      $provide.factory('TreeService', function(){
        return {
          progressTree: function(){
            return {
              'percentage': 10,
              'userLevel': 10,
              'pointPosition': 9
            };
          }
        };
      });
      $provide.factory('StorageService', function(){
        return {
          get: function(){
            return {
              then: function(){
                return null;
              }
            };
          },
          update: function() {

          }
        };
      });
      $provide.factory('SocialService', function(){
        return {
          showModal: function(){
            return null;
          }
        };
      });
      $provide.factory('TestService', function(){
        return {
          goFinalTest: function(){
            return {
              then: function(){
                return null;
              }
            };
          }
        };
      });
    }));

    beforeEach(inject(
      function (_$controller_,
                _$rootScope_,
                _PreloadAssets_,
                _ModalService_,
                _StorageService_,
                _TestService_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        PreloadAssets = _PreloadAssets_;
        ModalService = _ModalService_;
        StorageService = _StorageService_;
        TestService = _TestService_;
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
          data: {tree: {root: {in_desired_neuron_path: false}}, meta:{depth:4}},
          storage: {tree: {'vinetas_animadas': {'depth': 1}}},
          $auth: $auth,
          ModalService: ModalService,
          StorageService: StorageService
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
