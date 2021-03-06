(function () {
  'use strict';
    angular
      .module('moi.services')
      .factory('UploadImageService', UploadImageService);

    function UploadImageService($http, ENV) {
      var cloudName = ENV.cloudinaryName,
          unsignedUploadPreset = ENV.unsignedUploadPreset;

      var service = {
        uploadFile: uploadFile,
        uploadImageUser: uploadImageUser
      };

      return service;

      function uploadFile(file) {
        var uploadUrl = 'https://api.cloudinary.com/v1_1/'+cloudName+'/upload';
        var formData = new FormData();
        formData.append('upload_preset', unsignedUploadPreset);
        formData.append('tags', 'browser_upload');
        formData.append('file', file);

        return $http({
          url: uploadUrl,
          method: 'POST',
          data: formData,
          headers: { 'Content-Type': undefined,
                    'If-Modified-Since': undefined}
        });
      }

      function uploadImageUser(imageBase64) {
        return $http({
          method: 'PUT',
          url: ENV.apiHost + '/api/users/user_image',
          data: {
            image: imageBase64
          }
        }).then(function success(res) {
          return res.data;
        }, function error(err) {
          return err;
        });
      }
    }
  })();
