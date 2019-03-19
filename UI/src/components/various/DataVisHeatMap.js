import React  from "react";
import { Container } from "react-bootstrap";
import { scaleLinear } from "d3-scale";
import {
  HeatmapSeries,
  LabelSeries,
  XAxis,
  XYPlot,
  YAxis
} from "react-vis";

const DataVisHeatMap = (props) => {

    const { min, max } = props.data.reduce(
      (acc, row) => ({
        min: Math.min(acc.min, row.color),
        max: Math.max(acc.max, row.color)
      }),
      { min: Infinity, max: -Infinity }
    );

    const exampleColorScale = scaleLinear()
      .domain([min, (min + max) / 2, max])
      .range(["red", "orange", "green"]);

    return (
      <div>
        <XYPlot
          style={{textSize: '8px'}}
          xType="ordinal"
          xDomain={props.xDomain}
          yType="ordinal"
          yDomain={props.yDomain}
          margin={100}
          width={600}
          height={600}
        >
          <XAxis orientation="top"
                 style={{textSize: '8px'}}/>
          <YAxis
            style={{textSize: '8px'}}/>
          <HeatmapSeries
            colorType="literal"
            getColor={d => exampleColorScale(d.color)}
            style={{
              textSize: '8px',
              stroke: "white",
              strokeWidth: "4px",
              rectStyle: {
                rx: 10,
                ry: 10
              }
            }}
            className="heatmap-series-example"
            data={props.data}
          />
          <LabelSeries
            data={props.data}
            labelAnchorX="middle"
            labelAnchorY="baseline"
            getLabel={d => `${d.color}`}
          />
        </XYPlot>
      </div>
    );

};


export default DataVisHeatMap;
