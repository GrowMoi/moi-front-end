(function () {
  'use strict';

  describe('ContentController', function () {
    var ctrl,
        $controller,
        $scope,
        dependencies,
        $rootScope,
        $state,
        ModalService,
        ContentService,
        TestService,
        AnimationService,
        SocialService,
        UserService,
        ReadContentTimingService;

    beforeEach(module('moi.controllers'));
    beforeEach(angular.mock.module(function ($provide) {
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
      $provide.service('AnimationService', function(){
        return {
          getButton: function (){
            return {};
          }
        };
      });
      $provide.factory('ContentService', function(){
        return {
          addNotesToContent: function(){
            return {
              then: function(){
                return null;
              }
            };
          },
          readContent: function(){
            return {
              then: function(){
                return null;
              }
            };
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
      $provide.factory('TestService', function(){
        return {
          goTest: function(){
            return {
              then: function(){
                return null;
              }
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
      $provide.factory('UserService', function(){
        return {
          addTasks: function(){
            return null;
          }
        };
      });
      $provide.factory('AdviceService', function(){
        return {
          getStatic: function(){
            return null;
          }
        };
      });

      $provide.factory('ReadContentTimingService', function(){
        return {
          stopsReading: function(){
            return null;
          },
          startsReading: function(){
          }
        };
      });
    }));

    /*jshint camelcase: false */
    beforeEach(inject(
      function (_$controller_,
                _$rootScope_,
                _ModalService_,
                _ContentService_,
                _TestService_,
                _$state_,
                _AnimationService_,
                _SocialService_,
                _UserService_,
                _ReadContentTimingService_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $state = _$state_;
        ModalService = _ModalService_;
        ContentService = _ContentService_;
        TestService = _TestService_;
        AnimationService = _AnimationService_;
        SocialService = _SocialService_;
        UserService = _UserService_;
        ReadContentTimingService = _ReadContentTimingService_;

        dependencies = {
          content: {
            id: 1,
            level: 1,
            neuron_id: 1,
            media: [],
            videos: [],
            recommended: []
          },
          $scope: $scope,
          $state: $state,
          ModalService: ModalService,
          ContentService: ContentService,
          AnimationService: AnimationService,
          UserService: UserService,
          ReadContentTimingService: ReadContentTimingService
        };

        ctrl = $controller('ContentController', dependencies);

      })
    );

    describe('on load', function(){
      it('should controller.content be the same of data', function(){
        chai.expect(ctrl.content).to.deep.equals(dependencies.content);
      });
    });

    describe('functions', function(){
      it('sendNotes should call ContentService.addNotesToContent', function(){
        var spy = sinon.spy(ContentService, 'addNotesToContent');
        ctrl.content.user_notes = 'notes';
        ctrl.sendNotes();
        chai.expect(spy.called).to.be.equal(true);
      });

    });

  });
})();
