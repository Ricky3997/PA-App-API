import React from "react";
import { Bar } from "react-chartjs";
import * as _ from 'lodash'

const CourseBarChart = ({ mentors, mentees }) => {

  let areas = {};
  if(mentors){
    _.uniq(mentors.map(u => u.area)).forEach(a => {
      areas[a] = mentors.filter( m => m.area === a).length;
    })
  } else {
    _.uniq(_.flatMap(mentees.map(u => u.interestedIn))).forEach(u => {
      areas[u] = mentees.filter( m => _.some(m.interestedIn, i => i === u)).length;
    })
  }

  return <Bar height={300} data={{
    labels: Object.keys(areas),
    datasets: [{
      data: Object.values(areas),
      fillColor: "rgba(205,75,33,0.5)",
      strokeColor: "rgba(205,42,46,0.8)",
      highlightFill: "rgba(229,48,36,0.75)",
      highlightStroke: "rgb(255,75,41)",
      borderWidth: 1,
      label: 'Course'
    }] }}
  />
};


export default CourseBarChart;
