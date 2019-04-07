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
import countries from "svg-country-flags/countries";
import { Select } from "antd";
import DayPickerInput from "react-day-picker/DayPickerInput";
import DayPicker  from 'react-day-picker';
import 'react-day-picker/lib/style.css';
const { Option } = Select;


class Statistics extends Component {
  constructor(props){
    super(props);
    this.state={
      range: { from: new Moment().subtract(5, 'd').toDate(), to: new Moment().toDate() }
    }
  }

  render() {

    let { mentors, mentees, user } = this.props;
    let { admin } = user;

    return (<Formik
        initialValues={{
          country: "Global"
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
        }}
        render={({ values, touched, errors, isSubmitting, setFieldValue }) => {

          if (admin === "superadmin" && values.country !== "Global") {
            mentors = mentors.filter(m => m.country === values.country);
            mentees = mentees.filter(m => m.country === values.country);
          }

          const { from, to } = this.state.range;
          return <FormikForm>
            <Container fluid id={"statistic-div"}>
              <Row>
                <Col md={6}>
                  <h3>
                    You are seeing data for the {admin === "superadmin" ? (values.country === "Global" ? "🌍 global" :
                    <span><CountryFlag country={values.country}/>{values.country}</span>) :
                    <span>{admin} <CountryFlag country={admin}/></span>} program
                  </h3>
                </Col>
                <Col md={2}>
                  {admin === "superadmin" ?
                    <Field name="country" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                    mode={"default"}
                                                                                                    size={"large"}
                                                                                                    style={{ width: "100%" }}
                                                                                                    value={field.value}
                                                                                                    placeholder={"Country"}
                                                                                                    onChange={(o) => setFieldValue(field.name, o)}
                                                                                                    tokenSeparators={[",", ":"]}>

                      <Option value={'Global'}>🌍 Global</Option>
                      {Object.values(countries)
                        .filter(c => mentors.map(m => m.country).filter(country => c === country).length > 0 || mentees.map(m => m.country).filter(country => c === country).length > 0)
                        .map(c => <Option value={c}><span><CountryFlag country={c}/>{' '}{c}</span></Option>)}

                    </Select>}/> : null}
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
                    <h3>
                      Mentees and mentor signups
                    </h3>

                    <Field name="range" render={({ field, form: { touched, errors } }) => <DayPickerInput
                      placeholder={'Choose date'}
                      dayPickerProps={{
                        selectedDays: [from, { from, to }],
                        modifiers: { start: from, end: to },
                        className: "Selectable",
                        onDayClick: (day) => this.setState({range: DayPicker.DateUtils.addDayToRange(day, values.range)})
                      }}
                      keepFocus={false}
                    />
                    }/>
                  </Row>
                  <Row>
                    <SignupsChart mentees={mentees} mentors={mentors}/>
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
  }
};


export default Statistics;
