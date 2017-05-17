(function () {
  'use strict';

  describe('gridDirective', function () {
    var $compile,
        $scope,
        $rootScope,
        ContentService,
        TestService,
        template,
        controller,
        SocialService;

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
    }));
    beforeEach(inject(
      function (_$compile_,
                _$rootScope_,
                _ContentService_,
                _TestService_,
                _SocialService_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        ContentService = _ContentService_;
        TestService = _TestService_;
        SocialService = _SocialService_;
      })
    );

    beforeEach(function(){
      window.Number.isInteger = function(){
        return true;
      };

      $scope.contents = [
        {
          'id':1,
          'neuron_id':1,
          'media':[
            'image1.jpg',
            'image2.jpg'
          ],
          'level':2,
          'kind':'que-es',
          'description':'some description 1',
          'source':'own',
          'title':'some title 1',
          'learnt':true,
          'read': true,
          'user_notes':null
        },
        {
          'id':2,
          'neuron_id':1,
          'media':[
            'image3.jpg',
            'image4.png'
          ],
          'level':2,
          'kind':'por-que-es',
          'description':'some description 2',
          'source':'own',
          'title':'some title 2',
          'learnt':true,
          'read': true,
          'user_notes':null
        },
        {
          'id':3,
          'neuron_id':1,
          'media':[
            'image1.jpg',
            'image2.jpg'
          ],
          'level':1,
          'kind':'como-funciona',
          'description':'some description 3',
          'source':'own',
          'title':'some title 3',
          'learnt':false,
          'read': false,
          'user_notes':null
        },
        {
          'id':4,
          'neuron_id':1,
          'media':[
            'image3.jpg',
            'image4.png'
          ],
          'level':1,
          'kind':'como-funciona',
          'description':'some description 4',
          'source':'own',
          'title':'some title 4',
          'learnt':false,
          'read': false,
          'user_notes':null
        },
        {
          'id':5,
          'neuron_id':1,
          'media':[
            'image1.jpg',
            'image2.jpg'
          ],
          'level':2,
          'kind':'por-que-es',
          'description':'some description 5',
          'source':'own',
          'title':'some title 5',
          'learnt':false,
          'read': false,
          'user_notes':null
        }
      ];

      $scope.settings = [
        {
          kind: 'quien-cuando-donde',
          order: 1,
          level: 2
        },
        {
          kind: 'como-funciona',
          order: 2,
          level: 3
        },
        {
          kind: 'por-que-es',
          order: 0,
          level: 1
        },
        {
          kind: 'que-es',
          order: 3,
          level: 2
        }
      ];

      $scope.contentsOptions = {
        contents: $scope.contents,
        settings: $scope.settings,
        maxLevel: 3,
        minLevel: 1,
        onSelect: function(){}
      };

    });


    describe('#gridContents init', function(){
      it('should have the same params you set', function(){
        template = $compile('<grid-contents options="contentsOptions"></grid-contents>')($scope);
        $scope.$digest();
        controller = template.controller('gridContents');
        chai.expect($scope.contents.length).to.be.equal(controller.options.contents.length);
        chai.expect(controller.options.contents[0]).to.be.an('object');
      });

      it('The contents should be ordered', function () {
        var contentsExpexted = [
          {
            'id': 5,
            'neuron_id': 1,
            'isSelected': true,
            'index': 0,
            'media': [
              'image1.jpg',
              'image2.jpg'
            ],
            'level': 2,
            'kind': 'por-que-es',
            'description': 'some description 5',
            'source': 'own',
            'title': 'some title 5',
            'learnt': false,
            'read': false,
            'user_notes': null
          },
          {
            'id': 3,
            'neuron_id': 1,
            'index': 1,
            'media': [
              'image1.jpg',
              'image2.jpg'
            ],
            'level': 1,
            'kind': 'como-funciona',
            'description': 'some description 3',
            'source': 'own',
            'title': 'some title 3',
            'learnt': false,
            'read': false,
            'user_notes': null
          },
          {
            'id': 4,
            'neuron_id': 1,
            'index': 2,
            'media': [
              'image3.jpg',
              'image4.png'
            ],
            'level': 1,
            'kind': 'como-funciona',
            'description': 'some description 4',
            'source': 'own',
            'title': 'some title 4',
            'learnt': false,
            'read': false,
            'user_notes': null
          },
          {
            'id': 1,
            'neuron_id': 1,
            'index': 3,
            'media': [
              'image1.jpg',
              'image2.jpg'
            ],
            'level': 2,
            'kind': 'que-es',
            'description': 'some description 1',
            'source': 'own',
            'title': 'some title 1',
            'learnt': true,
            'read': true,
            'user_notes': null
          },
          {
            'id': 2,
            'neuron_id': 1,
            'index': 4,
            'media': [
              'image3.jpg',
              'image4.png'
            ],
            'level': 2,
            'kind': 'por-que-es',
            'description': 'some description 2',
            'source': 'own',
            'title': 'some title 2',
            'learnt': true,
            'read': true,
            'user_notes': null
          }
        ];

        template = $compile('<grid-contents options="contentsOptions"></grid-contents>')($scope);
        $scope.$digest();
        controller = template.controller('gridContents');
        controller.options.contents.forEach(function (elem) { delete elem.$$hashKey; });
        chai.expect(controller.options.contents.length).to.equal(contentsExpexted.length);
      });

    });

    describe('#gridContents methods', function(){

      it('should call selectContent when you select some content', function(){
        var template = $compile('<grid-contents options="contentsOptions"></grid-contents>')($scope);
        $scope.$digest();
        var controller = template.controller('gridContents');
        var spy = sinon.spy(controller, 'selectContent');
        controller.selectContent($scope.contents[0]);
        chai.expect(spy.called).to.be.equal(true);
      });

    });

  });
})();
