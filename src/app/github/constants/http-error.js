(function(angular) {
  'use strict';

  var httpError = {
    NOT_FOUND: 404,
    TIMEOUT: 408,
    UNKNOW: 500
  };

  angular.module('app').constant('HTTP_ERROR', httpError);

})(window.angular);
