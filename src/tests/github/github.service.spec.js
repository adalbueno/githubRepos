'use strict';

describe('githubService specs - ', function() {
  var _githubService;

  beforeEach(module('app'));

  beforeEach(window.inject(function(_githubService_) {
    _githubService = _githubService_;
  }));

  describe('get', function() {
    it('Should throw missing params', function() {
      var result = function() {
        return _githubService.get();
      };
      expect(result).toThrow('Missing user parameter');
    });
  });

});
