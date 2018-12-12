import { Button, Col, Image, Row } from "react-bootstrap";
import Form from "react-bootstrap/es/Form";
import React, {Component} from "react";
import * as Yup from "yup";
import * as api from "../../api";
import { toast } from "react-toastify";
import * as _ from "lodash"
import { ErrorMessage, Field, Form as FormikForm, Formik } from "formik";
import Loader from "react-loader-spinner";

class MentorSettings extends Component {
  
  FormControlWithValidationWithFormik = (type, children) => {
    return ({ field, form: { touched, errors } }) => {
      const error = touched[field.name] && errors[field.name];
      return <div>
        <Form.Control {...field}
                      isValid={!error}
                      isInvalid={error}
                      as={type}>
          {children}
        </Form.Control>
        <ErrorMessage name={field.name}/>
      </div>
    }
  };

  render() {
    return <div>
      <Formik
        validationSchema={Yup.object().shape({
          university: Yup.string()
            .required("University is required."),
          subject: Yup.string()
            .required("Subject is required."),
          areaOfStudy: Yup.string()
            .required("Area of study is required."),
          level: Yup.string()
            .required("Degree area of study is required."),
          year: Yup.string()
            .required("Year of study is required."),
          firstGenStudent: Yup.string()
            .required("First Generation Student is required."),
          country: Yup.string()
            .required("Country is required."),
          city: Yup.string()
            .required("City is required."),
          gender: Yup.string()
            .required("Gender is required."),

        })}
        initialValues={{ email: "" }}
        onSubmit={({ email }, { setSubmitting }) => {
          setSubmitting(false);
        }
        }
        render={({ values, touched, errors, isSubmitting }) => (
          <FormikForm>
            <Row>
              <Col>
                <Field
                  type="text"
                  name="university"
                  label="University"
                  render={this.FormControlWithValidationWithFormik("input")}
                />
              </Col>
              <Col>
                <Field
                  type="text"
                  name="subiect"
                  label="subject"
                  render={this.FormControlWithValidationWithFormik("input")}
                />
              </Col>
              <Col>
                <Field
                  name="areaOfStudy"
                  label="Area of study"
                  render={this.FormControlWithValidationWithFormik("select", [
                    <option>Natural Sciences</option>,
                    <option>Humanities</option>,
                    <option>Social Sciences</option>,
                    <option>Engineering</option>,
                    <option>Business and Economics</option>])}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <Field
                  type="text"
                  name="level"
                  label="Degree Type"
                  render={this.FormControlWithValidationWithFormik("input")}
                />
              </Col>
              <Col>
                <Field
                  name="areaOfStudy"
                  label="Area of study"
                  render={this.FormControlWithValidationWithFormik("select", [
                    <option>1</option>,
                    <option>2</option>,
                    <option>3</option>,
                    <option>4</option>,
                    <option>5</option>,
                    <option>6+</option>])}
                />
              </Col>
              <Col>
                <Field
                  name="firstGenStudent"
                  label="First Generation Student"
                  render={this.FormControlWithValidationWithFormik("select", [
                    <option>Yes</option>,
                    <option>No</option>
                  ])}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Field
                  type="text"
                  name="country"
                  label="Country"
                  render={this.FormControlWithValidationWithFormik("input")}
                />
              </Col>
              <Col>
                <Field
                  type="text"
                  name="City"
                  label="City"
                  render={this.FormControlWithValidationWithFormik("input")}
                />
              </Col>
              <Col>

                <Field
                  name="gender"
                  label="Gender"
                  render={this.FormControlWithValidationWithFormik("select", [
                    <option>Male</option>,
                    <option>Female</option>,
                    <option>Prefer not to say</option>])}
                />
              </Col>
            </Row>


            <br/>
            <Row>
              <Col md={{ size: 2, offset: 8 }}>
                <Button variant="secondary" block onClick={() => this.props.history.push("/")}>
                  Cancel
                </Button>
              </Col>
              <Col md={{ size: 2 }}>
                <Button variant="success" block type="submit" disabled={isSubmitting || !_.isEmpty(errors)}>
                  {isSubmitting ? <Loader type="Oval" color="#ffffff" width="20" height="20"/> : <span>Save</span>}
                </Button>
              </Col>
            </Row>
          </FormikForm>
        )}
      />
    </div>
  }
};

export default MentorSettings;