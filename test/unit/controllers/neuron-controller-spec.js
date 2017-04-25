(function () {
  'use strict';

  describe('NeuronController', function () {
    var ctrl,
        $controller,
        $scope,
        dependencies,
        $rootScope,
        stateMock,
        ModalService,
        AnimationService,
        modalSpy,
        UserService;

    beforeEach(module('moi.controllers'));
    beforeEach(angular.mock.module(function($provide){
      $provide.service('ModalService', function(){
        modalSpy = sinon.spy();
        return {
          showModel: modalSpy
        };
      });
      $provide.service('AnimationService', function(){
        return {
          searchButton: function (){
            return {};
          },
          learnButton: function (){
            return {};
          },
          shareButton: function (){
            return {};
          },
          saveTasksButton: function() {
            return {};
          }
        };
      });
      $provide.service('UserService', function(){
        return {
          addTasks: function(){
            return null;
          }
        };
      });
    }));
    beforeEach(inject(
      function (_$controller_,
                _$rootScope_,
                _ModalService_,
                _AnimationService_,
                _UserService_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        stateMock = { go: sinon.stub() };
        ModalService = _ModalService_;
        AnimationService = _AnimationService_;
        UserService = _UserService_;
        dependencies = {
          $scope: $scope,
          $state: stateMock,
          data: {id: 1, contents:[{id:1}]},
          user: {id: 1, email: 'admin@example.com', name: 'admin', role: 'admin'},
          ModalService: ModalService,
          AnimationService: AnimationService
        };

        ctrl = $controller('NeuronController', dependencies);

      })
    );

    describe('on load', function(){
      it('should controller.neuron be the same of data', function(){
        chai.expect(ctrl.neuron).to.deep.equals(dependencies.data);
      });

      it('should load onSelect', function(){
        chai.expect(ctrl.contentsOptions.onSelect).to.be.an('function');
      });
    });

    describe('learn', function(){
      it('should $broadcast neuron:remove-content on read', function(){
        var spy = sinon.spy($scope, '$broadcast');
        ctrl.finishedAnimationRead();
        $scope.$digest();
        chai.expect(spy.called).to.be.equal(true);
      });

      it('should change the gif flag', function(){
        chai.expect(ctrl.gifLearnActive).to.be.equal(true);
        ctrl.contentsOptions.onSelect({read: true});
        chai.expect(ctrl.gifLearnActive).to.be.equal(false);
      });

    });

    describe('Can read content', function(){

      it('should show a dialog', function(){
        var args = {
          parentScope: $scope,
          templateUrl: 'templates/partials/modal-alert-content.html',
          model: {
            message: 'Para aprender este concepto, aún debes superar algunos conceptos previos',
            modalCallbak: sinon.match.func,
            type: 'confirm',
            btnOkLabel: 'Seguir leyendo',
            btnCancelLabel: 'Regresar a mi arbol'
          }
        };
        ctrl.showCanReadModal();
        sinon.assert.calledWith(modalSpy, args);
      });

    });

  });
})();
