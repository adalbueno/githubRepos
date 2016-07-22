(function(angular) {
  'use strict';

  function githubController(githubModel) {

    // PROPERTIES
    var vm = this;
    vm.loadRepos = loadRepos;

    // CONTROLLER IMPLEMENTATION

    /**
     * Gets the data from the model and update repositories list
     */
    function loadRepos(user) {
      githubModel.getRepos(user)
                 .then(updateRepos);
    }

    /**
     * Update repositories list
     */
    function updateRepos() {
      var model = githubModel.data();
      vm.repos = model.result;
      vm.error = model.error;
    }
  }

  angular.module('app').controller('githubController', githubController);

})(window.angular);
