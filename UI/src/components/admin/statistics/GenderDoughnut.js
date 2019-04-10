import React from "react";
import { Doughnut } from "react-chartjs";
import { gender } from "./../../../defaults/defaults";

const GenderDoughnut = ({ users }) => {

  const colors = [
    {
      color: "#003bbf",
      highlight: "#004dff"
    },
    {
      color: "#F7464A",
      highlight: "#FF5A5E"
    },
    {
      color: "#FDB45C",
      highlight: "#FFC870"
    },
    {
      color: "#c87e58",
      highlight: "#ffa46f"
    },
    {
      color: "#4131a5",
      highlight: "#4936b8"
    },
    {
      color: "#c400c3",
      highlight: "#ff00fe"
    },
    {
      color: "#03619b",
      highlight: "#037fc9"
    },
    {
      color: "#a95555",
      highlight: "#ca6868"
    },
    {
      color: "#289b00",
      highlight: "#31bd00"
    },
    {
      color: "#585863",
      highlight: "#767684"
    }
  ];

  return <Doughnut data={gender.map((g, i) => {
    return {
      value: users.filter(u => u.gender === g).length,
      color: colors[i].color,
      highlight: colors[i].highlight,
      label: g
    };
  })} options={{
    percentageInnerCutout: 20
  }}/>;
};


export default GenderDoughnut;
