import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

function NPKChart({ data }) {
  const ref = useRef();

  useEffect(() => {
    if (data) {
      const svg = d3.select(ref.current);
      svg.selectAll("*").remove(); // Clear previous contents

      const x = d3
        .scaleTime()
        .domain(d3.extent(data, (d) => new Date(d.time)))
        .range([50, 350]);

      const y = d3
        .scaleLinear()
        .domain([0, 100]) // assuming values are within range of 0 to 100
        .nice()
        .range([250, 50]);

      const line = d3.line().x((d) => x(new Date(d.time)));

      ["Nitrogen", "Phosphorus", "Potassium"].forEach((nutrient, index) => {
        svg
          .append("path")
          .datum(data)
          .attr("class", "line")
          .attr(
            "d",
            line.y((d) => y(d[nutrient]))
          )
          .style("fill", "none")
          .style("stroke", d3.schemeCategory10[index])
          .style("stroke-width", 2);
      });

      svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0,250)")
        .call(d3.axisBottom(x));

      svg
        .append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(50,0)")
        .call(d3.axisLeft(y));
    }
  }, [data]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <svg ref={ref} width="400" height="300"></svg>
    </div>
  );
}

export default NPKChart;
