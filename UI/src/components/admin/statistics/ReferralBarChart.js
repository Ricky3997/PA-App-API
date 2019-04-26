import React from 'react';
import { Bar } from 'react-chartjs';
import * as _ from 'lodash';

const ReferralBarChart = ({ users }) => {

  let referrals = {};
  _.uniq(_.flatMap(users.map(u => u.referral))).forEach(r => {
    referrals[r] = users.filter(m => _.some(m.referral, i => i === r)).length;
  });

  return <Bar height={300} data={{
    labels: Object.keys(referrals),
    datasets: [{
      data: Object.values(referrals),
      fillColor: "rgba(0,72,153,0.5)",
      strokeColor: "rgba(0,2,118,0.8)",
      highlightFill: "rgba(3,97,155,0.75)",
      highlightStroke: "rgb(41,14,255)",
      borderWidth: 1,
      label: "Referral"
    }]
  }}
  />;
};


export default ReferralBarChart;
