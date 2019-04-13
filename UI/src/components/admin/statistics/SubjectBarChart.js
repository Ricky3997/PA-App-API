import React from "react";
import { Bar } from "react-chartjs";
import * as _ from "lodash";

const SubjectBarChart = ({ mentors }) => {

  let subjects = {};

  _.uniq(mentors.map(u => u.subject)).forEach(a => {
    subjects[a] = mentors.filter(m => m.subject === a).length;
  });


  return <Bar height={300} data={{
    labels: Object.keys(subjects),
    datasets: [{
      data: Object.values(subjects),
      fillColor: "rgba(56,26,0,0.76)",
      strokeColor: "rgba(36,6,3,0.93)",
      highlightFill: "rgba(102,6,0,0.75)",
      highlightStroke: "rgb(62,0,30)",
      borderWidth: 1,
      label: "Suject"
    }]
  }}
  />;
};


export default SubjectBarChart;
