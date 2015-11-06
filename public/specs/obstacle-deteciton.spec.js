var chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require("sinon-chai"),
    expect = chai.expect;

    chai.use(sinonChai);

describe('obstacle detection h.u.d.', function() {
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

  it("should resize to it's container", function() {

  });

  it("should pan viewport with mouse click and drag", function() {

  });

  it("should pan viewport with touch drag", function() {

  });

  it("should zoom viewport with mouse scroll-wheel", function() {

  });

  it("should zoom viewport with touch pinch", function() {

  });

  it("should position obstacles accurately", function() {

  });

  it("should indicate obstacles out of view but in range", function() {

  });

  it("should position the drone's location accurately", function() {

  });
});
