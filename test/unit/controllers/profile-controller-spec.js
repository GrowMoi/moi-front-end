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
      $ionicPopup,
      AnimationService,
      UserService,
      StorageService,
      ModalService,
      LeaderboardService;

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
      $provide.factory('GAService', function(){
        return {
          track: function(){
            return null;
          }
        };
      });
      $provide.factory('LeaderboardService', function(){
        return {
          showLeaderboard: function(){
            return null;
          }
        };
      });
    }));

    beforeEach(inject(
      function(_$rootScope_,
              $controller,
              $q,
              _$stateParams_,
              _AnimationService_,
              _StorageService_,
              _UserService_,
              _ModalService_,
              _LeaderboardService_) {

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
        $ionicPopup       = { alert: sinon.stub()
          .returns($q.defer().promise)};
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $stateParams = _$stateParams_;
        AnimationService = _AnimationService_;
        UserService = _UserService_;
        UserService = _ModalService_;
        StorageService = _StorageService_;
        LeaderboardService = _LeaderboardService_;
        /*jshint camelcase: false */
        dependencies = {
          $state: $state,
          $auth: $auth,
          $stateParams: $stateParams,
          $ionicPopup: $ionicPopup,
          user: {
            id: 1,
            email: 'admin@example.com',
            name: 'admin',
            age: '15',
            last_contents_learnt: []
          },
          myEvents: {
            'status': 'accepted',
            'events': [
              {
                'title': '4 Eventos',
                'image': 'http://localhost:5000/uploads/event/image/2/1556381470-Captura_de_pantalla_2019-02-18_a_la_s__11.29.57.png',
                'completed_at': 1556466459164
              }
            ],
            'meta': {
              'total_events': 4,
              'events_completed': 1
            }
          },
          certificates: {
            certificates: [
              {
                id: 1,
                user_id: 2,
                media_url: 'asdjlaksd'
              }
            ],
            meta:{
              total_items:4
            }
        },
          achievements: ['premio1', 'premio2'],
          AnimationService: AnimationService,
          UserService: UserService,
          ModalService: ModalService,
          $scope: $scope,
          StorageService: StorageService,
          LeaderboardService: LeaderboardService
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
