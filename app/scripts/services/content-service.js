(function () {
'use strict';

  angular
    .module('moi.services')
    .factory('ContentService', ContentService);

  function ContentService($http,
                          $state,
                          ENV,
                          ModalService,
                          $q,
                          $auth) {
    var service = {
      readContent: readContent,
      addNotesToContent: addNotesToContent,
      recommendedContents: recommendedContents,
      changeImageStatus: changeImageStatus,
      getContent: getContent
    };
    var dialogContentModel = {
      title: 'Error',
      message: ''
    };

    var dialogOptions = {
      templateUrl: 'templates/partials/modal-error.html',
      model: dialogContentModel
    };

    return service;

    function readContent(content) {
      /*jshint camelcase: false */
      var contentId = content.id,
          neuronId = content.neuron_id;

      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/neurons/' + neuronId + '/contents/' + contentId + '/read',
        data: {}
      }).then(function success(res) {
        return res;
      }, function error(err) {
        dialogContentModel.message = err.statusText;
        if(err.status === 422){
          dialogOptions.onHide = function() {
            $state.go('tree', {
              username: $auth.user.username
            });
          };
          ModalService.showModel(dialogOptions);
        }else if(err.status !== 404){
          ModalService.showModel(dialogOptions);
        }
        return $q.reject(err);
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
        if(err.status !== 404){
          dialogContentModel.message = err.statusText;
          ModalService.showModel(dialogOptions);
        }
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
        if(err.status !== 404){
          dialogContentModel.message = err.statusText;
          ModalService.showModel(dialogOptions);
        }
        return err;
      });
    }

    function changeImageStatus(params){
      var contentId = params.contentId,
          neuronId = params.neuronId;
      return $http({
        method: 'POST',
        url: ENV.apiHost + '/api/neurons/' + neuronId + '/contents/' + contentId + '/media_open',
        data: {
          media_url: params.mediaUrl //jshint ignore:line
        }
      }).then(function success(res) {
        return res;
      }, function error(err) {
        if(err.status !== 404){
          dialogContentModel.message = err.statusText;
          ModalService.showModel(dialogOptions);
        }
        return err;
      });
    }

    function getContent(params) {
      return $http({
        method: 'GET',
        url: ENV.apiHost + '/api/neurons/' + params.neuronId + '/contents/' + params.contentId
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        if(err.status !== 404){
          dialogContentModel.message = err.statusText;
          ModalService.showModel(dialogOptions);
        }
      });
    }
  }
})();
