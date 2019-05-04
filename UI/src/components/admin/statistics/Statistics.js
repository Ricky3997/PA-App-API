import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import DataVisHeatMap from './DataVisHeatMap';
import Moment from 'moment';
import SignupTrendsChart from './SignupTrendsChart';
import { Icon } from 'react-fa';
import GenderDoughnut from './GenderDoughnut';
import CountryDoughnut from './CountryDoughnut';
import CityDoughnut from './CityDoughnut';
import UniversityBarChart from './UniversityBarChart';
import CountryFlag from '../../various/CountryFlag';
import { Field, Form as FormikForm, Formik } from 'formik';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import CourseBarChart from './CourseBarChart';
import ReferralBarChart from './ReferralBarChart';
import UniversityPicker from '../../various/forms/UniversityPicker';
import * as _ from 'lodash';
import SignupsByCountryTeam from './SignupsByCountryTeam';
import UniWithLogoSpan from '../../various/UniWithLogoSpan';
import defaults from '../../../defaults/defaults';
import SubjectBarChart from './SubjectBarChart';

const Statistics = ({ mentors, mentees, user, programFilter }) => {

  let { admin, campusTeamAdmin } = user.mentorProfile;

  const filterMentorsByCampus = (campus) => {
    if (campus.length > 0) return mentors.filter(m => _.some(campus, c => c === m.university));
    else return mentors;
  };

  return (<Formik
      initialValues={{
        range: { from: new Moment().subtract(5, "d").toDate(), to: new Moment().toDate() },
        campus: []
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
                  You are seeing data for the {campusTeamAdmin ? <UniWithLogoSpan logo={[...defaults.universities.UK, ...defaults.universities.US].filter(u => u.name === campusTeamAdmin)[0].logo} /> :
                  (programFilter === "Global" ? " 🌍 " : <span><CountryFlag country={programFilter}/></span>)} program
                </h3>
              </Col>
              <Col md={{ offset: 4, span: 2 }}>
                <Button onClick={window.print} block>
                  <Icon name="fas fa-file-text"/> Export to PDF
                </Button>

              </Col>
            </Row>
            <Row>
              <Col className='statistics_mentor_col'>
                <Row>
                  <Col md={4}>
                    <h3>
                      Mentors
                    </h3>
                  </Col>
                  <Col>
                    {campusTeamAdmin && !admin ? null : <Field name="campus" render={({ field, form: { touched, errors } }) =>
                      <UniversityPicker overrideLabel={"Filter by campus"} multiple
                                        setFieldValue={setFieldValue} field={field} touched={touched} errors={errors}/>}
                    /> }
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <span style={{ fontWeight: "bold", fontSize: "30px" }}>
              {filterMentorsByCampus(values.campus).length}
            </span>

                    <span>
              in total,
            </span>
                    <span style={{ fontWeight: "bold", fontSize: "30px" }}>
            <span style={{ color: "#289b00" }}>
              +{filterMentorsByCampus(values.campus).filter(m => Moment.duration(new Moment().diff(new Moment(m.latestStatusChange))).asDays() <= 7).length}
            </span>
          </span>
                    <span>
            {" mentors in the last week"}
          </span>

                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h5>
                      Gender
                    </h5>
                    <GenderDoughnut users={filterMentorsByCampus(values.campus)}/>
                  </Col>
                  <Col>
                    <h5>
                      {campusTeamAdmin || (admin === "superadmin" && programFilter === "Global") ? "Country of origin" : "City of origin"}
                    </h5>
                    {campusTeamAdmin || (admin === "superadmin" && programFilter === "Global") ?
                      <CountryDoughnut users={filterMentorsByCampus(values.campus)}/> :
                      <CityDoughnut users={filterMentorsByCampus(values.campus)}/>}
                  </Col>

                  {campusTeamAdmin ? null : <Col>
                    <h5>
                      University of study
                    </h5>
                    <UniversityBarChart mentors={filterMentorsByCampus(values.campus)}/>
                  </Col>}

                  <Col>
                    <h5>
                      Macro area of study
                    </h5>
                    <CourseBarChart mentors={filterMentorsByCampus(values.campus)}/>
                  </Col>

                  <Col>
                    <h5>
                      Referral source
                    </h5>
                    <ReferralBarChart users={filterMentorsByCampus(values.campus)}/>
                  </Col>
                </Row>
              </Col>
              {admin && !campusTeamAdmin ? <Col className='statistics_mentee_col'>
                <h3>
                  Mentees
                </h3>

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

                <Row>
                  <Col>
                    <h5>
                      Gender
                    </h5>
                    <GenderDoughnut users={mentees}/>
                  </Col>
                  <Col>
                    <h5>
                      {admin === "superadmin" && programFilter === "Global" ? "Country of origin" : "City of origin"}
                    </h5>
                    {admin === "superadmin" && programFilter === "Global" ? <CountryDoughnut users={mentees}/> :
                      <CityDoughnut users={mentees}/>}
                  </Col>

                  <Col>
                    <h5>
                      Target university
                    </h5>
                    <UniversityBarChart mentees={mentees}/>
                  </Col>

                  <Col>
                    <h5>
                      Macro area of interest
                    </h5>
                    <CourseBarChart mentees={mentees}/>
                  </Col>
                  <Col>
                    <h5>
                      Referral source
                    </h5>
                    <ReferralBarChart users={mentees}/>
                  </Col>
                </Row>
              </Col> : null}
            </Row>
            <Row className="justify-content-md-center">
              <Col>
                <Row>
                  <Col md={{ span: 11 }}>
                    <h3>
                      Mentees and mentor signups
                      between {Moment(from).format("DD MMM")} and {Moment(to).format("DD MMM")}
                    </h3>
                  </Col>
                  <Col md={{ span: 1 }}>
                    <Button variant={"light"} onClick={() => setFieldValue("range", {
                      from: new Moment().subtract(5, "d").toDate(),
                      to: new Moment().toDate()
                    })}>Reset</Button>
                  </Col>
                </Row>
                <Row>
                  <Col md={9}>
                    <SignupTrendsChart mentees={mentees} mentors={mentors} from={from} to={to}/>
                  </Col>
                  <Col md={3}>
                    <Field name="range" render={({ field, form: { touched, errors } }) => <DayPicker
                      selectedDays={{ from, to }}
                      modifiers={{ start: from, end: to }}
                      className="Selectable"
                      onDayClick={(day) => setFieldValue(field.name, DayPicker.DateUtils.addDayToRange(day, values.range))}
                    />
                    }/>
                  </Col>
                </Row>
              </Col>
            </Row>
            { admin === 'superadmin' ? <Row className="justify-content-md-center">
              <Col>
                <SignupsByCountryTeam mentors={mentors} mentees={mentees} from={from} to={to} />
              </Col>
            </Row> : null}
            <Row>
              <Col>
                {campusTeamAdmin ? <SubjectBarChart mentors={mentors} /> : <DataVisHeatMap mentors={mentors} mentees={mentees} filterByCampusAdmin={campusTeamAdmin}/>}
              </Col>
            </Row>
          </Container>
        </FormikForm>;
      }
      }/>
  );
};


export default Statistics;
