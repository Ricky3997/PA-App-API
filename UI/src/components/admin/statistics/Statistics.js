import React, {Component} from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DataVisHeatMap from "./DataVisHeatMap";
import Moment from "moment";
import SignupsChart from "./SIgnupsChart";
import { Icon } from "react-fa";
import GenderDoughnut from "./GenderDoughnut";
import CountryDoughnut from "./CountryDoughnut";
import CityDoughnut from "./CityDoughnut";
import CountryFlag from "../../various/CountryFlag";
import { Field, Form as FormikForm, Formik } from "formik";
import DayPicker  from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const Statistics = ({ mentors, mentees, user, programFilter }) => {

    let { admin } = user;

    return (<Formik
        initialValues={{
          range: { from: new Moment().subtract(5, 'd').toDate(), to: new Moment().toDate() }
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
        }}
        render={({ values, touched, errors, isSubmitting, setFieldValue }) => {

          const { from, to } = values.range;
          return <FormikForm>
            <Container fluid id={"statistic-div"}>
              <Row>
                <Col md={6}>
                  <h3>
                    You are seeing data for the {programFilter === "Global" ? " 🌍 " :
                    <span><CountryFlag country={programFilter}/></span>} program
                  </h3>
                </Col>
                <Col md={2}>
                  <Button onClick={window.print} block>
                    <Icon name="fas fa-file-text"/> Export to PDF
                  </Button>

                </Col>
              </Row>
              <Row>
                <Col>
                  <h3>
                    Mentors
                  </h3>
                  <div>
            <span style={{ fontWeight: "bold", fontSize: "30px" }}>
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
                      {admin === "superadmin" && values.country === "Global" ? "Country of origin" : "City of origin"}
                    </h5>
                    {admin === "superadmin" && values.country === "Global" ? <CountryDoughnut users={mentors}/> :
                      <CityDoughnut users={mentors}/>}
                  </div>
                </Col>
                <Col>
                  <h3>
                    Mentees
                  </h3>

                  <div>
            <span style={{ fontWeight: "bold", fontSize: "30px" }}>
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
              {admin === "superadmin" && values.country === "Global" ? "Country of origin" : "City of origin"}
            </h5>
                    {admin === "superadmin" && values.country === "Global" ? <CountryDoughnut users={mentees}/> :
                      <CityDoughnut users={mentees}/>}
          </span>
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col>
                  <Row>
                    <Col md={{span:11}}>
                    <h3>
                      Mentees and mentor signups between {Moment(from).format('DD MMM')} and {Moment(to).format('DD MMM')}
                    </h3>
                    </Col>
                    <Col md={{span:1}}>
                    <Button variant={'light'} onClick={() => setFieldValue('range',  { from: new Moment().subtract(5, 'd').toDate(), to: new Moment().toDate() })}>Reset</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={9}>
                    <SignupsChart mentees={mentees} mentors={mentors} from={from} to={to}/>
                    </Col>
                    <Col md={3}>
                      <Field name="range" render={({ field, form: { touched, errors } }) => <DayPicker
                        selectedDays={{from, to }}
                        modifiers={{ start: from, end: to }}
                        className="Selectable"
                        onDayClick={(day) => setFieldValue(field.name, DayPicker.DateUtils.addDayToRange(day, values.range))}
                      />
                      }/>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <h3>Ratio of mentees/mentors</h3>
              <Row style={{ marginTop: "-100px", marginLeft: "-40px" }}>
                <Col>
                  <DataVisHeatMap mentors={mentors} mentees={mentees}/>
                </Col>
              </Row>
            </Container>
          </FormikForm>;
        }
        }/>
    );
};


export default Statistics;
