(function() {
  'use strict';

  describe('ProfileController', function() {
    var $rootScope,
      controller,
      dependencies,
      $auth,
      $state,
      $scope,
      $stateParams,
      AnimationService,
      UserService,
      ModalService;

    beforeEach(module('moi.controllers'));
    beforeEach(angular.mock.module(function($provide){
      $provide.service('AnimationService', function(){
        return {
          getButton: function (){
            return {};
          }
        };
      });
      $provide.factory('UserService', function(){
        return {
          recommendedNeuron: function(){}
        };
      });
      $provide.factory('ModalService', function(){
        return {
          showModel: function(){
            return null;
          }
        };
      });
      $provide.provider('$stateParams', function () {
        return {
          $get: function () {
            return {
              userId: 1
            };
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
    }));

    beforeEach(inject(
      function(_$rootScope_,
              $controller,
              _$stateParams_,
              _AnimationService_,
              _UserService_,
              _ModalService_) {

        $state = {
          go: sinon.stub()
        };
        $auth = {
          user: {
            id: 2,
            email: 'admin@example.com',
            name: 'admin'
          }
        };
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $stateParams = _$stateParams_;
        AnimationService = _AnimationService_;
        UserService = _UserService_;
        UserService = _ModalService_;
        /*jshint camelcase: false */
        dependencies = {
          $state: $state,
          $auth: $auth,
          $stateParams: $stateParams,
          user: {
            id: 1,
            email: 'admin@example.com',
            name: 'admin',
            age: '15',
            last_contents_learnt: []
          },
          certificates: [
            {
              id: 1,
              user_id: 2,
              media_url: 'asdjlaksd'
            }
          ],
          achievements: ['premio1', 'premio2'],
          AnimationService: AnimationService,
          UserService: UserService,
          ModalService: ModalService
        };

        controller = $controller('ProfileController', dependencies);
      }));

    describe('on load', function() {
      it('should controller.user be the same of data', function() {
        chai.expect(controller.user).to.deep.equals(dependencies.user);
      });

      it('should controller.isCurrentUser be false', function() {
        chai.expect(controller.isCurrentUser).equal(false);
      });
    });

  });
})();
