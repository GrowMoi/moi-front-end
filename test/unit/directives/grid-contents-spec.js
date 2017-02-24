(function () {
  'use strict';

  describe('gridDirective', function () {
    var $compile,
        $scope,
        $rootScope,
        ContentService,
        TestService,
        template,
        controller;

    beforeEach(module('moi.directives'));
    beforeEach(module('moi.templates'));
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
          readContent: function(){
            return {
              then: function(){
                return null;
              }
            };
          }
        };
      });
    }));
    beforeEach(module('moi.services', function($provide){
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
    }));
    beforeEach(inject(
      function (_$compile_,
                _$rootScope_,
                _ContentService_,
                _TestService_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        ContentService = _ContentService_;
        TestService = _TestService_;
      })
    );

    beforeEach(function(){
      $scope.contents = [
        {
          'id':1,
          'neuron_id':1,
          'media':[
            'image1.jpg',
            'image2.jpg'
          ],
          'level':1,
          'kind':'que-es',
          'description':'some description',
          'source':'own',
          'title':'some title',
          'learnt':false,
          'read': false,
          'user_notes':null
        },
        {
          'id':2,
          'neuron_id':1,
          'media':[
            'image3.jpg',
            'image4.png'
          ],
          'level':1,
          'kind':'como-funciona',
          'description':'some description 2',
          'source':'own',
          'title':'some title 2',
          'learnt':false,
          'read': false,
          'user_notes':null
        }
      ];

      $scope.settings = [
        {
          kind: 'que-es',
          level:3
        },
        {
          kind: 'como-funciona',
          level:2
        },
        {
          kind: 'por-que-es',
          level:2
        },
        {
          kind: 'quien-cuando-donde',
          level:1
        }
      ];

    });


    describe('#gridContents init', function(){
      it('should have the same params you set', function(){
        template = $compile('<grid-contents contents="contents" settings="settings"></grid-contents>')($scope);
        $scope.$digest();
        controller = template.controller('gridContents');
        chai.expect($scope.contents).to.deep.equals(controller.contents);
      });

    });

    describe('#gridContents methods', function(){
      it('should call broadcast neuron:remove-content', function(){
        var spy = sinon.spy(ContentService, 'readContent');
        template = $compile('<grid-contents contents="contents" settings="settings"></grid-contents>')($scope);
        $scope.$digest();
        $rootScope.$broadcast('neuron:remove-content');
        $scope.$digest();
        chai.expect(spy.called).to.be.equal(true);
      });

      it('should call selectContent when you select some content', function(){
        var template = $compile('<grid-contents contents="contents" settings="settings"></grid-contents>')($scope);
        $scope.$digest();
        var controller = template.controller('gridContents');
        var spy = sinon.spy(controller, 'selectContent');
        controller.selectContent($scope.contents[0]);
        chai.expect(spy.called).to.be.equal(true);
      });

    });

  });
})();
