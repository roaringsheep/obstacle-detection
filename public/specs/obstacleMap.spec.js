var d3 = require('d3');
var chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require("sinon-chai"),
    expect = chai.expect;

    chai.use(sinonChai);

describe('obstacle detection h.u.d.', function() {
  var element, compiledElement;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(function($rootScope, $compile) {
    element = angular.element('<obstacle-map></obstacle-map>');
    compiledElement = $compile(element)($rootScope.$new());
    $rootScope.$digest();
  }));

  it('should render the containing div', function() {
    expect(compiledElement).to.not.be.null;

    expect(compiledElement.attr('class')).to.contain('obstacle-map-container');
  });

  it("should resize to it's container", inject(function($compile, $rootScope) {
  }));

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
