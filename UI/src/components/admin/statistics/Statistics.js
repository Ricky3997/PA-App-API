import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import DataVisHeatMap from "./DataVisHeatMap";
import Moment from "moment";
import SignupsChart from "./SIgnupsChart";


const Statistics = ({ mentors, mentees }) => {


  return (
    <Container fluid>
      <Row>
        <Col>
          <h3>
            Mentors
          </h3>
          <span style={{ fontWeight: "bold", fontSize: "30px" }}>
            <span style={{ color: "#289b00" }}>
              +{mentors.filter(m => Moment.duration(new Moment().diff(new Moment(m.latestStatusChange))).asDays() <= 7).length}
            </span>
          </span>
          <span>
            {" mentors in the last week"}
          </span>
        </Col>
        <Col>
          <h3>
            Mentees
          </h3>
          <span style={{ fontWeight: "bold", fontSize: "30px" }}>
            <span style={{ color: "#289b00" }}>
              +{mentees.filter(m => Moment.duration(new Moment().diff(new Moment(m.latestStatusChange))).asDays() <= 7).length}
            </span>
          </span>
          <span>
            {" mentees in the last week"}
          </span>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <h3>Mentees and mentor signups</h3>
          <SignupsChart mentees={mentees} mentors={mentors}/>
        </Col>
      </Row>
      <h3>Rastio of mentees/mentors</h3>
      <Row style={{marginTop: '-100px', marginLeft: '-40px'}}>
        <Col>
        <DataVisHeatMap mentors={mentors} mentees={mentees}/>
        </Col>
      </Row>
    </Container>
  );


};


export default Statistics;
