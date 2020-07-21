import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import PropTypes from "prop-types";
import "./chart.scss";

const Chart = ({ data, chartParams, selectedOffice }) => {
  const { width, height, margin } = chartParams.dimensions;

  const [hierarchy, setHierarchy] = useState(null);
  const svgRef = useRef(null);
  const divRef = useRef(null);
  const legendRef = useRef(null);

  const createHierarchy = (
    data,
    root = "candidate",
    children = ["contributorType"],
    value = "aggregate"
  ) => {
    let nested = d3
      .nest()
      .key((d) => d[root])
      .key((d) => d.contributorType)
      .rollup((leaves) => {
        return {
          total_amount: d3.sum(leaves, (d) => d.amount),
        };
      })
      .entries(data);

    let candidateList = { children: [] };

    nested.forEach((cand) => {
      let candidate = {
        name: cand.key,
        children: [],
      };
      cand.values.forEach((cType) => {
        candidate.children.push({
          name: cType.key,
          value: cType.value.total_amount,
        });
      });
      candidateList.children.push(candidate);
    });

    let h = d3
      .hierarchy(candidateList)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value);

    setHierarchy(h);
  };

  useEffect(() => {
    createHierarchy(data);

    const treemapLayout = d3.treemap();
    treemapLayout.size([width, height]).padding(2);
  }, [data, selectedOffice]);

  useEffect(() => {
    if (!hierarchy) return;

    // tooltip
    let tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .attr("id", "treemap-tooltip")
      .style("opacity", 0);

    const colorScale = d3.scaleOrdinal(d3.schemeSet2);

    const treemapGenerator = d3
      .treemap()
      .size([width, height])
      .padding(2)
      .paddingTop(8)
      .paddingRight(8)
      .round(true);

    const root = treemapGenerator(hierarchy);

    const svg = d3.select(svgRef.current);

    const leaf = svg
      .selectAll("g")
      .data(root.leaves())
      .join("g")
      .attr("class", "leaf")
      .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

    const rect = leaf
      .append("rect")
      .attr("fill", (d) => colorScale(d.data.name))
      .attr("class", "treemap-contributor-type")
      .attr("fill-opacity", 0.6)
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0);

    rect.on("mouseover", (d) => {
      const halfpage = width / 2;
      tooltip
        .style("opacity", 0.9)
        .html(
          `${d.parent.data.name}<hr />
					${d.data.name}: $${Math.round(d.data.value).toLocaleString()}<br />
					Total: $${Math.round(d.parent.value).toLocaleString()}`
        )
        .style(
          "left",
          d3.event.pageX < halfpage
            ? `${d3.event.pageX + 10}px`
            : `${d3.event.pageX - 125}px`
        )
        .style("top", `${d3.event.pageY + 24}px`);
    });

    rect.on("mouseout", (d) => {
      tooltip
        .style("opacity", 0)
        .html(``)
        .style("left", `0px`)
        .style("top", `0px`);
    });

    const legendContainer = d3.select(legendRef.current).attr("id", "legend");

    const legend = legendContainer
      .selectAll("#legend")
      .data(colorScale.domain())
      .join("g")
      .attr("class", "legend-label")
      .attr("transform", () => `translate(${width / 2}px,${height - 30}px)`);

    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", (d, i) => height + 22 * i)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", (d) => colorScale(d));

    legend
      .append("text")
      .text((d) => d)
      .attr("class", "legend")
      .attr("x", 24)
      .attr("y", (d, i) => height + 14 + 22 * i);

    leaf.each((d, i, arr) => {
      const current = arr[i];

      const left = d.x0;
      const right = d.x1;
      const width = right - left;

      const top = d.y0;
      const bottom = d.y1;
      const height = bottom - top;

      const tooSmall = width < 70 || height < 50;

      const text = d3
        .select(current)
        .append("text")
        .attr("opacity", 0.9)
        .selectAll("tspan")
        .data((d) => [
          d.parent.data.name.split(",")[0],
          `$${Math.round(d.value).toLocaleString()}`,
        ])
        .join("tspan")
        .attr("class", "treemap-static-text")
        .style("font-size", (d) => (tooSmall ? "0" : ".9em"))
        .attr("x", 3)
        .attr("y", (d, i) => `${1.5 + 1.5 * i}em`)
        .text((d) => d);
    });

    return () => {
      leaf.selectAll("rect").remove();
      leaf.selectAll("text").remove();
      leaf.selectAll("title").remove();
      legendContainer.selectAll("g").remove();
    };
  }, [hierarchy]);

  return (
    <>
      <div ref={divRef} className="chart-wrapper">
        <h2>{selectedOffice}</h2>
        {data && (
          <svg
            ref={svgRef}
            viewBox={`0 0 ${width} ${height + margin.top + margin.bottom}`}
            className="chart-outer"
          >
            <g ref={legendRef} id="chart-legend"></g>
          </svg>
        )}
      </div>
      <h4>
        Data from State of Hawaii Campaign Spending Commission (as of 6/30/20)
      </h4>
    </>
  );
};

export default Chart;

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  chartParams: PropTypes.object.isRequired,
  selectedOffice: PropTypes.string,
};
