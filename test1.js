
/*adding a function to draw the data  that obtains the data from a json file in the example*/

function draw(datos) {
  var svg = d3.select("svg"),
    margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

  var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var data = datos; /* datos here represents the name of the variable containing data of json type*/

  for (var dato in data) {
    var d = data[dato];

    x.domain(data.map(function (d) { return d.valueX; }));
    y.domain([0, d3.max(data, function (d) { return d.valueY; })]);

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("valueY");

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function (d) { return x(d.valueX); })
      .attr("y", function (d) { return y(d.valueY); })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(d.valueY); });
  }

}