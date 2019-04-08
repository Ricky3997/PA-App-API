import React from "react";
import { Line } from "react-chartjs";
import Moment from "moment";

const SignupsChart = ({ mentors, mentees, from, to }) => {

  const range = Math.ceil(Moment.duration(Moment(to).diff(Moment(from))).asDays()) + 1;
  let labels, menteeData, mentorData;
  // if (range <= 7) {
    labels = [...Array(range).keys()].reverse().map(d => new Moment(to).subtract(d, "d").format("MMM DD"));
    menteeData = [...Array(range).keys()].reverse().map(d => mentees.filter(m => new Moment(m.latestStatusChange).isBetween(1262304000, new Moment(to).subtract(d, 'd'))).length);
    mentorData = [...Array(range).keys()].reverse().map(d => mentors.filter(m => new Moment(m.latestStatusChange).isBetween(1262304000, new Moment(to).subtract(d, 'd'))).length);
  // } else if (range <= 35) {
  //   labels = [...Array(Math.ceil(range / 7)).keys()].reverse().map(d => new Moment(to).subtract(d, "w").format("MMM DD")).map(d => `Week of ${d}`);
  //   menteeData = [...Array(Math.ceil(range / 7)).keys()].reverse().map(d => mentees.filter(m => new Moment(m.latestStatusChange).isBetween(1262304000, new Moment(to).subtract(d, 'w'))).length);
  //   mentorData = [...Array(Math.ceil(range / 7)).keys()].reverse().map(d => mentors.filter(m => new Moment(m.latestStatusChange).isBetween(1262304000, new Moment(to).subtract(d, 'w'))).length);
  // } else {
  //   labels = [...Array(Math.ceil(range / 30)).keys()].reverse().map(d => new Moment(to).subtract(d, "M").format("MMM"));
  //   menteeData = [...Array(Math.ceil(range / 30)).keys()].reverse().map(d => mentees.filter(m => new Moment(m.latestStatusChange).isBetween(1262304000, new Moment(to).subtract(d, 'M'))).length);
  //   mentorData = [...Array(Math.ceil(range / 30)).keys()].reverse().map(d => mentors.filter(m => new Moment(m.latestStatusChange).isBetween(1262304000, new Moment(to).subtract(d, 'M'))).length);
  // } TODO Need to fix issue that react vis uses chartjs under the covers, and additive behaviour for new data means changign format of axes fucks up th datasets

  return <Line
    data={{
      labels: labels,
      datasets: [
        {
          label: "Mentors",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: mentorData
        },
        {
          label: "Mentees",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
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


export default SignupsChart;
