(function(){
  'use strict';

  angular.module('moi', [
    'ionic',
    'config',
    'ngCordova',
    'moi.controllers',
    'moi.services',
    'moi.directives',
    'ng-token-auth',
    'pascalprecht.translate',
    'videosharing-embed',
    'ionic.contrib.drawer',
    'dragularModule',
    '720kb.socialshare',
    'ngIdle'
  ])

  .run(function($ionicPlatform, Idle) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
    });
    Idle.watch();
  })

  .config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider, IdleProvider, KeepaliveProvider) {
    // configure Idle settings
    IdleProvider.idle(12); // in seconds
    IdleProvider.timeout(3600); // in seconds
    KeepaliveProvider.interval(10); // in seconds

    $httpProvider.interceptors.push(function(InterceptorService){
      return {
        responseError: InterceptorService.responseError,
        request: InterceptorService.request,
        response: InterceptorService.response
      };
    });

    $ionicConfigProvider.views.transition('none');
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    .state('login', {
      url: '/login',
      controller: 'LoginController',
      controllerAs: 'vm',
      templateUrl: 'templates/login/login.html'
    })
    .state('neuron', {
      url: '/neuron/{neuronId:int}',
      controller: 'NeuronController',
      controllerAs: 'vmNeuron',
      templateUrl: 'templates/neuron/neuron.html',
      cache: false,
      resolve: {
        data: function(NeuronService, $stateParams){
          var id = $stateParams.neuronId;
          return NeuronService.getNeuron(id).then(function(data) {
            return data.neuron;
          });
        },
        user: function ($auth) {
          return $auth.validateUser();
        }
      }
    })
    .state('content', {
      url: '/neuron/{neuronId:int}/content/{contentId:int}',
      controller: 'ContentController',
      controllerAs: 'vmContent',
      templateUrl: 'templates/content/content.html',
      resolve: {
        content: function(NeuronService, $stateParams, ContentService){
          var contentSelected = {};
          return NeuronService.getNeuron($stateParams.neuronId).then(function(neuronData) {
            neuronData.neuron.contents.some(function(content) {
              if (content.id === $stateParams.contentId){
                contentSelected = content;
                return true;
              }
            });
            return ContentService.recommendedContents(contentSelected).then(function(contentsData){
                  contentSelected.recommended = contentsData.contents;
                  contentSelected.can_read = neuronData.neuron.can_read;//jshint ignore:line
                  return contentSelected;
            });
          });
        }
      }
    })
    .state('settings', {
      url: '/settings',
      controller: 'SettingsController',
      controllerAs: 'vm',
      templateUrl: 'templates/settings/settings.html',
      resolve: {
        user: function ($auth) {
          return $auth.validateUser();
        }
      }
    })
    .state('test', {
      url: '/test/{testId:int}',
      controller: 'TestController',
      controllerAs: 'vmTest',
      templateUrl: 'templates/test/test.html',
      params: {testData: null}
    })
    .state('tree', {
      url: '/tree',
      controller: 'TreeController',
      controllerAs: 'treeModel',
      templateUrl: 'templates/tree/tree.html',
      cache: false,
      resolve: {
        data: function(TreeService){
          return TreeService.getNeuronsUser().then(function(data) {
            return data;
          });
        }
      }
    })
    .state('searches', {
      url: '/searches/:query',
      controller: 'SearchesController',
      controllerAs: 'searchesmodel',
      templateUrl: 'templates/searches/searches.html',
      cache: false,
      resolve: {
        query: function($stateParams) {
          var query = $stateParams.query ? $stateParams.query : '';
          return query;
        }
      }
    })
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register/register.html',
      controller: 'RegisterController',
      controllerAs: 'registerModel',
      cache: false
    })
    .state('profile', {
      url: '/user/{userId:int}/profile',
      templateUrl: 'templates/profile/profile.html',
      controller: 'ProfileController',
      controllerAs: 'vmProfile',
      cache: false,
      resolve: {
        user: function (UserService, $stateParams){
          return UserService.profile($stateParams.userId).then(function(data){
            return data;
          });
        }
      }
    })
    .state('profileEdit', {
      url: '/profile/edit',
      templateUrl: 'templates/profile/edit.html',
      controller: 'ProfileEditController',
      controllerAs: 'vmProfileEdit',
      cache: false,
      resolve: {
        user: function ($auth) {
          return $auth.validateUser();
        }
      }
    })
    .state('friends', {
      url: '/friends/:query',
      controller: 'FriendsController',
      controllerAs: 'friendsmodel',
      templateUrl: 'templates/friends/friends.html',
      cache: false,
      resolve: {
        query: function($stateParams) {
          var query = $stateParams.query ? $stateParams.query : '';
          return query;
        }
      }
    })
    .state('tasks', {
      url: '/tasks',
      controller: 'TasksController',
      controllerAs: 'tasksmodel',
      templateUrl: 'templates/tasks/tasks.html',
      cache: false
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

  });
})();
