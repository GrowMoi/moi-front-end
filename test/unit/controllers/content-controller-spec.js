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
        ContentService;
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
    }));
    beforeEach(module('moi.services', function($provide){
      $provide.factory('ContentService', function(){
        return {
          addNotesToContent: function(){
            return {
              then: function(){
                return null;
              }
            };
          },
          learnContent: function(){
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
    }));
    /*jshint camelcase: false */
    beforeEach(inject(
      function (_$controller_,
                _$rootScope_,
                _ModalService_,
                _ContentService_,
                _$state_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $state = _$state_;
        ModalService = _ModalService_;
        ContentService = _ContentService_;

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
          ContentService: ContentService
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
      it('showImage should call modalService.showModel', function(){
        var spy = sinon.spy(ModalService, 'showModel');
        ctrl.showImage();
        chai.expect(spy.called).to.be.equal(true);
      });

      it('sendNotes should call ContentService.addNotesToContent', function(){
        var spy = sinon.spy(ContentService, 'addNotesToContent');
        ctrl.content.user_notes = 'notes';
        ctrl.sendNotes();
        chai.expect(spy.called).to.be.equal(true);
      });

      it('sendNotes should not call ContentService.addNotesToContent when notes is empty', function(){
        var spy = sinon.spy(ContentService, 'addNotesToContent');
        ctrl.sendNotes();
        chai.expect(spy.called).to.be.equal(false);
      });

      it('learnContent should call ContentService.learnContent', function(){
        var spy = sinon.spy(ContentService, 'learnContent');
        ctrl.learn();
        chai.expect(spy.called).to.be.equal(true);
      });

    });

  });
})();