import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import * as _ from "lodash";
import { Field, Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";

const MentorAcademicBackground = (props) => {
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
    initialValues={{...props.onboarding}}
    onSubmit={(values, { setSubmitting }) => {
      props.addOnboardingProperties(values);
      props.changeStage(4);
      setSubmitting(false);
    }}
    render={({ values, touched, errors, isSubmitting }) => (
      <FormikForm>
        <Form.Row style={{paddingTop: "80px"}}>
          <Col md={{span: 3, offset: 3}}>
            <Field
              type="text"
              name="university"
              render={({ field, form: { touched, errors } }) => {
                return <div>
                  <Form.Label>Your current University</Form.Label>
                  <Form.Control {...field}
                                isInvalid={touched[field.name] && errors[field.name]}/>
                  {touched[field.name] && errors[field.name] ? <p style={{color: "red"}}>{errors[field.name]}</p> : null}
                </div>;
              }}
            />

          </Col>
          <Col md={{span: 3}}>

            <Field
              type="text"
              name="subject"
              render={({ field, form: { touched, errors } }) => {
                return <div>
                  <Form.Label>Your subject of study</Form.Label>
                  <Form.Control {...field}
                                isInvalid={touched[field.name] && errors[field.name]}/>
                  {touched[field.name] && errors[field.name] ? <p style={{color: "red"}}>{errors[field.name]}</p> : null}
                </div>;
              }}
            />

          </Col>
        </Form.Row>
        <Form.Row>
          <Col md={{span: 3, offset: 3}}>

            <Field
              type="text"
              name="level"
              render={({ field, form: { touched, errors } }) => {
                return <div>
                  <Form.Label>Your degree level</Form.Label>
                  <Form.Control {...field} as="select"
                                isInvalid={touched[field.name] && errors[field.name]}>
                    <option>Undergraduate</option>
                    <option>Masters</option>
                    <option>Doctorate</option>
                  </Form.Control>
                  {touched[field.name] && errors[field.name] ? <p style={{color: "red"}}>{errors[field.name]}</p> : null}
                </div>;
              }}
            />
          </Col>
          <Col md={{span: 3}}>
            <Field
              type="text"
              name="area"
              render={({ field, form: { touched, errors } }) => {
                return <div>
                  <Form.Label>Area of study</Form.Label>
                  <Form.Control {...field} as="select"
                                isInvalid={touched[field.name] && errors[field.name]}>
                    <option>Natural Sciences</option>
                    <option>Humanities</option>
                    <option>Social Sciences</option>
                    <option>Engineering</option>
                    <option>Business and Economics</option>
                  </Form.Control>
                  {touched[field.name] && errors[field.name] ? <p style={{color: "red"}}>{errors[field.name]}</p> : null}
                </div>;
              }}
            />
          </Col>
        </Form.Row>
        <Row>
          <Col md={{span: 3, offset: 3}}>
            <Field
              type="text"
              name="year"
              render={({ field, form: { touched, errors } }) => {
                return <div>
                  <Form.Label>Current year of degree</Form.Label>
                  <Form.Control {...field} as="select"
                                isInvalid={touched[field.name] && errors[field.name]}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6+</option>
                  </Form.Control>
                  {touched[field.name] && errors[field.name] ? <p style={{color: "red"}}>{errors[field.name]}</p> : null}
                </div>
              }}/>

          </Col>
        </Row>

        <Row>
          <Col md={{ span: 3, offset: 3 }}>
            <Button block onClick={() => props.changeStage(2)}>
              Previous
            </Button>
          </Col>
          <Col md={{ span: 3}}>
          <Button block type="submit" variant="success" disabled={isSubmitting || !_.isEmpty(errors)}>
            Next
          </Button>
        </Col>
        </Row>
      </FormikForm>
    )}/>
};


export default MentorAcademicBackground;
