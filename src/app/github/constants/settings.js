(function(angular) {
  'use strict';

  var settings = {
    SERVICE: {
      GITHUB: {
        ROOT: 'https://api.github.com',
        USERS: '/users',
        REPOS: '/repos'
      }
    }
  };

  angular.module('app').constant('SETTINGS', settings);

})(window.angular);
