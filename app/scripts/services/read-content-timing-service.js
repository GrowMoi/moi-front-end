(function () {
  'use strict';

  angular
    .module('moi.services')
    .factory('ReadContentTimingService', ReadContentTimingService);

  function ReadContentTimingService($http, ENV) {
    var service = {
      stopsReading: stopsReading,
      startsReading: startsReading
    };

    return service;

    function startsReading(content) {
      Bucky.timer.start(
        contentKey(content)
      );
    }

    function stopsReading(content) {
      var key = contentKey(content),
          start = Bucky.timer.TIMES[key],
          time = Bucky.timer.now() - start;
      postTime(content, time);
    }

    function postTime(content, time) {
      var uri = '/api/neurons/' + content.neuron_id + '/contents/' + content.id + '/reading_time';//jshint ignore:line
      return $http({
        method: 'POST',
        url: ENV.apiHost + uri,
        data: { time: time }
      });
    }

    function contentKey(content) {
      var prefixKey = 'read.content.';
      return prefixKey + content.id;
    }
  }
})();
