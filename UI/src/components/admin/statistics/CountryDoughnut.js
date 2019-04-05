import React from "react";
import { Doughnut } from "react-chartjs";
import countries from "svg-country-flags/countries";
import color from 'color'

const CountryDoughnut = ({ users }) => {

  return <Doughnut data={Object.values(countries).map((c,i) => {
    const randomHex = color.rgb(Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255));
    const lighterRandomHex = color(randomHex).lighten(0.25);

      return {
        value: users.filter(u => u.country === c).length,
        color: randomHex,
        highlight: lighterRandomHex,
        label: c
      }
    })} options={{percentageInnerCutout : 20
  }}/>
};


export default CountryDoughnut;
