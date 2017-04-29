(function() {
  'use strict';

  describe('ProfileController', function() {
    var $rootScope,
      controller,
      dependencies,
      $auth,
      $state,
      $scope,
      AnimationService,
      UserService;

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
    }));

    beforeEach(inject(
      function(_$rootScope_,
              $controller,
              _AnimationService_,
              _UserService_) {

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
        AnimationService = _AnimationService_;
        UserService = _UserService_;
        /*jshint camelcase: false */
        dependencies = {
          $state: $state,
          $auth: $auth,
          user: {
            id: 1,
            email: 'admin@example.com',
            name: 'admin',
            age: '15',
            last_contents_learnt: []
          },
          AnimationService: AnimationService,
          UserService: UserService
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
