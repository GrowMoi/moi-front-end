(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('ContentService', ContentService);

  function ContentService($http,
                          $ionicPopup,
                          ENV) {
    var service = {
      learnContent: learnContent
    };

    return service;

    function learnContent(content) {
      var contentId = content.id,
          neuronId = content.neuron_id;

      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/neurons/' + neuronId + '/contents/' + contentId + '/learn'
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
  }
})();
