import React from 'react';
import { Bar } from 'react-chartjs';
import defaults from '../../../defaults/defaults';
import Moment from 'moment';

const SignupsByCountryTeam = ({ mentors, mentees, from, to }) => {

  const menteeData = mentees.filter(m => new Moment(m.latestStatusChange).isBetween(from, new Moment(to)));
  const mentorData = mentors.filter(m => new Moment(m.latestStatusChange).isBetween(from, new Moment(to)));

  return <Bar width={1300} data={{
    labels: defaults.countries_operating,
    datasets: [{
      data: defaults.countries_operating.map(c => menteeData.filter(u => u.country === c).length),
      fillColor: "rgba(205,138,0,0.5)",
      strokeColor: "rgba(212,141,0,0.8)",
      highlightFill: "rgba(98,63,0,0.75)",
      highlightStroke: "rgb(255,166,0)",
      borderWidth: 1,
      label: "Mentees"
    },{
      data: defaults.countries_operating.map(c => mentorData.filter(u => u.country === c).length),
      fillColor: "rgba(0,64,205,0.5)",
      strokeColor: "rgba(51,21,212,0.8)",
      highlightFill: "rgba(0,5,54,0.75)",
      highlightStroke: "rgb(22,0,255)",
      borderWidth: 1,
      label: "Mentors"
    }]
  }}
  />;

};


export default SignupsByCountryTeam;
