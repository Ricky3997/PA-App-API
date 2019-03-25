import React from "react";
import { Line } from "react-chartjs";
import Moment from "moment";

const SignupsChart = ({ mentors, mentees }) => {
  console.log(mentees.map(m => Moment.duration(new Moment().diff(new Moment(m.latestStatusChange))).asDays()));

  return <Line style={{ marginLeft: "160px", marginTop: "60px" }}
               data={{
                 labels: [
                   new Moment().subtract(5, "d").format("MMM DD"),
                   new Moment().subtract(4, "d").format("MMM DD"),
                   new Moment().subtract(3, "d").format("MMM DD"),
                   new Moment().subtract(2, "d").format("MMM DD"),
                   new Moment().subtract(1, "d").format("MMM DD"),
                   new Moment().format("MMM DD")
                 ],
                 datasets: [
                   {
                     label: "Mentors",
                     fillColor: "rgba(220,220,220,0.2)",
                     strokeColor: "rgba(220,220,220,1)",
                     pointColor: "rgba(220,220,220,1)",
                     pointStrokeColor: "#fff",
                     pointHighlightFill: "#fff",
                     pointHighlightStroke: "rgba(220,220,220,1)",
                     data: [
                       mentors.filter(m => Math.floor(Moment.duration(new Moment().diff(new Moment(m.latestStatusChange))).asDays()) === 5).length,
                       mentors.filter(m => Math.floor(Moment.duration(new Moment().diff(new Moment(m.latestStatusChange))).asDays()) === 4).length,
                       mentors.filter(m => Math.floor(Moment.duration(new Moment().diff(new Moment(m.latestStatusChange))).asDays()) === 3).length,
                       mentors.filter(m => Math.floor(Moment.duration(new Moment().diff(new Moment(m.latestStatusChange))).asDays()) === 2).length,
                       mentors.filter(m => Math.floor(Moment.duration(new Moment().diff(new Moment(m.latestStatusChange))).asDays()) === 1).length,
                       mentors.filter(m => Math.floor(Moment.duration(new Moment().diff(new Moment(m.latestStatusChange))).asDays()) === 0).length
                     ]
                   },
                   {
                     label: "Mentees",
                     fillColor: "rgba(151,187,205,0.2)",
                     strokeColor: "rgba(151,187,205,1)",
                     pointColor: "rgba(151,187,205,1)",
                     pointStrokeColor: "#fff",
                     pointHighlightFill: "#fff",
                     pointHighlightStroke: "rgba(151,187,205,1)",
                     data: [
                       mentees.filter(m => Math.floor(Moment.duration(new Moment().diff(new Moment(m.latestStatusChange))).asDays()) === 5).length,
                       mentees.filter(m => Math.floor(Moment.duration(new Moment().diff(new Moment(m.latestStatusChange))).asDays()) === 4).length,
                       mentees.filter(m => Math.floor(Moment.duration(new Moment().diff(new Moment(m.latestStatusChange))).asDays()) === 3).length,
                       mentees.filter(m => Math.floor(Moment.duration(new Moment().diff(new Moment(m.latestStatusChange))).asDays()) === 2).length,
                       mentees.filter(m => Math.floor(Moment.duration(new Moment().diff(new Moment(m.latestStatusChange))).asDays()) === 1).length,
                       mentees.filter(m => Math.floor(Moment.duration(new Moment().diff(new Moment(m.latestStatusChange))).asDays()) === 0).length
                     ]
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
