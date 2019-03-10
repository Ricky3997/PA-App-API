import React from "react";
import { Button, Col, ProgressBar, Row } from "react-bootstrap";
import * as _ from "lodash";
import { Field, Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";
import AreaOfDegreePicker from "../various/forms/AreaOfDegreePicker";
import DegreeLevelPicker from "../various/forms/DegreeLevelPicker";
import YearPicker from "../various/forms/YearPicker";
import { Icon } from "react-fa";
import UniversityPicker from "../various/forms/UniversityPicker";
import CoursePicker from "../various/forms/CoursePicker";

const MentorAcademicBackground = (props) => {

  const calculateProgressBar = (values) => {
    return 60 + (values.university ? 7 : 0) +(values.subject ? 7 : 0) +(values.level ? 7 : 0) +(values.area ? 7 : 0) +(values.year ? 7 : 0);
  };

  return <Formik
    validationSchema={Yup.object().shape({
      university: Yup.string()
        .min(3)
        .required("University is required."),
      subject: Yup.string()
        .min(3)
        .required("Subject is required."),
      level: Yup.string()
        .min(3)
        .required("Level is required."),
      area: Yup.string()
        .min(3)
        .required("Area is required."),
      year: Yup.string()
        .min(1)
        .required("Year is required.")
    })}
    initialValues={{ ...props.onboarding }}
    onSubmit={(values, { setSubmitting }) => {
      props.addOnboardingProperties(values);
      props.changeStage(4);
      setSubmitting(false);
    }}
    render={({ values, touched, errors, isSubmitting, setFieldValue }) => (
      <FormikForm>
        <Row style={{ paddingTop: "80px" }}>
          <Col md={{ span: 3, offset: 3 }}>
            <Field name="university" render={({ field, form: { touched, errors } }) =>
              <UniversityPicker setFieldValue={setFieldValue} field={field} touched={touched} errors={errors}/>}
            />
          </Col>
          <Col md={{ span: 3 }}>
            <Field name="subject" render={({ field, form: { touched, errors } }) =>
              <CoursePicker field={field} touched={touched} errors={errors} setFieldValue={setFieldValue}/>}
            />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 2, offset: 3 }}>
            <Field name="level" render={({ field, form: { touched, errors } }) =>
              <DegreeLevelPicker setFieldValue={setFieldValue} field={field} touched={touched} errors={errors}/>}
            />
          </Col>
          <Col md={{ span: 2 }}>
            <Field name="year" render={({ field, form: { touched, errors } }) =>
              <YearPicker setFieldValue={setFieldValue} field={field} touched={touched} errors={errors}/>}
            />
          </Col>
          <Col md={{ span: 2 }}>
            <Field name="area" render={({ field, form: { touched, errors } }) =>
              <AreaOfDegreePicker setFieldValue={setFieldValue} field={field} touched={touched} errors={errors}/>}
            />
          </Col>
        </Row>
        <br/>
        <Row>
          <Col md={{ span: 2, offset: 3 }}>
            <Button block onClick={() => props.changeStage(2)}>
              <span><Icon name="fas fa-arrow-left"/>{" Previous"}  </span>
            </Button>
          </Col>
          <Col md={{ span: 2 }} style={{ paddingTop: "10px" }}>
            <ProgressBar striped now={calculateProgressBar(values)} label={`${calculateProgressBar(values)}%`}/>
          </Col>
          <Col md={{ span: 2 }}>
            <Button block type="submit" variant="success" disabled={isSubmitting || !_.isEmpty(errors)}>
              <span>{"Next "} <Icon name="fas fa-arrow-right"/> </span>
            </Button>
          </Col>
        </Row>
      </FormikForm>
    )}/>;
};


export default MentorAcademicBackground;
