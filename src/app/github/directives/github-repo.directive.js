(function(angular) {
  'use strict';

  function githubRepo() {
    return {
      restrict: 'E',
      scope: {
        ngModel: '='
      },
      template: [
        '<span class="repo-name" ng-bind="ngModel.name"></span>',
        '<span class="repo-description" ng-bind="ngModel.description"></span>',
        '<a href="{{ ngModel.html_url }}" ng-bind="ngModel.html_url" target="_blank"></a>'
      ].join('')
    };
  }

  angular.module('app').directive('githubRepo', githubRepo);

})(window.angular);
