import React from "react";
import { Bar } from "react-chartjs";
import * as _ from 'lodash'

const UniversityBarChart = ({ mentors, mentees }) => {

  let unis = {};
  if(mentors){
    _.uniq(mentors.map(u => u.university)).forEach(u => {
      unis[u] = mentors.filter( m => m.university === u).length;
    })
  } else {
    _.uniq(_.flatMap(mentees.map(u => u.unisApplyingFor))).forEach(u => {
      unis[u] = mentees.filter( m => _.some(m.unisApplyingFor, i => i === u)).length;
    })
  }

  return <Bar height={300} data={{
    labels: Object.keys(unis),
    datasets: [{
      data: Object.values(unis),
      fillColor: "rgba(205,75,33,0.5)",
      strokeColor: "rgba(205,42,46,0.8)",
      highlightFill: "rgba(229,48,36,0.75)",
      highlightStroke: "rgb(255,75,41)",
      borderWidth: 1,
      label: 'University'
    }] }}
  />
};


export default UniversityBarChart;
