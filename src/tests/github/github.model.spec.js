'use strict';

describe('githubModel specs - ', function() {
  var _githubModel;

  beforeEach(module('app'));

  beforeEach(window.inject(function(_githubModel_) {
    _githubModel = _githubModel_;
  }));

  describe('getRepos', function() {
    it('Should throw missing params', function() {
      var result = function() {
        return _githubModel.getRepos();
      };
      expect(result).toThrow('Missing user parameter');
    });
  });

  describe('data', function() {
    it('should return a object', function() {
      var data = _githubModel.data();
      expect(data).toEqual({});
    });
  });

});
