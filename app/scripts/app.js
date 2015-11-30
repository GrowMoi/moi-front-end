(function(){
  'use strict';

  angular.module('moi', [
    'ionic',
    'moi.controllers',
    'moi.services',
    'ng-token-auth',
    'pascalprecht.translate'
  ])

  .run(function($ionicPlatform) {
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
  })

  .config(function($stateProvider, $urlRouterProvider) {

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

    // setup an abstract state for the tabs directive
    .state('menu', {
      url: '/menu',
      abstract: true,
      templateUrl: 'templates/common/menu.html'
    })

    // Each tab has its own nav history stack:

    .state('menu.dash', {
      url: '/dash',
      views: {
        'menuContent': {
          templateUrl: 'templates/dashboard/tab-dash.html',
          controller: 'DashCtrl'
        }
      },
      resolve: {
        auth: function ($auth) {
          return $auth.validateUser();
        }
      }
    })
    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/dashboard/tab-dash.html',
          controller: 'AccountCtrl'
        }
      }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

  });
})();
