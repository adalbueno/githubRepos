(function(angular) {
  'use strict';

  function routesConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/github-repos.html',
        controller: 'githubController',
        controllerAs: 'ctrl'
      });
  }

  angular.module('app').config(routesConfig);

})(window.angular);
