(function(){
  'use strict';

  angular.module('moi', [
    'ionic',
    'config',
    'moi.controllers',
    'moi.services',
    'moi.directives',
    'ng-token-auth',
    'pascalprecht.translate',
    'videosharing-embed',
    'ionic.contrib.drawer'
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
    .state('neuron', {
      url: '/neuron/{neuronId:int}',
      controller: 'NeuronController',
      controllerAs: 'vm',
      cache: false,
      templateUrl: 'templates/neuron/neuron.html',
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
    .state('content', {
      url: '/neuron/{neuronId:int}/content/{contentId:int}',
      controller: 'ContentController',
      controllerAs: 'vm',
      templateUrl: 'templates/content/content.html',
      resolve: {
        content: function(NeuronService, $stateParams, ContentService){
          var contentSelected = {};
          return NeuronService.getNeuron($stateParams.neuronId).then(function(data) {
            data.neuron.contents.some(function(content) {
              if (content.id === $stateParams.contentId){
                contentSelected = content;
                return true;
              }
            });
            return ContentService.recommendedContents(contentSelected).then(function(data){
                  contentSelected.recommended = data.contents;
                  return contentSelected;
            });
          });
        }
      }
    })
    .state('tree', {
      url: '/tree',
      controller: 'TreeController',
      controllerAs: 'treeModel',
      templateUrl: 'templates/tree/tree.html',
      resolve: {
        data: function(TreeService){
          return TreeService.getNeuronsUser().then(function(data) {
            return data;
          });
        }
      }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

  });
})();
