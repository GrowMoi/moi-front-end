(function () {
  'use strict';

  angular.module('moi.controllers')
  .controller('SettingsController',
    function (SettingsService, user) {

    var vm = this;
    vm.selectInterest = selectInterest;
    vm.contentSettings = contentSettings;
    vm.listSelected = [];
    /*jshint camelcase: false */
    vm.preferences = user.content_preferences;


    /* TODO
      1. Save interest in the backend with name/kind and image
      2. Associate interest to each user
      3. Create a endpoint to get/update the interests
    */

    vm.interests = [
      {
        interest:'Animals',
        src:'/images/animal-interest.png'
      },
      {
        interest:'Places',
        src:'/images/places-interest.png'
      },
      {
        interest:'Sports',
        src:'/images/sports-interest.png'
      },
      {
        interest:'Comunication',
        src:'/images/comunication-interest.png'
      },
      {
        interest:'Stories',
        src:'/images/stories-interest.png'
      },
      {
        interest:'Art',
        src:'/images/art-interest.png'
      },
      {
        interest:'Emotions',
        src:'/images/emotions-interest.png'
      },
      {
        interest:'Culture',
        src:'/images/culture-interest.png'
      },
      {
        interest:'Space',
        src:'/images/space-interest.png'
      },
      {
        interest:'Numbers',
        src:'/images/numbers-interest.png'
      },
      {
        interest:'Brain',
        src:'/images/brain-interest.png'
      },
      {
        interest:'Plants',
        src:'/images/plants-interest.png'
      }
    ];


    function selectInterest(interest){
      interest.selected = interest.selected === undefined ? true : !interest.selected;
      if (interest.selected) {
        vm.listSelected.push(interest);
      }else{
        var index = vm.listSelected.indexOf(interest);
        vm.listSelected.splice(index, 1);
      }
    }

    function contentSettings(config){
      SettingsService.saveContentSettings(config);
    }

  });

})();