import React from "react";
import { Line } from "react-chartjs";
import Moment from "moment";

const SignupTrendsChart = ({ mentors, mentees, from, to }) => {

  //TODO Fix weeks starting on Monday
  //TODO Fix date picker not working properly with date ranges
  //Todo Fix push to remote git

  const range = Math.ceil(Moment.duration(Moment(to).diff(Moment(from))).asDays()) + 1;
  let labels, menteeData, mentorData;
  if (range <= 7) {
  labels = [...Array(range).keys()].reverse().map(d => new Moment(to).subtract(d, "d").format("MMM DD"));
  menteeData = [...Array(range).keys()].reverse().map(d => mentees.filter(m => new Moment(m.latestStatusChange).isBetween(1262304000, new Moment(to).subtract(d, "d"))).length);
  mentorData = [...Array(range).keys()].reverse().map(d => mentors.filter(m => new Moment(m.latestStatusChange).isBetween(1262304000, new Moment(to).subtract(d, "d"))).length);
  } else if (range <= 35) {
    labels = [...Array(Math.ceil(range / 7)).keys()].reverse().map(d => new Moment(to).subtract(d, "w").format("MMM DD")).map(d => `Week of ${d}`);
    menteeData = [...Array(Math.ceil(range / 7)).keys()].reverse().map(d => mentees.filter(m => new Moment(m.latestStatusChange).isBetween(1262304000, new Moment(to).subtract(d, 'w'))).length);
    mentorData = [...Array(Math.ceil(range / 7)).keys()].reverse().map(d => mentors.filter(m => new Moment(m.latestStatusChange).isBetween(1262304000, new Moment(to).subtract(d, 'w'))).length);
  } else {
    labels = [...Array(Math.ceil(range / 30)).keys()].reverse().map(d => new Moment(to).subtract(d, "M").format("MMM"));
    menteeData = [...Array(Math.ceil(range / 30)).keys()].reverse().map(d => mentees.filter(m => new Moment(m.latestStatusChange).isBetween(1262304000, new Moment(to).subtract(d, 'M'))).length);
    mentorData = [...Array(Math.ceil(range / 30)).keys()].reverse().map(d => mentors.filter(m => new Moment(m.latestStatusChange).isBetween(1262304000, new Moment(to).subtract(d, 'M'))).length);
  }

  return <Line redraw // Need to fix issue that react vis uses chartjs under the covers, and additive behaviour for new data means changign format of axes fucks up th datasets
    data={{
      labels: labels,
      datasets: [
        {
          label: "Mentors",
          fillColor: "rgba(0,142,203,0.27)",
          strokeColor: "rgb(79,86,220)",
          pointColor: "rgba(6,121,220,0.45)",
          pointStrokeColor: "#1ddcff",
          pointHighlightFill: "#007cff",
          pointHighlightStroke: "rgb(20,39,220)",
          data: mentorData
        },
        {
          label: "Mentees",
          fillColor: "rgba(0,172,102,0.31)",
          strokeColor: "rgb(110,205,142)",
          pointColor: "rgba(0,205,48,0.25)",
          pointStrokeColor: "#00ffb4",
          pointHighlightFill: "#87ffb7",
          pointHighlightStroke: "rgb(130,205,130)",
          data: menteeData
        }
      ]
    }} options={{
    scaleShowGridLines: true,
    scaleGridLineColor: "rgba(0,0,0,.05)",
    scaleGridLineWidth: 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve: true,
    bezierCurveTension: 0.4,
    pointDot: true,
    pointDotRadius: 4,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 20,
    datasetStroke: true,
    datasetStrokeWidth: 2,
    datasetFill: true,
    offsetGridLines: false
  }} width="1000" height="250"/>;
};


export default SignupTrendsChart;
