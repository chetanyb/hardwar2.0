import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

function WaterPhChart({ data }) {
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
        .domain([0, d3.max(data, (d) => d.waterPh)])
        .nice()
        .range([250, 50]);

      const line = d3
        .line()
        .x((d) => x(new Date(d.time)))
        .y((d) => y(d.waterPh));

      svg
        .append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "purple")
        .style("stroke-width", 2);

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

  return <svg ref={ref} width="400" height="300"></svg>;
}

export default WaterPhChart;
