import React from "react";
import { Field, Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";
import { Button, Col, Row } from "react-bootstrap";
import TextFieldWithLabel from "../various/forms/TextFieldWithLabel";
import DegreeLevelPicker from "../various/forms/DegreeLevelPicker";
import YearPicker from "../various/forms/YearPicker";
import AreaOfDegreePicker from "../various/forms/AreaOfDegreePicker";
import * as _ from "lodash";
import SubjectsInSchoolPicker from "../various/forms/SubjectsInSchoolPicker";
import UnisApplyingFor from "../various/forms/UnisApplyingFor";
import { Icon } from "react-fa";


const MenteeAcademicBackground = (props) => {
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
        .required()
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
          <Col md={{ span: 6, offset: 3}}>
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
            <Field name="level" render={({ field, form: { touched, errors } }) =>
              <DegreeLevelPicker mentee setFieldValue={setFieldValue} field={field} touched={touched} errors={errors}/>}
            />
          </Col>

          <Col md={{ span: 3 }}>
            <Field name="interestedIn" render={({ field, form: { touched, errors } }) =>
              <AreaOfDegreePicker mode="multiple" setFieldValue={setFieldValue} field={field} touched={touched} errors={errors}/>}
            />
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Field name="unisApplyingFor" render={({ field, form: { touched, errors } }) =>
              <UnisApplyingFor setFieldValue={setFieldValue} field={field} touched={touched} errors={errors}/>}
            />
          </Col>
        </Row>

        <br />
        <Row>
          < Col md={{ span: 3, offset: 3 }}>
            <Button block onClick={() => props.changeStage(2)}>
              <span><Icon name="fas fa-arrow-left" />{" Previous"}  </span>
            </Button>
          </Col>
          <Col md={{ span: 3 }}>
            <Button block type="submit" variant="success" disabled={isSubmitting || !_.isEmpty(errors)}>
              <span>{"Next "} <Icon name="fas fa-arrow-right" /> </span>
            </Button>
          </Col>
        </Row>
      </FormikForm>
    )}/>;
};


export default MenteeAcademicBackground;