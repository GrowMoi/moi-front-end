(function () {
  'use strict';

  describe('NotificationsController', function () {
    var ctrl,
      $controller,
      $scope,
      dependencies,
      $rootScope,
      deferGetNotifications,
      ModalService,
      $window;

    beforeEach(module('moi.controllers'));
    beforeEach(angular.mock.module(function ($provide) {
      $provide.factory('UserService', function ($q) {
        return {
          getNotifications: function () {
            deferGetNotifications = $q.defer();
            return deferGetNotifications.promise;
          }
        };
      });

      $provide.factory('ModalService', function () {
        return {
          showModel: function() {

          }
        };
      });

      $provide.factory('UserNotificationsService', function () {
        return {};
      });

      $provide.factory('$window', function () {
        return {
          open: function(){}
        };
      });
    }));
    beforeEach(inject(
      function (_$controller_, _$rootScope_, _UserService_, _ModalService_,
        _UserNotificationsService_, _$window_) {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();

        $window = _$window_;

        ModalService = _ModalService_;

        dependencies = {
          $scope: $scope,
          $rootScope: $rootScope,
          UserService: _UserService_,
          ModalService: ModalService,
          UserNotificationsService: _UserNotificationsService_,
          $window: $window
        };

        ctrl = $controller('NotificationsController', dependencies);

      }));

    describe('on load', function () {
      var data = {
        'notifications': [
          {
            'id': 51,
            'title': 'Nuevo test 2018-02-21',
            'description': 'Disponible en: http://localhost:8100/#/quiz/56/player/98',
            'user_id': 5902,
            'type': 'quiz',
            'tutor': {
              'id': 5902,
              'name': 'Jhymer Martinez',
              'role': 'tutor',
              'provider': 'email',
              'username': 'moi-jhmartinez1991-gmail-com956'
            }
          },
          {
            'id': 49,
            'title': 'Nueva notificacion',
            'description': 'Descripcion nueva notificación',
            'user_id': 5902,
            'videos': ['https://www.youtube.com/watch?v=sLg2qDsqpAU'],
            'media': ['http://localhost:5000/uploads/notification_media/media/12/1519180525-nature-q-c-640-480-5.jpg'],
            'type': 'generic',
            'tutor': {
              'id': 5902,
              'email': 'jhmartinez1991@gmail.com',
              'name': 'Jhymer Martinez',
              'role': 'tutor',
              'uid': 'jhmartinez1991@gmail.com',
              'provider': 'email',
              'username': 'moi-jhmartinez1991-gmail-com956'
            }
          },
          {
            'id': 50,
            'title': 'Peticion tutor 1',
            'description': 'Nueva peticion tutor',
            'user_id': 5902,
            'type': 'request'
          }
        ],
        'meta': {
          'total_count': 9,
          'total_pages': 5
        }
      };
      it('should get the correct template', function () {
        $rootScope.$digest();
        var template1 = ctrl.getNotificationPartial(data.notifications[0]);
        var template2 = ctrl.getNotificationPartial(data.notifications[1]);
        var template3 = ctrl.getNotificationPartial(data.notifications[2]);
        chai.expect(template1).to.equals('templates/tasks/notifications/partials/quiz.html');
        chai.expect(template2).to.equals('templates/tasks/notifications/partials/generic.html');
        chai.expect(template3).to.equals('templates/tasks/notifications/partials/request.html');
      });

      it('should go to the quiz url', function() {
        var spy = sinon.spy(ModalService, 'showModel');
        var spy2 = sinon.spy($window, 'open');
        ctrl.goToQuiz(data.notifications[0]);
        var params = spy.getCall(0).args[0];
        params.model.callbacks.openTabQuiz();
        expect(spy2.calledWith('http://localhost:8100/#/quiz/56/player/98')).to.equal(true);
      });

      it('showModel should be called', function () {
        var spy = sinon.spy(ModalService, 'showModel');
        ctrl.goToQuiz(data.notifications[0]);
        expect(spy.called).to.be.equal(true);
        expect(spy.calledWith({
          templateUrl: 'templates/partials/modal-go-to-quiz.html',
          model: sinon.match.object
        })).to.equal(true);
      });
    });

  });
})();
