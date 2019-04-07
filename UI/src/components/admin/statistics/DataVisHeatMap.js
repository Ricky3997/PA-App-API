import React from "react";
import { scaleLinear } from "d3-scale";
import { HeatmapSeries, LabelSeries, XAxis, XYPlot, YAxis } from "react-vis";
import * as _ from "lodash";
import defaults from "../../../defaults/defaults";

const DataVisHeatMap = ({ mentors, mentees }) => {

  let xDomain, yDomain, data;

  const unis = [...defaults.universities.UK, ...defaults.universities.US].map(u => u.name);
  const courses = _.uniq([...mentors.map(m => m.subject), ...mentees.flatMap(m => m.coursesApplyingFor)]);
  xDomain = unis;
  yDomain = courses;
  data = unis.reduce((acc, uni) => {
    return acc.concat(
      courses.map((course) => {
        const mentorsAtUniStudyingArea = mentors.filter(m => {
          return m.university === uni && m.subject === course;
        }).length;

        const menteesInterestedInSubjectAtUni = mentees.filter(m => {
          return _.some(m.unisApplyingFor, u => u === uni) && _.some(m.coursesApplyingFor, s => s === course);
        }).length;

        return {
          x: uni,
          y: course,
          mentees: menteesInterestedInSubjectAtUni, //Math.floor(Math.random() * 100),
          mentors: mentorsAtUniStudyingArea //Math.floor(Math.random() * 100),
        };
      })
    );
  }, []);

  const { min, max } = data.reduce(
    (acc, row) => ({
      min: Math.min(acc.min, row.mentees - row.mentors),
      max: Math.max(acc.max, row.mentees - row.mentors)
    }),
    { min: Infinity, max: -Infinity }
  );


  const exampleColorScale = scaleLinear()
  // .domain([min, (min+max/2), max])
    .domain([max, 0, min])
    .range(["#e61c24",
      "#ffe97c",
      "#289b00"
    ]);

  //TODO LOGOS ON AXES
  //TODO COLOR SCALE

  return (
    <div>
      <XYPlot
        xType="ordinal"
        xDomain={xDomain}
        yType="ordinal"
        yDomain={yDomain}
        margin={160}
        width={1500}
        height={_.uniq(_.map(data, u => u.y)).length*70 < 500 ? 500 : _.uniq(_.map(data, u => u.y)).length*70}>
        <XAxis orientation="top"/>
        <YAxis tickLabelAngle={-60}/>
        <HeatmapSeries
          colorType="literal"
          getColor={d => exampleColorScale(d.mentees - d.mentors)}
          style={{
            textSize: "8px",
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
          animation
          data={data}
          labelAnchorX="middle"
          labelAnchorY="baseline"
          getLabel={d => `${d.mentees}/${d.mentors}`}
        />
      </XYPlot>
    </div>
  );

};


export default DataVisHeatMap;
