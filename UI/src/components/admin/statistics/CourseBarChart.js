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
      fillColor: "rgba(7,56,25,0.76)",
      strokeColor: "rgba(5,36,16,0.93)",
      highlightFill: "rgba(12,102,41,0.75)",
      highlightStroke: "rgb(6,62,24)",
      borderWidth: 1,
      label: 'Course'
    }] }}
  />
};


export default CourseBarChart;
