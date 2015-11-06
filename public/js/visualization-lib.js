"use strict";

(function() {
  window.VisualizationLib = window.VisualizationLib || {};
  window.VisualizationLib.Util = window.VisualizationLib.Util || {};

  VisualizationLib.Util.randomColor = function(d, i) {
    var hex = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var color = "";

    while(color.length < 6) {
      var rando = parseInt(Math.random()*16);

      color = color + hex[rando];
    }

    return '#' + color;
  };

  VisualizationLib.Util.randomX = function() { return parseInt(Math.random() * 3000); };
  VisualizationLib.Util.randomY = function() { return parseInt(Math.random() * 3000); };
  VisualizationLib.Util.randomR = function() { return parseInt(Math.random() * 50); };

  VisualizationLib.Util.findRegion = function(point, box) {
    var x = point[0],
        y = point[1],
        x0 = box[0][0],
        x1 = box[0][1],
        y0 = box[1][0],
        y1 = box[1][1];

    if (y >= y1) {
      if (x >= x1) return 'UpperLeft';
      else if (x <= x0) return 'UpperRight';
      else return 'Up';
    }
    else if (y <= y0) {
      if (x >= x1) return 'LowerLeft';
      else if (x <= x0) return 'LowerRight';
      else return 'Low';
    }
    else {
      if (x >= x1) return 'Left';
      else if (x <= x0) return 'Right';
    }

    return "unknown";
  }

  VisualizationLib.Util.inTheBox = function(point, box) {
    var x = point[0],
        y = point[1];

    return
     (x > box[0][0] &&
      x < box[0][1] &&
      y > box[1][0] &&
      y < box[1][1]);
  }

  VisualizationLib.Map = class {
    constructor(w, h, r, dH, dW, elementId) {
      this.width = w || 960;
      this.height = h || 500;
      this.radius = r || 20;
      this.droneHeight = dH || 50;
      this.droneWidth = dW || 50;
      this.currCorner;
      this.centerPt = [];
      this.viewBox = [];
      this.detectionBox = [];
      this.inrange = [];
      this.howmany;
      this.region;

      this.elementId = elementId;

      this.data = d3.range(50).map(function() {
        return [
          VisualizationLib.Util.randomX(),
          VisualizationLib.Util.randomY()
        ];
      });

      this.x = d3.scale.linear()
          .domain([0, this.width])
          .range([this.width, 0]);

      this.y = d3.scale.linear()
          .domain([0, this.height])
          .range([this.height, 0]);

      this.svg = d3.select("body").append("svg")
          .attr("width", this.width)
          .attr("height", this.height)
          .append("g")
          .attr("class", "zoom-container")
          .call(d3.behavior.zoom().x(this.x).y(this.y).scale(1).scaleExtent([1, 1])
          .on("zoom", this.zoom));

      this.rect = this.svg.append("rect")
          .attr("class", "overlay")
          .attr("width", this.width)
          .attr("height", this.height);

      this.circle = this.svg.selectAll("circle")
          .data(this.data)
          .enter().append("circle")
          .attr("r", this.radius)
          .attr("transform", this.transform);

      this.drone = this.svg.selectAll(".drone")
          .data([this.width / 2, height / 2])
          .enter().append("image")
          .attr("transform","translate(" + (this.width / 2 - this.droneWidth / 2)+ "," + (this.height / 2 - this.droneHeight / 2) + ")")
          .attr("xlink:href","./css/images/drone.png")
          .attr("height", this.droneHeight + "px")
          .attr("width", this.droneWidth + "px");



      this.circle.style("stroke", VisualizationLib.Util.randomColor);
      this.circle.style("fill", VisualizationLib.Util.randomColor);
    }

    calculateDistance(currCorner, circlePts) {
      var x = circlePts[0],
          y = circlePts[1],
          centerX = currCorner[0] + (this.width/2),
          centerY = currCorner[1] + (this.height/2),
          viewBox = [[centerX - (thils.width/2) - this.radius, centerX + (this.width/2) + this.radius], [centerY - (this.height/2) - this.radius, centerY + (this.height/2) + this.radius]],
          distance = null;

      var region = VisualizationLib.Util.findRegion([x, y], viewBox);

      switch (region) {
        case 'UpperRight':
          distance = Math.sqrt(Math.pow((viewBox[0][0] - x), 2) + Math.pow((viewBox[1][1] - y), 2));
          break;
        case 'UpperLeft':
          distance = Math.sqrt(Math.pow((viewBox[0][1] - x), 2) + Math.pow((viewBox[1][1] - y), 2));
          break;
        case 'Up':
          distance = Math.abs(viewBox[1][1] - y);
          break;
        case 'LowerRight':
          distance = Math.sqrt(Math.pow((viewBox[0][0] - x), 2) + Math.pow((viewBox[1][0] - y), 2));
          break;
        case 'LowerLeft':
          distance = Math.sqrt(Math.pow((viewBox[0][1] - x), 2) + Math.pow((viewBox[1][0] - y), 2));
          break;
        case 'Low':
          distance = Math.abs(viewBox[1][0] - y);
          break;
        case 'Left':
          distance = Math.abs(viewBox[0][1] - x);
          break;
        case 'Right':
          distance = Math.abs(viewBox[0][0] - x);
          break;
        default: distance = null;
      }

      return distance;
    }

    makeWarningData(point, currCorner, region) {
      var x = point[0],
          y = point[1],
          x0 = currCorner[0],
          x1 = currCorner[0] + this.width,
          y0 = currCorner[1],
          y1 = currCorner[1] + this.height,
          warnPt;

      switch (region) {
        case 'UpperRight':
          warnPt = [x0 + 15, y1 - 15];
          break;
        case 'UpperLeft':
          warnPt = [x1 - 15, y1 - 15];
          break;
        case 'Up':
          warnPt = [x, y1 - 15];
          break;
        case 'LowerRight':
          warnPt = [x0 + 15, y0 + 15];
          break;
        case 'LowerLeft':
          warnPt = [x1 - 15, y0 + 15];
          break;
        case 'Low':
          warnPt = [x, y0 + 15];
          break;
        case 'Left':
          warnPt = [x1 - 15, y];
          break;
        case 'Right':
          warnPt = [x0 + 15, y];
          break;
        default: warnPt = null;
      }

      warnPt.push(this.calculateDistance(currCorner, point));
      return warnPt;
    }

    createWarnings(currCorner) {
      this.circle.data().forEach(function(datum) {
        if (VisualizationLib.Util.inTheBox(datum, this.detectionBox) &&
          !VisualizationLib.Util.inTheBox(datum, this.viewBox)) {

          this.inrange.push(this.makeWarningData(
            datum,
            currCorner,
            VisualizationLib.Util.findRegion(datum, this.viewBox)));

          this.howmany++;
        }
      });
    }

    transform(d, i) {
      return "translate(" + this.x(d[0]) + "," + this.y(d[1]) + ")";
    }

    zoom() {
      this.inrange.length = 0;

      this.svg.selectAll("g").data(this.inrange).exit().remove();

      this.howmany = 0;
      this.currCorner = d3.event.translate;
      this.centerPt = [this.currCorner[0] + (this.width/2), this.currCorner[1] + (this.height/2), this.radius];

      var dronePt = [this.centerPt[0] - this.droneWidth/2, this.centerPt[1] + this.droneHeight/2];

      this.viewBox = [[this.centerPt[0] - (this.width/2) - this.radius, this.centerPt[0] + (this.width/2) + this.radius], [this.centerPt[1] - (this.height/2) - this.radius, this.centerPt[1] + (this.height/2) + this.radius]];

      var smallBox = [[this.centerPt[0] - 50, this.centerPt[0] + 50], [this.centerPt[1] - 50, this.centerPt[1] + 50]];

      this.detectionBox = [[this.centerPt[0] - (this.width + this.radius), this.centerPt[0] + (this.width + this.radius)],[this.centerPt[1] - (this.height + this.radius), this.centerPt[1] + (this.height + this.radius)]];
      this.circle.data(this.data).enter().append("circle");

      this.drone.data(dronePt).enter().append("image");

      this.createWarnings(this.currCorner);

      // red dots
      var container = this.svg.selectAll("g").data(this.inrange)
        .enter().append("g")
        .attr("transform", this.transform)

      container.append("ellipse")
        .attr("rx", function(d) { return Math.min(2000/(d[2] + 1), this.radius);})
        .attr("ry", function(d) { return Math.min(2000/(d[2] + 1), this.radius); })
        .style("fill", "red")
        .style("fill-opacity", .7);

      container.append("text")
        .attr("x", function(d) { return -1*Math.min(1000/(d[2] + 1), 7);})
        .attr("y", function(d) { return Math.min(700/(d[2] + 1), 5);})
        .attr("font-size", function(d) { return Math.min(2000/(d[2] + 1), 17);})
        .text(function(d){ return parseInt(d[2]); })
        .style("fill", "white")
        .style("font-weight", "bold");

      this.circle.attr("transform", this.transform);
    }
  };

  new VisualizationLib.Map();
})();
