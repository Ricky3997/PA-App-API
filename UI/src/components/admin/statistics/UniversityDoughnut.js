import React from "react";
import { Doughnut } from "react-chartjs";
import color from 'color'
import * as _ from 'lodash'

const UniversityDoughnut = ({ mentors, mentees }) => {

  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash)
    const color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
    return '#' + Array(6 - color.length + 1).join('0') + color;
  };

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


  return <Doughnut data={Object.keys(unis).map((u,i) => {

    const colorFromUni = stringToColor(u);
    const lighterColorFromUni = color(colorFromUni).lighten(0.25);

      return {
        value: unis[u],
        color: colorFromUni,
        highlight: lighterColorFromUni,
        label: u
      }
    })} options={{percentageInnerCutout : 20
  }}/>
};


export default UniversityDoughnut;
