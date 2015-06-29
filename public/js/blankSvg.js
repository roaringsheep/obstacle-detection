function blankSvg() {
  var that = {};

  that.render = function(appendTo) {
     var svg = d3.select(appendTo)
          .append('svg')
            .attr('height', '500')
            .attr('width', '500');

  };

  return that;
}
