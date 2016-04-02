(function () {
  'use strict';

  describe('SettingsController', function () {
    var ctrl, $controller, $scope, dependencies, SettingsService, $rootScope;

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
    }));

    beforeEach(inject(
      function (_$controller_,
                _$rootScope_,
                _SettingsService_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        SettingsService = _SettingsService_;

        dependencies = {
          SettingsService: SettingsService,
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
