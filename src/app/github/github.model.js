(function(angular) {
  'use strict';

  function githubModel(githubService, githubErrors) {

    // PROPERTIES
    var _data = {};

    // MODEL IMPLEMENTATION
    /**
     * Get all repositories from an user at the github service
     * @param {string} user - GitHub username
     */
    function getRepos(user) {
      if (!user) {
        throw 'Missing user parameter';
      }
      return githubService.get(user).then(onGetSuccess, onGetError);
    }

    /**
     * Get user repositories success handler
     * @param {object} result - Response object
     */
    function onGetSuccess(result) {
      _data.result = result.data;
      _data.error = null;

      if (!_data.result.length) {
        _data.error = githubErrors[0];
      }
    }

    /**
     * Get user repositories success handler
     * @param {object} result - Response object
     */
    function onGetError(result) {
      _data.error = githubErrors[result.status];
      _data.result = null;
    }

    /**
     * Get list of repositories
     */
    function data() {
      return _data;
    }

    // EXPOSED METHODS
    return {
      data: data,
      getRepos: getRepos
    };

  }

  angular.module('app').factory('githubModel', githubModel);

})(window.angular);
