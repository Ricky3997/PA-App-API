import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/es/Form";
import React, { Component } from "react";
import * as Yup from "yup";
import * as _ from "lodash";
import { Field, Form as FormikForm, Formik } from "formik";
import Loader from "react-loader-spinner";
import ProfilePicture from "./ProfilePicture";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import CountryPicker from "../various/forms/CountryPicker";
import TextFieldWithLabel from "../various/forms/TextFieldWithLabel";
import AreaOfDegreePicker from "../various/forms/AreaOfDegreePicker";
import DegreeLevelPicker from "../various/forms/DegreeLevelPicker";
import YearPicker from "../various/forms/YearPicker";
import FirstGenerationStudentPicker from "../various/forms/FirstGenerationStudentPicker";
import GenderPicker from "../various/forms/GenderPicker";

class MentorSettings extends Component {

  FormControlWithValidationWithFormik = (type, children, label) => {
    return ({ field, form: { touched, errors } }) => {
      return <div>
        <h5>
          {label}
        </h5>
        <Form.Control {...field}

                      isInvalid={touched[field.name] && errors[field.name]}
                      as={type}>
          {(children) ? children.map((v, i) => <option key={i}>{v}</option>) : null}
        </Form.Control>
        <p style={{ color: "red" }}>{errors[field.name]}</p>
      </div>;
    };
  };

  render() {
    const { user, settings, togglePicturePicker, storePictureToCrop, removePictureToCrop, storePictureCropped } = this.props;
    return <div>
      <Formik
        validationSchema={Yup.object().shape({
          firstName: Yup.string()
            .required("First name is required."),
          email: Yup.string()
            .email("Invalid Email")
            .required("Email is required."),
          university: Yup.string()
            .required("University is required."),
          subject: Yup.string()
            .required("Subject is required."),
          area: Yup.string()
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
            .required("Gender is required.")

        })}
        initialValues={{ email: user.email, firstName: user.firstName, ...user.mentorProfile }}
        onSubmit={(values, { setSubmitting }) => {
          this.props.saveMentorSettings(values).then(r => {
            if (r.success) {
              toast.success("Settings saved successfully");
              setSubmitting(false);
            } else toast.error("There was a problem saving your settings");
          });
        }
        }
        render={({ values, touched, errors, isSubmitting, setFieldValue }) => (
          <FormikForm>
            <Row>
              <Col md={3}>
                <h5>Profile picture </h5>
                <ProfilePicture user={user} settings={settings}
                                togglePicturePicker={togglePicturePicker}
                                storePictureToCrop={storePictureToCrop}
                                removePictureToCrop={removePictureToCrop}
                                storePictureCropped={storePictureCropped}
                />
              </Col>
              <Col md={6}>

                <Field name="firstName" render={({ field, form: { touched, errors } }) =>
                  <TextFieldWithLabel label="Your first name" field={field} touched={touched} errors={errors} />}
                />


                <Field name="email" render={({ field, form: { touched, errors } }) =>
                  <TextFieldWithLabel label="Your current email address" field={field} touched={touched} errors={errors} />}
                />

                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
                <span>{user.emailConfirmed ? "Email Confirmed" : "Email Not Confirmed"}</span>
              </Col>
            </Row>
            <br/>

            {this.props.user.onboarded ?
              <div>
                <Row>
                  <Col>
                    <Field name="university" render={({ field, form: { touched, errors } }) =>
                      <TextFieldWithLabel label="Your current University" field={field} touched={touched} errors={errors} />}
                    />
                  </Col>
                  <Col>

                    <Field name="subject" render={({ field, form: { touched, errors } }) =>
                      <TextFieldWithLabel label="Your current subject" field={field} touched={touched} errors={errors} />}
                    />
                  </Col>
                  <Col>
                    <Field name="area" render={({ field, form: { touched, errors } }) =>
                      <AreaOfDegreePicker setFieldValue={setFieldValue} field={field} touched={touched} errors={errors} />}
                    />
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col>
                    <Field name="level" render={({ field, form: { touched, errors } }) =>
                      <DegreeLevelPicker setFieldValue={setFieldValue} field={field} touched={touched} errors={errors} />}
                    />
                  </Col>
                  <Col>
                    <Field name="year" render={({ field, form: { touched, errors } }) =>
                      <YearPicker setFieldValue={setFieldValue} field={field} touched={touched} errors={errors} />}
                    />
                  </Col>
                  <Col>
                    <Field name="firstGenStudent" render={({ field, form: { touched, errors } }) =>
                      <FirstGenerationStudentPicker user={user} setFieldValue={setFieldValue} field={field} touched={touched} errors={errors} />}
                    />
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col>
                    <Field name="country" render={({ field, form: { touched, errors } }) => <CountryPicker setFieldValue={setFieldValue} field={field} touched={touched}
                                            errors={errors}/>
                    }
                    />
                  </Col>
                  <Col>
                    <Field name="city" render={({ field, form: { touched, errors } }) =>
                      <TextFieldWithLabel label="Your city of origin" field={field} touched={touched} errors={errors} />}
                    />
                  </Col>
                  <Col>
                    <Field name="gender" render={({ field, form: { touched, errors } }) =>
                      <GenderPicker setFieldValue={setFieldValue} field={field} touched={touched} errors={errors} />}
                    />
                  </Col>
                </Row>
              </div> : <Button onClick={() => this.props.history.push("/onboard")}>Looks like you are not onboarded, go
                finish</Button>}

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
      <ToastContainer/>
    </div>;
  }
};

export default MentorSettings;