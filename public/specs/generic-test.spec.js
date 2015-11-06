var chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require("sinon-chai"),
    expect = chai.expect;

    chai.use(sinonChai);

describe('Visualization Library', function() {
  var $rootScope,
      spy;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(function(_$rootScope_) {
    $rootScope = _$rootScope_;
  }));

  beforeEach(function() {
    spy = {
      method : sinon.spy(),
    };
  });

  beforeEach(function () { clock = sinon.useFakeTimers(); });

  it('should do stuff', function() {
    //expect(visualizationLibrary.stuff).to.be.defined;
  });
});
