import React, { Component } from "react";
import { Container } from "react-bootstrap";
import * as _ from "lodash";
import DataVisHeatMap from "../../various/DataVisHeatMap";

const Statistics = (props) => {

  let xDomain, yDomain, data;

  if (props.mentorMode) {
    const { mentors } = props;
    const unis = _.uniq(mentors.map(m => m.university));
    const area = _.uniq(mentors.map(m => m.area));
    xDomain = unis;
    yDomain = area;
    data = unis.reduce((acc, uni) => {
      return acc.concat(
        area.map((area) => {
          const mentorsAtUniStudyingArea = mentors.filter(m => {
            return m.university === uni && m.area === area;
          }).length;
          return {
            x: uni,
            y: area,
            color: mentorsAtUniStudyingArea
          };
        })
      );
    }, []);
  } else {
    const { mentees } = props;
    console.log(mentees)
    const subjectsInterested = _.uniq(mentees.flatMap(m => m.interestedIn));
    const unisInterested = _.uniq(mentees.flatMap(m => m.unisApplyingFor));
    xDomain = unisInterested ;
    yDomain = subjectsInterested;
    data = unisInterested.reduce((acc, uni) => {
      return acc.concat(
        subjectsInterested.map((subj) => {
          const menteesInterestedInSubjectAtUni = mentees.filter(m => {
            return _.some(m.unisApplyingFor, u => u === uni) && _.some(m.interestedIn, s => s === subj);
          }).length;
          return {
            x: uni,
            y: subj,
            color: menteesInterestedInSubjectAtUni
          };
        })
      );
    }, []);
  }

  console.log(data)

  return (
    <Container fluid>
      <DataVisHeatMap xDomain={xDomain} yDomain={yDomain} data={data}/>
    </Container>
  );


};


export default Statistics;
