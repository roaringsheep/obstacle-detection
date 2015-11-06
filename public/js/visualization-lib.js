"use strict";

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

VisualizationLib.Util.calculateDistance = function(currCorner, circlePts) {
  var x = circlePts[0],
      y = circlePts[1],
      centerX = currCorner[0] + (width/2),
      centerY = currCorner[1] + (height/2),
      viewBox = [[centerX - (width/2) - radius, centerX + (width/2) + radius], [centerY - (height/2) - radius, centerY + (height/2) + radius]],
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

VisualizationLib.Util.makeWarningData = function(point, currCorner, region) {
  var x = point[0],
      y = point[1],
      x0 = currCorner[0],
      x1 = currCorner[0] + width,
      y0 = currCorner[1],
      y1 = currCorner[1] + height,
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

  warnPt.push(VisualizationLib.Util.calculateDistance(currCorner, point));
  return warnPt;
}

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

var width = 960,
    height = 500,
    radius = 20,
    droneHeight = 50,
    droneWidth = 50;

var data = d3.range(50).map(function() {
  return [
    VisualizationLib.Util.randomX(),
    VisualizationLib.Util.randomY()
  ];
});

var x = d3.scale.linear()
    .domain([0, width])
    .range([width, 0]);

var y = d3.scale.linear()
    .domain([0, height])
    .range([height, 0]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("class", "zoom-container")
    .call(d3.behavior.zoom().x(x).y(y).scale(1).scaleExtent([1, 1])
    .on("zoom", zoom));

var rect = svg.append("rect")
    .attr("class", "overlay")
    .attr("width", width)
    .attr("height", height);

var circle = svg.selectAll("circle")
    .data(data)
    .enter().append("circle")
    .attr("r", radius)
    .attr("transform", transform);

var drone = svg.selectAll(".drone")
    .data([width / 2, height / 2])
    .enter().append("image")
    .attr("transform","translate(" + (width / 2 - droneWidth / 2)+ "," + (height / 2 - droneHeight / 2) + ")")
    .attr("xlink:href","./css/images/drone.png")
    .attr("height", droneHeight + "px")
    .attr("width", droneWidth + "px");

var currCorner,
    centerPt = [],
    viewBox = [],
    detectionBox = [],
    inrange = [],
    howmany,
    region;

function createWarnings(currCorner) {
  circle.data().forEach(function(datum) {
    if (VisualizationLib.Util.inTheBox(datum, detectionBox) &&
      !VisualizationLib.Util.inTheBox(datum, viewBox)) {

      inrange.push(VisualizationLib.Util.makeWarningData(
        datum,
        currCorner,
        VisualizationLib.Util.findRegion(datum, viewBox)));

      howmany++;
    }
  });
}

var container, g;

function zoom() {
  inrange.length = 0;

  svg.selectAll("g").data(inrange).exit().remove();

  howmany = 0;
  currCorner = d3.event.translate;
  centerPt = [currCorner[0] + (width/2), currCorner[1] + (height/2), radius];
  var dronePt = [centerPt[0] - droneWidth/2, centerPt[1] + droneHeight/2];
  viewBox = [[centerPt[0] - (width/2) - radius, centerPt[0] + (width/2) + radius], [centerPt[1] - (height/2) - radius, centerPt[1] + (height/2) + radius]];
  var smallBox = [[centerPt[0] - 50, centerPt[0] + 50], [centerPt[1] - 50, centerPt[1] + 50]];
  detectionBox = [[centerPt[0] - (width + radius), centerPt[0] + (width + radius)],[centerPt[1] - (height + radius), centerPt[1] + (height + radius)]];
  circle.data(data).enter().append("circle");

  drone.data(dronePt).enter().append("image");

  createWarnings(currCorner);

  // red dots
  var container = svg.selectAll("g").data(inrange)
    .enter().append("g")
    .attr("transform", transform)

  container.append("ellipse")
    .attr("rx", function(d) { return Math.min(2000/(d[2] + 1), radius);})
    .attr("ry", function(d) { return Math.min(2000/(d[2] + 1), radius); })
    .style("fill", "red")
    .style("fill-opacity", .7);

  container.append("text")
    .attr("x", function(d) { return -1*Math.min(1000/(d[2] + 1), 7);})
    .attr("y", function(d) { return Math.min(700/(d[2] + 1), 5);})
    .attr("font-size", function(d) { return Math.min(2000/(d[2] + 1), 17);})
    .text(function(d){ return parseInt(d[2]); })
    .style("fill", "white")
    .style("font-weight", "bold");

// svg.append("line").attr("x1", x(250)).attr("y1", y(250)).attr("x2", x(width/2)).attr("y2", y(height/2)).attr("stroke", "gray")
//     .attr("stroke-width", 3)
//     .attr("stroke-dasharray", "4, 3");

//   svg.selectAll("line").data(inrange).append("line")
//     .attr("stroke", "gray")
//     .attr("stroke-width", 3)
//     .attr("stroke-dasharray", "4, 3")
//     .attr("x1", x(0))
//     .attr("y1", y(0))
//     .attr("x2", function(d) { return x(1000); })
//     .attr("y2", function(d) { return y(1100); });

  // obstacle selections
  circle.attr("transform", transform);
}

function transform(d, i) {
  return "translate(" + x(d[0]) + "," + y(d[1]) + ")";
}

circle.style("stroke", VisualizationLib.Util.randomColor);
circle.style("fill", VisualizationLib.Util.randomColor);
