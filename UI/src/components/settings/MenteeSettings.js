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
import * as _ from "lodash";
import EmailConfirmed from "./EmailConfirmed";
import { Select } from "antd";
import UniversityPicker from "../various/forms/UniversityPicker";
import defaults from "../../defaults/defaults";
import { LinkContainer } from "react-router-bootstrap";
import CoursePicker from "../various/forms/CoursePicker";

const { Option } = Select;

const MenteeSettings = (props) => {
  if (!props.user.onboarded) return <div>
    <h6>Looks like you are not onboarded, settings are only available when you are done with that!</h6>
    <LinkContainer to={"/onboard"}>
      <Button>
        Go finish onboard
      </Button>
    </LinkContainer>
  </div>;
  const { user, settings, togglePicturePicker, storePictureToCrop, removePictureToCrop, storePictureCropped, history } = props;
  const { relationship, ...initialVals } = user.menteeProfile;
  return <div>
    <Formik
      validationSchema={Yup.object().shape({
        firstName: Yup.string()
          .required("First name is required."),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required."),
        school: Yup.string()
          .min(3)
          .required("School is required."),
        subjects: Yup.array()
          .required("Subjects are required."),
        year: Yup.string()
          .required("Year is required."),
        interestedIn: Yup.array()
          .required("Courses required"),
        unisApplyingFor: Yup.array()
          .required("Unis required"),
        level: Yup.string()
          .required("Level is required."),


        ethnicBackground: Yup.string()
          .required("ethnicBackground is required."),
        typeOfHighSchool: Yup.string()
          .required("typeOfHighSchool is required."),
        fromThreeLargestCity: Yup.number()
          .required("fromThreeLargestCity is required."),
        hobbiesAndInterests: Yup.array()
          .required("hobbiesAndInterests required"),
        coursesApplyingFor: Yup.array()
          .required("hobbiesAndInterests required"),
        careerInterests: Yup.array()
          .required("careerInterests required"),
        yearBorn: Yup.number()
          .required("yearBorn is required."),
        yearStart: Yup.number()
          .required("yearStart is required."),
        referral: Yup.array()
          .required("referral required"),
        notes: Yup.string()

      })}
      initialValues={{
        email: user.email,
        firstName: user.firstName, ...initialVals,
        fromThreeLargestCity: initialVals.fromThreeLargestCity ? 1 : 0
      }}
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
                  <Field name="country" render={({ field, form: { touched, errors } }) =>
                    <CountryPicker settings setFieldValue={setFieldValue} field={field} touched={touched}
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
                  <Form.Label>One of 3 largest cities?</Form.Label>

                  <Field name="fromThreeLargestCity"
                         render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                   size={"large"}
                                                                                   style={{ width: "100%" }}
                                                                                   value={field.value}
                                                                                   placeholder={"Yes, No"}
                                                                                   onChange={(o) => setFieldValue(field.name, o)}
                                                                                   tokenSeparators={[",", ":"]}>


                           <Option value={1}>Yes</Option>
                           <Option value={0}>No</Option>

                         </Select>}/>
                </Col>
                <Col>
                  <Field name="gender" render={({ field, form: { touched, errors } }) =>
                    <GenderPicker setFieldValue={setFieldValue} field={field} touched={touched} errors={errors}/>}
                  />
                </Col>
                <Field name="firstGenStudent" render={({ field, form: { touched, errors } }) =>
                  <FirstGenerationStudentPicker user={user} setFieldValue={setFieldValue} field={field}
                                                touched={touched}
                                                errors={errors}/>}
                />
              </Row>
              <br/>
              <Row>
                <Col>
                  <Field name="school" render={({ field, form: { touched, errors } }) =>
                    <TextFieldWithLabel label="Your current school" field={field} touched={touched} errors={errors}/>}
                  />
                </Col>
                <Col>
                  <Form.Label>High school type</Form.Label>
                  <Field name="typeOfHighSchool" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                           size={"large"}
                                                                                                           style={{ width: "100%" }}
                                                                                                           value={field.value}
                                                                                                           placeholder={"State selective, State non selective..."}
                                                                                                           onChange={(o) => setFieldValue(field.name, o)}
                                                                                                           tokenSeparators={[",", ":"]}>


                    {defaults.school_type.map(e => <Option key={e} value={e}>{e}</Option>)}

                  </Select>}/>
                </Col>
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
                  <Field name="year" render={({ field, form: { touched, errors } }) =>
                    <YearPicker setFieldValue={setFieldValue} field={field} touched={touched} errors={errors}/>}
                  />
                </Col>
              </Row>

              <br/>

              <Row>
                <Col>
                  <Form.Label>Ethnic Background</Form.Label>
                  <Field name="ethnicBackground" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                           size={"large"}
                                                                                                           style={{ width: "100%" }}
                                                                                                           value={field.value}
                                                                                                           placeholder={"White, Black African, Mixed..."}
                                                                                                           onChange={(o) => setFieldValue(field.name, o)}
                                                                                                           tokenSeparators={[",", ":"]}>


                    {defaults.ethnic_background.map(e => <Option key={e} value={e}>{e}</Option>)}

                  </Select>}/>
                </Col>
                <Col>
                  <Field name="level" render={({ field, form: { touched, errors } }) =>
                    <DegreeLevelPicker mentee setFieldValue={setFieldValue} field={field} touched={touched}
                                       errors={errors}/>}
                  />
                </Col>
                <Col>
                  <Field name="interestedIn" render={({ field, form: { touched, errors } }) =>
                    <AreaOfDegreePicker multiple setFieldValue={setFieldValue} field={field} touched={touched}
                                        errors={errors}/>}
                  />
                </Col>
                <Col>
                  <Field name="unisApplyingFor" render={({ field, form: { touched, errors } }) =>
                    <UniversityPicker setFieldValue={setFieldValue} field={field} touched={touched} mentee multiple
                                      errors={errors}/>}
                  />
                </Col>
              </Row>

              <br/>

              <Row>
                <Col>
                  <Form.Label>Hobbies?</Form.Label>
                  <Field name="hobbiesAndInterests" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                              size={"large"}
                                                                                                              mode="multiple"
                                                                                                              style={{ width: "100%" }}
                                                                                                              value={field.value}
                                                                                                              placeholder={"Painting, running.."}
                                                                                                              onChange={(o) => setFieldValue(field.name, o)}
                                                                                                              tokenSeparators={[",", ":"]}>


                    {defaults.interests_and_hobbies.map(e => <Option key={e} value={e}>{e}</Option>)}

                  </Select>}/>
                </Col>
                <Col>
                  <Form.Label>Career interests</Form.Label>
                  <Field name="careerInterests" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                          size={"large"}
                                                                                                          mode="multiple"
                                                                                                          style={{ width: "100%" }}
                                                                                                          value={field.value}
                                                                                                          placeholder={"Finance, engineering.."}
                                                                                                          onChange={(o) => setFieldValue(field.name, o)}
                                                                                                          tokenSeparators={[",", ":"]}>


                    {defaults.career_interests.map(e => <Option key={e} value={e}>{e}</Option>)}

                  </Select>}/>
                </Col>
                <Col>
                  <Field name="coursesApplyingFor" render={({ field, form: { touched, errors } }) =>
                    <CoursePicker multiple field={field} touched={touched} errors={errors}
                                  setFieldValue={setFieldValue}/>}/>
                </Col>
              </Row>

              <br/>

              <Row>
                <Col>
                  <Form.Label>Year of birth</Form.Label>
                  <Field name="yearBorn" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                   size={"large"}
                                                                                                   style={{ width: "100%" }}
                                                                                                   value={field.value}
                                                                                                   placeholder={"1991,1997...."}
                                                                                                   onChange={(o) => setFieldValue(field.name, o)}
                                                                                                   tokenSeparators={[",", ":"]}>


                    {defaults.yearBorn.map(e => <Option key={e} value={e}>{e}</Option>)}
                  </Select>}/>
                </Col>
                <Col>
                  <Form.Label>Graduation year</Form.Label>
                  <Field name="yearStart" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                    size={"large"}
                                                                                                    style={{ width: "100%" }}
                                                                                                    value={field.value}
                                                                                                    placeholder={"2017, 2019.."}
                                                                                                    onChange={(o) => setFieldValue(field.name, o)}
                                                                                                    tokenSeparators={[",", ":"]}>


                    {defaults.yearGraduate.map(e => <Option key={e} value={e}>{e}</Option>)}

                  </Select>}/>
                </Col>
                <Col>
                  <Form.Label>Referral</Form.Label>
                  <Field name="referral" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                   mode={"multiple"}
                                                                                                   size={"large"}
                                                                                                   style={{ width: "100%" }}
                                                                                                   value={field.value}
                                                                                                   placeholder={"Google, Instagram.."}
                                                                                                   onChange={(o) => setFieldValue(field.name, o)}
                                                                                                   tokenSeparators={[",", ":"]}>


                    {defaults.referrer.map(e => <Option key={e} value={e}>{e}</Option>)}
                  </Select>}/>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Notes</Form.Label>
                  <Field name="notes" render={({ field, form: { touched, errors } }) => <div>
                    <Form.Control {...field} as="textarea" rows="3" placeholder="I also wanted to say that.."/>
                  </div>
                  }/>
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