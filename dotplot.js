"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var colors = {
  y1990: "#00a2ce",
  y2013: "#4d430c"
};

var dotRadius = 8;

var baseData = [{ region: "Developed regions", y1990: 7.6, y2013: 3.4 }, { region: "Developing regions", y1990: 36.4, y2013: 22 }, { region: "Northern Africa", y1990: 30, y2013: 13.3 }, { region: "Sub-Saharan Africa", y1990: 45.5, y2013: 31.1 }, { region: "Latin America and the Caribbean", y1990: 22.1, y2013: 9.2 }, { region: "Caucasus and Central Asia", y1990: 25.7, y2013: 14.8 }, { region: "Eastern Asia", y1990: 24.5, y2013: 7.7 }, { region: "Eastern Asia excluding China", y1990: 11.6, y2013: 7.5 }, { region: "Southern Asia", y1990: 50.6, y2013: 29.5 }, { region: "Southern Asia excluding India", y1990: 49.3, y2013: 30.1 }, { region: "South-eastern Asia", y1990: 27.4, y2013: 14.4 }, { region: "Western Asia", y1990: 27.5, y2013: 13.7 }, { region: "Oceania", y1990: 26.3, y2013: 21.3 }, { region: "World", y1990: 33.3, y2013: 20 }];

var data = [].concat(_toConsumableArray(baseData.map(function (d) {
  return { region: d.region, type: "y1990", value: d.y1990 };
})), _toConsumableArray(baseData.map(function (d) {
  return { region: d.region, type: "y2013", value: d.y2013 };
})));

var lineAnnotations = baseData.map(function (d) {
  return Object.assign({ type: "range" }, d);
});

function drawRange(_ref) {
  var d = _ref.d,
      rScale = _ref.rScale,
      orFrameState = _ref.orFrameState;

  if (d.type === "range") {
    var start = rScale(d.y1990) - dotRadius;
    var end = rScale(d.y2013) + dotRadius;
    var y = orFrameState.projectedColumns[d.region].middle;
    return React.createElement("line", {
      key: "connector-" + d.region,
      x1: start,
      x2: end,
      y1: y,
      y2: y,
      style: { stroke: "black", strokeWidth: 2 }
    });
  }
  return null;
}

var dotplot = React.createElement(Semiotic.ORFrame, {
  title: "Neonatal Mortality Rate by Region",
  size: [700, 500],
  data: data,
  rAccessor: function rAccessor(d) {
    return d.value;
  },
  oAccessor: function oAccessor(d) {
    return d.region;
  },
  style: function style(d, i) {
    return {
      fill: colors[d.type],
      stroke: "white",
      strokeWidth: 1
    };
  },
  type: { type: "point", r: dotRadius },
  projection: "horizontal",
  axis: { orient: "bottom", tickFormat: function tickFormat(d) {
      return d + "%";
    } },
  margin: { left: 215, top: 50, bottom: 40, right: 10 },
  oPadding: 10,
  svgAnnotationRules: drawRange,
  annotations: lineAnnotations,
  pieceHoverAnnotation: true,
  oLabel: function oLabel(d) {
    return React.createElement(
      "text",
      { style: { textAnchor: "end" }, transform: "translate(-15,6)" },
      d
    );
  }
});