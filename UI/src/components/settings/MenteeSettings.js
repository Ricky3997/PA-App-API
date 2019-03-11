import React from "react";
import { Field, Form as FormikForm, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Button, Col, Row } from "react-bootstrap";
import ProfilePicture from "./ProfilePicture";
import TextFieldWithLabel from "../various/forms/TextFieldWithLabel";
import Form from "react-bootstrap/es/Form";
import AreaOfDegreePicker from "../various/forms/AreaOfDegreePicker";
import DegreeLevelPicker from "../various/forms/DegreeLevelPicker";
import YearPicker from "../various/forms/YearPicker";
import FirstGenerationStudentPicker from "../various/forms/FirstGenerationStudentPicker";
import CountryPicker from "../various/forms/CountryPicker";
import GenderPicker from "../various/forms/GenderPicker";
import Loader from "react-loader-spinner";
import SubjectsInSchoolPicker from "../various/forms/SubjectsInSchoolPicker";
import UnisApplyingFor from "../various/forms/UnisApplyingFor";
import * as _ from "lodash"
import EmailConfirmed from "./EmailConfirmed";

const MenteeSettings = (props) => {
  const { user, settings, togglePicturePicker, storePictureToCrop, removePictureToCrop, storePictureCropped, history } = props;
  return <div>
    <Formik
      validationSchema={Yup.object().shape({
        firstName: Yup.string()
          .required("First name is required."),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required."),
        school: Yup.string()
          .required("School is required."),
        interestedIn: Yup.array()
          .required("Interested In is Required"),
        subjects: Yup.array()
          .required("Subjects are required."),
        unisApplyingFor: Yup.array()
          .required("Unis applying for are required."),
        level: Yup.string()
          .required("Level is required."),
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
      initialValues={{ email: user.email, firstName: user.firstName, ...user.menteeProfile }}
      onSubmit={(values, { setSubmitting }) => {
        props.saveSettings(values).then(r => {
          setSubmitting(false);
          if (r.success) toast.success("Settings saved successfully");
          else toast.error("There was a problem saving your settings");
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
                <TextFieldWithLabel label="Your first name" field={field} touched={touched} errors={errors}/>}
              />


              <Field name="email" render={({ field, form: { touched, errors } }) =>
                <TextFieldWithLabel label="Your current email address" field={field} touched={touched}
                                    errors={errors}/>}
              />

              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>

              <EmailConfirmed user={props.user} sendEmailConfirmationAgain={props.sendEmailConfirmationAgain}/>

            </Col>
          </Row>
          <br/>

          {user.onboarded ?
            <div>

              <Row>
                <Col>
                  <Field name="school" render={({ field, form: { touched, errors } }) =>
                    <TextFieldWithLabel label="Your current school" field={field} touched={touched} errors={errors}/>}
                  />
                </Col>
                <Col>
                  <Field name="year" render={({ field, form: { touched, errors } }) =>
                    <YearPicker mentee setFieldValue={setFieldValue} field={field} touched={touched} errors={errors}/>}
                  />
                </Col>
                <Col>
                  <Field name="level" render={({ field, form: { touched, errors } }) =>
                    <DegreeLevelPicker mentee setFieldValue={setFieldValue} field={field} touched={touched}
                                       errors={errors}/>}
                  />
                </Col>
              </Row>

              <br/>

              <Row>
                <Col>
                  <Field
                    name="subjects"
                    render={({ field, form: { touched, errors } }) =>
                      <SubjectsInSchoolPicker setFieldValue={setFieldValue} field={field} touched={touched}
                                              errors={errors}/>
                    }
                  />
                </Col>

                <Col>
                  <Field name="interestedIn" render={({ field, form: { touched, errors } }) =>
                    <AreaOfDegreePicker mode="multiple" setFieldValue={setFieldValue} field={field} touched={touched}
                                        errors={errors}/>}
                  />
                </Col>
                <Col>
                  <Field name="unisApplyingFor" render={({ field, form: { touched, errors } }) =>
                    <UnisApplyingFor setFieldValue={setFieldValue} field={field} touched={touched} errors={errors}/>}
                  />
                </Col>
              </Row>

              <br/>

              <Row>
                <Col>
                  <Field name="firstGenStudent" render={({ field, form: { touched, errors } }) =>
                    <FirstGenerationStudentPicker user={user} setFieldValue={setFieldValue} field={field}
                                                  touched={touched} errors={errors}/>}
                  />
                </Col>
                <Col>
                  <Field name="country"
                         render={({ field, form: { touched, errors } }) => <CountryPicker setFieldValue={setFieldValue}
                                                                                          field={field}
                                                                                          touched={touched}
                                                                                          errors={errors}/>
                         }
                  />
                </Col>
                <Col>
                  <Field name="city" render={({ field, form: { touched, errors } }) =>
                    <TextFieldWithLabel label="What city are you from?" field={field} touched={touched}
                                        errors={errors}/>}
                  />
                </Col>
                <Col>
                  <Field name="gender" render={({ field, form: { touched, errors } }) =>
                    <GenderPicker setFieldValue={setFieldValue} field={field} touched={touched} errors={errors}/>}
                  />
                </Col>
              </Row>
            </div> :
            <Button onClick={() => history.push("/onboard")}>
              Looks like you are not onboarded, go finish
            </Button>}

          <br/>
          <Row>
            <Col md={{ size: 2, offset: 8 }}>
              <Button variant="secondary" block onClick={() => history.push("/")}>
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
  </div>;

};

export default MenteeSettings;