(function () {
  'use strict';

  describe('ProfileEditController', function () {
    var $rootScope,
        controller,
        deferredUpdate,
        user,
        $auth,
        $state,
        $ionicPopup,
        deferredStateGo,
        $scope,
        ImagesLogin;

    beforeEach(module('moi.controllers'));

    beforeEach(function(){
      module('config', function ($provide) {
        $provide.constant('ImagesLogin', {
          paths: ['image/image1', 'image/image2']
        });
      });
    });

    beforeEach(module('moi.services', function($provide){
      $provide.factory('UserService', function($q){
        deferredUpdate  = $q.defer();
        return {
          updateProfile: function(){
            return deferredUpdate.promise;
          }
        };
      });
    }));

    beforeEach(inject(
      function ($q,
                _$rootScope_,
                $controller,
                _UserService_,
                _ImagesLogin_) {

      user = {
        name: 'test',
        city: 'Loja',
        country:  'Ecuador',
        email:  'test@gmail.com',
        birthday: '2011-09-23'
      };

      deferredStateGo   = $q.defer();
      $ionicPopup       = { alert: sinon.stub()
                                      .returns($q.defer().promise)};
      $auth             = {
        updateAccount: sinon.stub()
                          .returns(deferredUpdate.promise)
      };
      $rootScope = _$rootScope_;
      $scope            = $rootScope.$new();
      ImagesLogin = _ImagesLogin_;

      controller = $controller('ProfileEditController', {
        '$ionicPopup': $ionicPopup,
        '$state': $state,
        '$auth': $auth,
        '$scope': $scope,
        'user': user,
        'UserService': _UserService_,
        'ImagesLogin': ImagesLogin
      });
    }));

    describe('#update-profile', function() {
      beforeEach(inject(function() {
        controller.editProfile();
      }));

      describe('when the user is update,', function() {
        it('user update', function() {
          deferredUpdate.resolve();
          $rootScope.$digest();
          sinon.assert.calledOnce($ionicPopup.alert);
        });
      });
    });
  });
})();
