/* globals angular, moment */

(function() {
  'use strict';
  angular.module('moi.filters').filter('milliseconds', function() {
    return function(millisecondsString) {
      var milliseconds = parseInt(millisecondsString);
      if (isNaN(milliseconds)) {
        return 0;
      }else{
        var duration = moment.duration(milliseconds)._data;
        var finalString = '';
        if (duration.years > 0) {
          finalString += duration.years + 'a:';
        }
        if (duration.months > 0) {
          finalString += duration.months + 'm:';
        }
        if (duration.days > 0) {
          finalString += duration.days + 'd:';
        }
        if (duration.hours > 0) {
          finalString += duration.hours + 'h:';
        }
        if (duration.minutes > 0) {
          finalString += duration.minutes + 'min:';
        }
        var mseconds = duration.milliseconds / 1000;
        var secondsAndMilliseconds = duration.seconds + mseconds;
        finalString += Math.round(secondsAndMilliseconds) + 's';
        return finalString;
      }
    };
  });
})();
