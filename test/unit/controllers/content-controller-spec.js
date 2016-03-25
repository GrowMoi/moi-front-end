(function () {
  'use strict';

  describe('ContentController', function () {
    var ctrl, $controller, $scope, dependencies, $rootScope;
    beforeEach(module('moi.controllers'));
    beforeEach(module('moi.services', function($provide){
      $provide.factory('ContentService', function(){
        return {
          addNotesToContent: function(){
            return {
              then: function(){
                return null;
              }
            }
          }
        }
      });
      $provide.factory('ModalService', function(){
        return {
          showModel: function(){
            return null;
          }
        }
      });
    }));
    beforeEach(inject(
      function (_$controller_,
                _$rootScope_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();

        dependencies = {
          content: {
            id: 1,
            level: 1,
            neuron_id: 1,
            media: [],
            videos: []
          },
          $scope: $scope
        };

        ctrl = $controller('ContentController', dependencies);

      })
    );

    describe('on load', function(){
      it('should controller.content be the same of data', function(){
        chai.expect(ctrl.content).to.deep.equals(dependencies.content);
      });
    });

  });
})();
