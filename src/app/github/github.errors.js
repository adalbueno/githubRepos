(function(angular) {
  'use strict';

  function githubErrors() {

    return {
      0:   'Github user has no repositories',
      404: 'Github user not found!',
      408: 'OPS! It seems Github is not online. We got a timeout error!',
      500: 'OPS! We got an unknow error from Github!',
    };

  }

  angular.module('app').factory('githubErrors', githubErrors);

})(window.angular);
