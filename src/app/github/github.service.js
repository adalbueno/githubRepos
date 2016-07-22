(function(angular) {
  'use strict';

  function githubService($http, SETTINGS) {

    // private variables
    var githubService = SETTINGS.SERVICE.GITHUB;

    /**
     * Get repositories from the http service
     */
    function get(user) {
      if (!user) {
        throw 'Missing user parameter';
      }
      return $http.get(getReposUrl(user));
    }

    function getReposUrl(user) {
      if (!user) {
        throw 'Missing user parameter';
      }

      user = '/' + user;
      return githubService.ROOT + githubService.USERS + user + githubService.REPOS;
    }

    // EXPOSED METHODS
    return {
      get: get
    };

  }

  angular.module('app').service('githubService', githubService);

})(window.angular);
