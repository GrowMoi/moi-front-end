(function() {
  'use strict';

  describe('NeuronController', function() {
    var ctrl,
      $controller,
      $scope,
      $auth,
      dependencies,
      $rootScope,
      StorageService,
      MediaAchievements,
      ModalService,
      modalSpy;

    beforeEach(module('moi.controllers'));
    beforeEach(function(){
      module('config', function ($provide) {
        $provide.constant('MediaAchievements', {
          1: {
            name: 'Contenidos aprendidos',
            description: 'Han sido aprendidos los primeros 4 contenidos',
            settings: {
              badge:'images/inventory/badges/badge1.png',
              video: 'videos/vineta_1.mp4'
            }
          }
        });
      });
    });
    beforeEach(angular.mock.module(function ($provide) {
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
      $provide.service('ModalService', function() {
        modalSpy = sinon.spy();
        return {
          showModel: modalSpy
        };
      });
    }));
    beforeEach(inject(
      function(_$controller_,
        _$rootScope_,
        _StorageService_,
        _MediaAchievements_,
        _ModalService_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        MediaAchievements = _MediaAchievements_;
        StorageService = _StorageService_;
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
          data: {
            id: 1,
            contents: [{
              id: 1
            }]
          },
          dataInventory: {
            achievements: [
              {
                id:1,
                name: '4 contenidos aprendios',
                number: 5
              }
            ]
          },
          storage: {neuron: {'advices': ['advice0']}},
          $auth: $auth
        };

        ctrl = $controller('NeuronController', dependencies);

      }));

    describe('on load', function() {
      it('should controller.neuron be the same of data', function() {
        chai.expect(ctrl.neuron).to.deep.equals(dependencies.data);
      });

      it('should load onSelect', function() {
        chai.expect(ctrl.contentsOptions.onSelect).to.be.an('function');
      });
    });

  });
})();
