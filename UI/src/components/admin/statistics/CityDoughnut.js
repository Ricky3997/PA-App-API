import React from "react";
import { Doughnut } from "react-chartjs";
import color from "color";
import * as _ from "lodash";

const CityDoughnut = ({ users }) => {

  return <Doughnut data={_.uniq(users.map(u => u.city)).map((c, i) => {
    const randomHex = color.rgb(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
    const lighterRandomHex = color(randomHex).lighten(0.25);

    return {
      value: users.filter(u => u.city === c).length,
      color: randomHex,
      highlight: lighterRandomHex,
      label: c
    };
  })} options={{
    percentageInnerCutout: 20
  }}/>;
};


export default CityDoughnut;
