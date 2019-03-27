(function () {
  'use strict';

  describe('SettingsController', function () {
    var ctrl,
        $controller,
        $scope,
        $auth,
        dependencies,
        SettingsService,
        StorageService,
        dragularService,
        ENV,
        $state,
        $rootScope;

    beforeEach(module('moi.controllers'));

    beforeEach(module('moi.services', function($provide){
      $provide.factory('SettingsService', function(){
        return {
          saveContentSettings: function(){
            return {
              then: function(){
                return null;
              }
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
          changeLanguage: function() {
            return null;
          }
        };
      });
    }));

    beforeEach(function(){
      module('config', function ($provide) {
        $provide.constant('ENV', {
          name:'development',
          apiHost:'http://localhost:5000'
        });
        $provide.constant('$ionicPopup', {
          alert: sinon.stub()
        });
        $provide.provider('$state', function () {
          return {
            $get: function () {
              return {
                go: function(){
                  return null;
                }
              };
            }
          };
        });
      });
    });

    beforeEach(angular.mock.module(function($provide){
      $provide.service('dragularService', function(){
        return function () {
          return {};
        };
      });
    }));

    beforeEach(inject(
      function (_$controller_,
                _$rootScope_,
                _ENV_,
                _StorageService_,
                _$state_,
                _SettingsService_,
                _dragularService_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        ENV = _ENV_;
        $state = _$state_;
        SettingsService = _SettingsService_;
        dragularService = _dragularService_;
        StorageService = _StorageService_;
        $auth = {
          user: {
            id: 1,
            email: 'admin@example.com',
            name: 'admin',
            role: 'admin',
            content_preferences: {},//jshint ignore:line
            achievements: []
          }
        };

        dependencies = {
          SettingsService: SettingsService,
          $scope: $scope,
          dragularService: dragularService,
          StorageService: StorageService,
          $auth: $auth,
          user: {id: 1, email: 'admin@example.com', name: 'admin', role: 'admin'}
        };

        ctrl = $controller('SettingsController', dependencies);

      })
    );

    describe('on load', function(){
      it('should controller.neuron be the same of data', function(){
        chai.expect(ctrl.neuron).to.deep.equals(dependencies.data);
      });
    });

    describe('events', function(){
      it('should be selected when click a interest', function(){
        var interests = {
          interest:'Animals',
          src:'../images/any-image.png'
        };
        ctrl.selectInterest(interests);
        chai.expect(interests.selected).to.be.equal(true);
      });

      it('should call SettingsService to save settings', function(){
        var setting = {
          kind: 'que-es',
          level: 3
        };
        var spy = sinon.spy(SettingsService, 'saveContentSettings');
        ctrl.contentSettings(setting);
        chai.expect(spy.called).to.be.equal(true);
      });
    });

  });
})();
