(function() {
  'use strict';

  describe('moiButtonsDirective', function() {
    var $compile,
      $scope,
      $state,
      $rootScope,
      $auth,
      ContentService,
      TestService,
      SocialService,
      AnimationService,
      UserService,
      ModalService,
      template,
      controller,
      modalSpy,
      UserNotificationsService,
      StorageService;

    beforeEach(module('moi.directives'));
    beforeEach(module('moi.templates'));
    beforeEach(angular.mock.module(function($provide) {
      $provide.provider('$state', function() {
        return {
          $get: function() {
            return {
              go: function() {
                return null;
              }
            };
          }
        };
      });

    }));
    beforeEach(module('moi.services', function($provide) {
      $provide.factory('ContentService', function() {
        return {
          readContent: function() {
            return {
              then: function() {
                return null;
              }
            };
          }
        };
      });
      $provide.factory('TestService', function() {
        return {
          goTest: function() {
            return {
              then: function() {
                return null;
              }
            };
          }
        };
      });
      $provide.factory('SocialService', function() {
        return {
          showModal: function() {
            return null;
          }
        };
      });
      $provide.service('AnimationService', function() {
        return {
          getButton: function() {}
        };
      });
      $provide.service('UserService', function() {
        return {
          addTasks: function() {
            return null;
          },
          recommendedNeuron: function() {
            return {};
          }
        };
      });
      $provide.service('ModalService', function() {
        modalSpy = sinon.spy();
        return {
          showModel: modalSpy
        };
      });
      $provide.service('UserNotificationsService', function() {
        return {
          initialize: function() {
            return null;
          },
          totalNotifications: 0,
          totalRecommendationContents: 0,
          totalRecommendations: 0
        };
      });
      $provide.service('$auth', function() {
        return {
          user: {
            id: 1,
            email: 'admin@example.com',
            name: 'admin',
            role: 'admin'
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
            return null;
          }
        };
      });
    }));

    beforeEach(inject(
      function(_$compile_,
        _$rootScope_,
        _ContentService_,
        _TestService_,
        _SocialService_,
        _AnimationService_,
        _UserService_,
        _ModalService_,
        _$state_,
        _UserNotificationsService_,
        _$auth_,
        _StorageService_) {

        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $state = _$state_;
        ContentService = _ContentService_;
        TestService = _TestService_;
        SocialService = _SocialService_;
        AnimationService = _AnimationService_;
        UserService = _UserService_;
        ModalService = _ModalService_;
        UserNotificationsService = _UserNotificationsService_;
        $auth = _$auth_;
        StorageService = _StorageService_;
    }));

    beforeEach(function(){
      $scope.buttonsOptions = {
        neuron: {},
        content: {},
        buttons: {
          search: true,
          task: true
        }
      };
    });

    describe('#moiButtons init', function(){
      beforeEach(function(){
        template = $compile('<moi-buttons options="buttonsOptions"></moi-buttons>')($scope);
        $scope.$digest();
        controller = template.controller('moiButtons');
      });

      it('should have the same params you set', function(){
        chai.expect(controller.neuron).to.be.equal($scope.buttonsOptions.neuron);
        chai.expect(controller.content).to.be.equal($scope.buttonsOptions.content);
      });

      // it('should call to finishedAnimation', function(){
      //   var spy = sinon.spy($state, 'go');
      //   console.log('controller', controller);
      //   controller.searchOptions.finishedAnimation();
      //   chai.expect(spy.called).to.be.equal(true);
      // });

    });

  });
})();
