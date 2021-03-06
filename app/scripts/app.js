(function(){
  'use strict';

  angular.module('moi', [
    'ionic',
    'config',
    'moi.controllers',
    'moi.services',
    'moi.directives',
    'moi.filters',
    'moi.templates',
    'ng-token-auth',
    'pascalprecht.translate',
    'videosharing-embed',
    'ionic.contrib.drawer',
    'dragularModule',
    '720kb.socialshare',
    'ngIdle',
    '720kb.tooltips',
    'infinite-scroll'
  ])

  .run(function(Idle, $window, $rootScope, GAService, $auth) {
    Idle.watch();

    GAService.loadScript();

    $auth.validateUser()
      .then(function userAuthorized(user){
        GAService.track('set', 'userId', user.username);
        GAService.track('set', 'dimension1', user.id);
      }, function userNotAuthorized(){
        GAService.track('set', 'userId', null);
        GAService.track('set', 'dimension1', null);
      });

    $rootScope.$on('IdleTimeout', function() {
      GAService.track('set', 'userId', null);
      GAService.track('set', 'dimension1', null);
      $window.localStorage.clear();
      $window.location='/';
   });
  })

  .config(function(
    $stateProvider,
    $urlRouterProvider,
    $httpProvider,
    $ionicConfigProvider,
    IdleProvider,
    KeepaliveProvider,
    $sceDelegateProvider,
    ENV) {
    // configure Idle settings
    IdleProvider.idle(12); // in seconds
    IdleProvider.timeout(600); // in seconds
    KeepaliveProvider.interval(10); // in seconds

    $httpProvider.interceptors.push(function(InterceptorService){
      return {
        responseError: InterceptorService.responseError,
        request: InterceptorService.request,
        response: InterceptorService.response
      };
    });

    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain. **.
      ENV.apiHost + '/**',
      'https://moi-backend.growmoi.com/**',
      'https://res.cloudinary.com/moi-images/**'
    ]);

    $ionicConfigProvider.views.transition('none');
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
    .state('login', {
      url: '/login',
      abstract: true,
      controller: 'LoginController',
      controllerAs: 'vmLogin',
      templateUrl: 'templates/login/login.html'
    })
    .state('login.first_step', {
      url: '/first_step',
      templateUrl: 'templates/login/partials/first_step.html',
      resolve: {
        checkIfIsLogin: redirectTree
      }
    })
    .state('login.second_step', {
      url: '/second_step',
      templateUrl: 'templates/login/partials/second_step.html',
      resolve: {
        checkIfIsLogin: redirectTree
      }
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
            return data;
          });
        },
        dataInventory: function($auth, UserService) {
          return $auth.validateUser().then(function userAuthorized(){
            return UserService.getUserAchievements().then(function(data){
              return data;
            });
          }, function publicUser(){
            return {};
          });
        },
        storage: function(StorageService, $auth) {
          return $auth.validateUser().then(function userAuthorized(){
            return StorageService.get().then(function(resp) {
              return resp.data.storage;
            });
          }, function publicUser(){
            return {};
          });
        }
      }
    })
    .state('content', {
      url: '/neuron/{neuronId:int}/content/{contentId:int}',
      controller: 'ContentController',
      controllerAs: 'vmContent',
      templateUrl: 'templates/content/content.html',
      cache: false,
      resolve: {
        content: function($stateParams, ContentService) {
          var contentSelected = {},
              params = {
                neuronId: $stateParams.neuronId,
                contentId: $stateParams.contentId
              };
          return ContentService.getContent(params).then(function(data) {
            contentSelected = data;
            return ContentService.recommendedContents(contentSelected).then(function(contentsData) {
              contentSelected.recommended = contentsData.contents;
              return contentSelected;
            });
          });
        },
        dataInventory: function($auth, UserService) {
          return $auth.validateUser().then(function userAuthorized(){
            return UserService.getUserAchievements().then(function(data){
              return data;
            });
          }, function publicUser(){
            return {};
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
        currentUser: checkIfIsAuthorized,
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
      params: {testData: null},
      resolve: {
        currentUser: checkIfIsAuthorized
      }
    })
    .state('tree', {
      url: '/tree/{username:string}',
      controller: 'TreeController',
      controllerAs: 'treeModel',
      templateUrl: 'templates/tree/tree.html',
      cache: false,
      params: {neuronId: null},
      resolve: {
        data: function(TreeService, $stateParams){
          var username = $stateParams.username;
          var neuronId = $stateParams.neuronId;
          if(neuronId){
            return TreeService.getNeuronsUser(username, neuronId).then(function(data) {
              return data;
            });
          }else{
            return TreeService.getNeuronsUser(username).then(function(data) {
              return data;
            });
          }
        },
        storage: function(StorageService, $auth) {
          return $auth.validateUser().then(function userAuthorized(){
            return StorageService.get().then(function(resp) {
              return resp.data.storage;
            });
          }, function publicUser(){
            return {};
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
        currentUser: checkIfIsAuthorized,
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
      url: '/user/{username:string}/profile',
      templateUrl: 'templates/profile/profile.html',
      controller: 'ProfileController',
      controllerAs: 'vmProfile',
      cache: false,
      params: {defaultTab: null},
      resolve: {
        user: function (UserService, $stateParams){
          return UserService.profile($stateParams.username).then(function(data){
            return data;
          });
        },
        certificates: function (UserService){
          return UserService.getCertificates(1).then(function(data){
            return data;
          });
        },
        myEvents: function (UserService){
          return UserService.getMyEvents().then(function(data){
            return data;
          });
        },

      }
    })
    .state('profileEdit', {
      url: '/profile/edit',
      templateUrl: 'templates/profile/edit.html',
      controller: 'ProfileEditController',
      controllerAs: 'vmProfileEdit',
      cache: false,
      resolve: {
        user: checkIfIsAuthorized
      }
    })
    .state('friends', {
      url: '/friends/:query',
      controller: 'FriendsController',
      controllerAs: 'friendsmodel',
      templateUrl: 'templates/friends/friends.html',
      cache: false,
      resolve: {
        currentUser: checkIfIsAuthorized,
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
      abstract: true
    })
    .state('tasks.contentsToLearn', {
      url: '/contents/learn',
      templateUrl: 'templates/tasks/contents-list/contents-list.html',
      controller: 'ContentsListController',
      controllerAs: 'contentsList',
      resolve: {
        currentUser: checkIfIsAuthorized,
        gridParams: function(UserService, $q) {
          return {
            apiCallHandler: function (currentPage) {
              return $q(function(resolve) {
                UserService.getContentsToLearn(currentPage).then(function(data) {
                  resolve({
                    items: data.contents,
                    totalItems: data.meta.total_items //jshint ignore:line
                  });
                });
              });
            },
            showDeleteIcon: false
          };
        }
      }
    })
    .state('tasks.savedContents', {
      url: '/contents/saved',
      templateUrl: 'templates/tasks/contents-list/contents-list.html',
      controller: 'ContentsListController',
      controllerAs: 'contentsList',
      resolve: {
        currentUser: checkIfIsAuthorized,
        gridParams: function(UserService, $q) {
          return {
            apiCallHandler: function (currentPage) {
              return $q(function(resolve) {
                UserService.getTasks(currentPage).then(function(data) {
                  resolve({
                    items: data.content_tasks.content_tasks, //jshint ignore:line
                    totalItems: data.meta.total_items //jshint ignore:line
                  });
                });
              });
            },
            showDeleteIcon: true,
            onSelectDelete: function (content, contents) {
              UserService.deleteTask(content).then(function (resp) {
                if (resp.status === 202) {
                  var contentIndex = contents.indexOf(content);
                  contents.splice(contentIndex, 1);
                }
              });
            }
          };
        }
      }
    })
    .state('tasks.favorites', {
      url: '/favorites',
      templateUrl: 'templates/tasks/contents-list/contents-list.html',
      controller: 'ContentsListController',
      controllerAs: 'contentsList',
      resolve: {
        currentUser: checkIfIsAuthorized,
        gridParams: function(UserService, $q) {
          return {
            apiCallHandler: function (currentPage) {
              return $q(function(resolve) {
                UserService.getFavorites(currentPage).then(function(data) {
                  resolve({
                    items: data.content_tasks.content_tasks, //jshint ignore:line
                    totalItems: data.meta.total_items //jshint ignore:line
                  });
                });
              });
            },
            showDeleteIcon: false
          };
        }
      }
    })
    .state('tasks.notes', {
      url: '/notes',
      templateUrl: 'templates/tasks/notes/notes.html',
      controller: 'NotesController',
      controllerAs: 'notesModel',
      resolve: {
        currentUser: checkIfIsAuthorized
      }
    })
    .state('tasks.notifications', {
      url: '/notifications',
      templateUrl: 'templates/tasks/notifications/notifications.html',
      controller: 'NotificationsController',
      controllerAs: 'notificationsModel',
      resolve: {
        currentUser: checkIfIsAuthorized
      }
    })
    .state('inventory', {
      url: '/inventory',
      controller: 'InventoryController',
      controllerAs: 'vmInv',
      templateUrl: 'templates/inventory/inventory.html',
      cache: false,
      resolve: {
        currentUser: checkIfIsAuthorized,
        data: function(UserService) {
          return UserService.getUserAchievements().then(function(data){
            return data;
          });
        },
        events: function(EventsService) {
          return EventsService.getEventsItem().then(function(data){
            return data;
          });
        }
      }
    })
    .state('guide', {
      url: '/guide',
      controller: 'GuideController',
      controllerAs: 'guidemodel',
      templateUrl: 'templates/guide/guide.html',
      cache: false
    })
    .state('quiz', {
      url: '/quiz/{quizId:int}/player/{playerId:int}',
      controller: 'QuizController',
      controllerAs: 'vmTest',
      templateUrl: 'templates/quiz/quiz.html',
      resolve: {
        currentUser: checkIfIsAuthorized,
        quizData: function(QuizService, $stateParams) {
          var params = {
            quizId: $stateParams.quizId,
            playerId: $stateParams.playerId
          };
          return QuizService.getQuiz(params).then(function(data){
            return data;
          });
        }
      }
    })
    .state('finaltest', {
      url: '/finaltest',
      controller: 'FinalTestController',
      controllerAs: 'vmTest',
      templateUrl: 'templates/finaltest/finaltest.html',
      resolve: {
        currentUser: checkIfIsAuthorized,
        testData: function(TestService) {
          return TestService.createFinalTest().then(function(data){
            return data;
          });
        }
      }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login/first_step');

  });

  //init modules
  angular.module('moi.controllers', []);
  angular.module('moi.directives', []);
  angular.module('moi.services', []);
  angular.module('moi.templates', []);
  angular.module('moi.filters', []);

  function checkIfIsAuthorized($auth, $state, GAService){
    return $auth.validateUser()
      .then(function userAuthorized(user){
        GAService.track('set', 'userId', user.username);
        GAService.track('set', 'dimension1', user.id);
        GAService.track('send', 'pageview');
        return user;
      }, function userNotAuthorized(){
        GAService.track('set', 'userId', null);
        GAService.track('set', 'dimension1', null);
        GAService.track('send', 'pageview');
        $state.go('login.first_step');
      });
  }

  function redirectTree($auth, $state) {
    return $auth.validateUser()
      .then(function userAuthorized(user) {
        $state.go('tree', {
          username: user.username
        });
      }, function userNotAuthorized() {
        return;
      });
  }

})();
