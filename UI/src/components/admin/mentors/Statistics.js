import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { scaleLinear } from "d3-scale";
import * as _ from "lodash";
import {
  HeatmapSeries,
  LabelSeries,
  XAxis,
  XYPlot,
  YAxis
} from "react-vis";

class Statistics extends Component {

  render() {
    const { mentors } = this.props;
    const unis = _.uniq(mentors.map(m => m.university));
    const area = _.uniq(mentors.map(m => m.area));


    const data = unis.reduce((acc, uni) => {
      return acc.concat(
        area.map((area) => {
          const mentorsAtUniStudyingArea =  mentors.filter(m => {
            return m.university === uni && m.area === area;
          }).length;
          return {
            x: uni,
            y: area,
            color: mentorsAtUniStudyingArea
          };
        })
      );
    }, []);


    const { min, max } = data.reduce(
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
      <Container fluid>
        <XYPlot
          xType="ordinal"
          xDomain={unis}
          yType="ordinal"
          yDomain={area}
          margin={120}
          width={600}
          height={600}
        >
          <XAxis orientation="top"/>
          <YAxis />
          <HeatmapSeries
            colorType="literal"
            getColor={d => exampleColorScale(d.color)}
            style={{
              stroke: "white",
              strokeWidth: "2px",
              rectStyle: {
                rx: 10,
                ry: 10
              }
            }}
            className="heatmap-series-example"
            data={data}
          />
          <LabelSeries
            data={data}
            labelAnchorX="middle"
            labelAnchorY="baseline"
            getLabel={d => `${d.color}`}
          />
        </XYPlot>
      </Container>
    );
  }

};


export default Statistics;
