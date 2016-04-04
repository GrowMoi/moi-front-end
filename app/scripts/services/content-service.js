(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('ContentService', ContentService);

  function ContentService($http, $ionicPopup, ENV) {
    var service = {
      learnContent: learnContent,
      addNotesToContent: addNotesToContent,
      recommendedContents: recommendedContents
    };

    return service;

    function learnContent(content) {
      /*jshint camelcase: false */
      var contentId = content.id,
          neuronId = content.neuron_id;

      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/neurons/' + neuronId + '/contents/' + contentId + '/learn',
        data: {}
      }).then(function success(res) {
        return res;
      }, function error(err) {
        $ionicPopup.alert({
          title: 'Ups!',
          content: 'Ha ocurrido un error'
        });
        return err;
      });
    }

    function addNotesToContent(content){
      /*jshint camelcase: false */
      var contentId = content.id,
          neuronId = content.neuron_id,
          userNotes = content.user_notes;

      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/neurons/' + neuronId + '/contents/' + contentId + '/notes',
        data: {note: userNotes}
      }).then(function success(res) {
        return res;
      }, function error(err) {
        $ionicPopup.alert({
          title: 'Ups!',
          content: 'Ha ocurrido un error'
        });
        return err;
      });
    }

    function recommendedContents(content){
      /*jshint camelcase: false */
      var neuronId = content.neuron_id,
          kind = content.kind;

      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/neurons/' + neuronId + '/recommended_contents/' + kind
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        $ionicPopup.alert({
          title: 'Ups!',
          content: 'Ha ocurrido un error'
        });
        return err;
      });
    }
  }
})();
