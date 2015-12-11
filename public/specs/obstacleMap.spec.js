var d3 = require('d3');
var chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require("sinon-chai"),
    expect = chai.expect,
    angular = require("angular");

    chai.use(sinonChai);

describe('obstacle detection h.u.d.', function() {
  var element, compiledElement;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(function($rootScope, $compile, $timeout) {
    element = angular.element('<obstacle-map></obstacle-map>');
    compiledElement = $compile(element)($rootScope.$new());
    $rootScope.$digest();
  }));

  it('should render the containing div', function() {
    expect(compiledElement).to.not.be.null;

    expect(compiledElement.attr('class')).to.contain('obstacle-map-container');
  });

  it('should render the SVG element at the default size', function() {
    var svg = compiledElement.find('svg');

    expect(svg).to.not.be.null;

    var rect = svg.find('rect');

    expect(rect).to.not.be.null;

    // expect the rect element to have the default width & height in the test
    // environment, since we don't have a real window to render the output
    // into.
    expect(rect.attr('width')).to.be.equal('960');
    expect(rect.attr('height')).to.be.equal('500');
  });

  it('should render the drone onto the map', function() {
    var drone = compiledElement.find('image');

    expect(drone).to.not.be.null;
  });

  it('should render obstacles onto the map', function() {
    var obstacles = compiledElement.find('circle');

    expect(obstacles).to.not.be.null;

    expect(obstacles.length).to.be.at.least(1);
  });

  it('should render range indicators for obstacles that are not in the viewport', function() {
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
