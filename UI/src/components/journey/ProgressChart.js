import React from 'react';
import { Doughnut } from 'react-chartjs';


const ProgressChart = (props) => {
  return (
    <Doughnut options={{ percentageInnerCutout: 70 }} data={[
      {
        value: props.completed,
        color: "#d64f29",
        highlight: "#993F23",
        label: "Completed"
      }, {
        value: (props.missing),
        color: "#4f84bc",
        highlight: "#3A5E86",
        label: "Missing"
      }]}
    />
  );
};

export default ProgressChart;
