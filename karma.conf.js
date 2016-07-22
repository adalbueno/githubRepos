// Karma configuration
// Generated on Tue Jul 21 2016 21:23:46 GMT-0300 (Horário brasileiro de verão)

module.exports = function(config) {
  'use strict';

  var files = [
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'src/app/**/*.js',
    'src/tests/**/*.js'
  ]

  var preprocessors = {
    'src/app/**/*.js': ['coverage']
  };

  var reporters = [
    'notify',
    'dots',
    'coverage'
  ];

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: files,
    preprocessors: preprocessors,
    reporters: reporters,
    coverageReporter: {
      instrumenterOptions: {
        istanbul: {
          noCompact: true
        }
      },
      check: {
        global: {
          statements: 20,
          branches: 6,
          functions: 14,
          lines: 20
        }
      },
      reporters: [
        {type: 'html', dir: 'tests/reports/coverage/'},
        {type: 'text-summary'}
      ]
    },

    // Notify-Reporter optional Settings
    notifyReporter: {
      // reportEachFailure: true, // Default: false, Will notify on every failed sepc
      reportSuccess: false, // Default: true, Will notify when a suite was successful
    },

    logLevel: config.LOG_INFO,
    colors: true,
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
