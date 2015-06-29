
describe('Test trivial SVG', function() {

  var rootSelector = '#for-d3';

  beforeEach(function() {
    blankSvg().render(rootSelector);
  });

  afterEach(function() {
    d3.selectAll('svg').remove();
  });

  describe('the svg' ,function() {
    it('should be created', function() {
        expect(getSvg()).not.toBeNull();
    });

    it('should have the correct height', function() {
      expect(getSvg().attr('width')).toBe('500');
    });

    it('should have the correct width', function() {
      expect(getSvg().attr('height')).toBe('500');
    });
  });

  function getSvg() {
    return d3.select(rootSelector + ' svg');
  }

});
