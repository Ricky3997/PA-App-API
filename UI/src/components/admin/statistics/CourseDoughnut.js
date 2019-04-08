import React from "react";
import { Doughnut } from "react-chartjs";
import color from 'color'
import * as _ from 'lodash'

const CourseDoughnut = ({ mentors, mentees }) => {

  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash)
    const color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
    return '#' + Array(6 - color.length + 1).join('0') + color;
  };

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

  return <Doughnut data={Object.keys(areas).map((a,i) => {

    const colorFromUni = stringToColor(a);
    const lighterColorFromUni = color(colorFromUni).lighten(0.25);

      return {
        value: areas[a],
        color: colorFromUni,
        highlight: lighterColorFromUni,
        label: a
      }
    })} options={{percentageInnerCutout : 20
  }}/>
};


export default CourseDoughnut;
