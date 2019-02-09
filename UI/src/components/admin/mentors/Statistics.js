import React, { Component } from "react";
import { Container } from "react-bootstrap";
import * as _ from "lodash";
import DataVisHeatMap from "../../various/DataVisHeatMap";

class Statistics extends Component {

  render() {
    const { mentors } = this.props;
    const unis = _.uniq(mentors.map(m => m.university));
    const area = _.uniq(mentors.map(m => m.area));
    const data = unis.reduce((acc, uni) => {
      return acc.concat(
        area.map((area) => {
          const mentorsAtUniStudyingArea =  mentors.filter(m => {
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

    return (
      <Container fluid>
        <DataVisHeatMap xDomain={unis} yDomain={area} data={data}/>
      </Container>
    );
  }

};


export default Statistics;
