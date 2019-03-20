import React from "react";
import { Field, Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";
import { Button, Col, ProgressBar, Row } from "react-bootstrap";
import TextFieldWithLabel from "../various/forms/TextFieldWithLabel";
import DegreeLevelPicker from "../various/forms/DegreeLevelPicker";
import YearPicker from "../various/forms/YearPicker";
import AreaOfDegreePicker from "../various/forms/AreaOfDegreePicker";
import * as _ from "lodash";
import SubjectsInSchoolPicker from "../various/forms/SubjectsInSchoolPicker";
import { Icon } from "react-fa";
import UniversityPicker from "./../various/forms/UniversityPicker";
import CoursePicker from "../various/forms/CoursePicker";


const MenteeAcademicBackground = (props) => {

  const calculateProgressBar = (values) => {
    return 60 + (values.school ? 6 : 0) + (values.subjects ? 6 : 0) + (values.year ? 6 : 0) + (values.interestedIn ? 7 : 0) + (values.level ? 3 : 0) + (values.unisApplyingFor ? 7 : 0);
  };

  return <Formik
    validationSchema={Yup.object().shape({
      school: Yup.string()
        .min(3)
        .required("School is required."),
      subjects: Yup.array()
        .required("Subjects are required."),
      year: Yup.string()
        .required("Year is required."),
      interestedIn: Yup.array()
        .required("Area of degree required"),
      coursesApplyingFor: Yup.array()
        .required("Courses required"),
      unisApplyingFor: Yup.array()
        .required("Unis required"),
      level: Yup.string()
        .required("Level is required.")
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
            <Field name="school" render={({ field, form: { touched, errors } }) =>
              <TextFieldWithLabel label="Your current school" field={field} touched={touched} errors={errors}/>}
            />
          </Col>
          <Col md={{ span: 3 }}>
            <Field name="year" render={({ field, form: { touched, errors } }) =>
              <YearPicker mentee setFieldValue={setFieldValue} field={field} touched={touched} errors={errors}/>}
            />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Field
              name="subjects"
              render={({ field, form: { touched, errors } }) =>
                <SubjectsInSchoolPicker setFieldValue={setFieldValue} field={field} touched={touched} errors={errors}/>
              }
            />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 3, offset: 3 }}>
            <Field name="unisApplyingFor" render={({ field, form: { touched, errors } }) =>
              <UniversityPicker setFieldValue={setFieldValue} field={field} touched={touched} mentee multiple
                                errors={errors}/>}
            />
          </Col>

          <Col md={{ span: 3 }}>
            <Field name="level" render={({ field, form: { touched, errors } }) =>
              <DegreeLevelPicker mentee setFieldValue={setFieldValue} field={field} touched={touched} errors={errors}/>}
            />
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 3, offset: 3 }}>
            <Field name="interestedIn" render={({ field, form: { touched, errors } }) =>
              <AreaOfDegreePicker multiple setFieldValue={setFieldValue} field={field} touched={touched}
                                  errors={errors}/>}
            />
          </Col>
          <Col md={{ span: 3 }}>
            <Field name="coursesApplyingFor" render={({ field, form: { touched, errors } }) =>
              <CoursePicker multiple field={field} touched={touched} errors={errors} setFieldValue={setFieldValue}/>}
            />
          </Col>
        </Row>

        <br/>
        <Row>
          < Col md={{ span: 2, offset: 3 }}>
            <Button block onClick={() => {
              props.addOnboardingProperties(values);
              props.changeStage(2);
            }}>
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


export default MenteeAcademicBackground;