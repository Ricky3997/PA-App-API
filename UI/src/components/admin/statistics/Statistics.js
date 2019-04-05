import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DataVisHeatMap from "./DataVisHeatMap";
import Moment from "moment";
import SignupsChart from "./SIgnupsChart";
import { Icon } from "react-fa";
import GenderDoughnut from "./GenderDoughnut";
import CountryDoughnut from "./CountryDoughnut";
import CityDoughnut from "./CityDoughnut";
import CountryFlag from "../../various/CountryFlag";


const Statistics = ({ mentors, mentees, user}) => {

  let {admin} = user;

  return (
    <Container fluid id={'statistic-div'}>
      <Row>
        <Col md={6}>
          <h3>
          You are seeing data for the {admin === 'superadmin' ? 'global 🌍 ' : <span>{admin} <CountryFlag country={admin}/></span>} program
          </h3>
        </Col>
        <Col md={{offset: 3}}>
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
          <div>
            <h5>
              Gender
            </h5>
            <GenderDoughnut users={mentors}/>
          </div>
          <div>
            <h5>
              {admin === 'superadmin' ? 'Country of origin' : 'City of origin'}
            </h5>
            {admin === 'superadmin' ? <CountryDoughnut users={mentors}/> : <CityDoughnut users={mentors} />}
          </div>
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

          <span>
            <h5>
              Gender
            </h5>
            <GenderDoughnut users={mentees}/>
          </span>
          <span>
            <h5>
              {admin === 'superadmin' ? 'Country of origin' : 'City of origin'}
            </h5>
            {admin === 'superadmin' ? <CountryDoughnut users={mentees}/> : <CityDoughnut users={mentees} />}
          </span>
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
