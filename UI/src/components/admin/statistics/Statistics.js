import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DataVisHeatMap from "./DataVisHeatMap";
import Moment from "moment";
import SignupsChart from "./SIgnupsChart";
import { Icon } from "react-fa";
import GenderDoughnut from "./GenderDoughnut";


const Statistics = ({ mentors, mentees }) => {

  return (
    <Container fluid id={'statistic-div'}>
      <Row>
        <Col md={{offset: 9}}>
            <Button onClick={window.print} block>
              <Icon name="fas fa-file-text" /> Export to PDF
            </Button>

        </Col>
      </Row>
      <Row>
        <Col>
          <h3>
            Mentors
          </h3>
          <div>
            <span  style={{ fontWeight: "bold", fontSize: "30px" }}>
              {mentors.length}
            </span>
            <span>
              in total,
            </span>
          <span style={{ fontWeight: "bold", fontSize: "30px" }}>
            <span style={{ color: "#289b00" }}>
              +{mentors.filter(m => Moment.duration(new Moment().diff(new Moment(m.latestStatusChange))).asDays() <= 7).length}
            </span>
          </span>
          <span>
            {" mentors in the last week"}
          </span>
          </div>
          <h5>
            Gender
          </h5>
          <GenderDoughnut users={mentors}/>
        </Col>
        <Col>
          <h3>
            Mentees
          </h3>

          <div>
            <span  style={{ fontWeight: "bold", fontSize: "30px" }}>
              {mentees.length}
            </span>
            <span>
              in total,
            </span>
          <span style={{ fontWeight: "bold", fontSize: "30px" }}>
            <span style={{ color: "#289b00" }}>
              +{mentees.filter(m => Moment.duration(new Moment().diff(new Moment(m.latestStatusChange))).asDays() <= 7).length}
            </span>
          </span>
          <span>
            {" mentees in the last week"}
          </span>
          </div>
          <h5>
            Gender
          </h5>
          <GenderDoughnut users={mentees}/>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <h3>Mentees and mentor signups</h3>
          <SignupsChart mentees={mentees} mentors={mentors}/>
        </Col>
      </Row>
      <h3>Ratio of mentees/mentors</h3>
      <Row style={{marginTop: '-100px', marginLeft: '-40px'}}>
        <Col>
        <DataVisHeatMap mentors={mentors} mentees={mentees}/>
        </Col>
      </Row>
    </Container>
  );


};


export default Statistics;
