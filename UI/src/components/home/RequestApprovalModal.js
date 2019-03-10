import React from "react";
import { Button, Col, Form, Image, InputGroup, Modal, Row } from "react-bootstrap";
import { Formik, Form as FormikForm, Field } from "formik";
import { Icon } from "react-fa";
import * as Yup from "yup";
import * as _ from "lodash";
import { Checkbox, Select } from "antd";
import defaults from "../../defaults/defaults";
import SubjectsInSchoolPicker from "../various/forms/SubjectsInSchoolPicker";
import UniversityPicker from "../various/forms/UniversityPicker";
const { Option } = Select;

const RequestApprovalModal = (props) => {
  return <Formik
    validationSchema={Yup.object().shape({
      confirmCommittment: Yup.mixed().oneOf([true])
        .required("Commitment is required."),
    })}
    initialValues={{confirmCommittment: false }}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);
    }}
    render={({ values, touched, errors, isSubmitting, setFieldValue }) => (
      <FormikForm>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
          show={props.show}
          onHide={props.onHide}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              We just need a couple more questions
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>


            <Row>
              <Col>
                <h6>Do you want to link to your LinkedIn profile?</h6>

                <Field name="linkedin" render={({ field, form: { touched, errors } }) => <InputGroup className="md-6">
                  <InputGroup.Prepend>
                    <InputGroup.Text><Image src={'http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c528.png'} style={{maxHeight: '16px'}} /></InputGroup.Text>
                  </InputGroup.Prepend>
                  <div>
                    <Form.Control {...field} placeholder="www.linkedin.com/in/amazingmentor"
                                  isInvalid={touched[field.name] && errors[field.name]}/>
                    {touched[field.name] && errors[field.name] ?
                      <p style={{ color: "red" }}>{errors[field.name]}</p> : null}
                  </div>
                </InputGroup> } />
              </Col>
            </Row>

            <br />

            <Row>
              <Col>
                <h6>What's your ethnic background?</h6>

                <Field name="ethnic_background" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                 size={"large"}
                                                                                                 style={{ width: "100%" }}
                                                                                                 value={field.value}
                                                                                                 placeholder={ 'White, Black African, Mixed...'}
                                                                                                 onChange={(o) => setFieldValue(field.name, o)}
                                                                                                 tokenSeparators={[",", ":"]}>


                  {defaults.ethnic_background.map(e => <Option key={e} value={e}>{e}</Option>)}

                </Select> } />
              </Col>
            </Row>

            <br />

            <Row>
              <Col>
                <h6>What type of high school did you attend? 🏫</h6>

                <Field name="school_type" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                          size={"large"}
                                                                                                          style={{ width: "100%" }}
                                                                                                          value={field.value}
                                                                                                          placeholder={ 'State selective, State non selective...'}
                                                                                                          onChange={(o) => setFieldValue(field.name, o)}
                                                                                                          tokenSeparators={[",", ":"]}>


                  {defaults.school_type.map(e => <Option key={e} value={e}>{e}</Option>)}

                </Select> } />
              </Col>
              <Col>
                <h6>Are you from one of the 3 largest cities in {props.user.mentorProfile.country}?</h6>

                <Field name="largestThreeCities" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                           size={"large"}
                                                                                                           style={{ width: "100%" }}
                                                                                                           value={field.value}
                                                                                                           placeholder={ 'Yes, No'}
                                                                                                           onChange={(o) => setFieldValue(field.name, o)}
                                                                                                           tokenSeparators={[",", ":"]}>


                  <Option value={'true'}>Yes</Option>
                  <Option value={'false'}>No</Option>

                </Select> } />
              </Col>
            </Row>

            <br />

            <Row>
              <Col>
                <h6>What subjects did you study in school?</h6>

                <Field name="subjectsInSchool" render={({ field, form: { touched, errors } }) =>
                  <SubjectsInSchoolPicker approval setFieldValue={setFieldValue} field={field} touched={touched} errors={errors} multiple/> } />
              </Col>
            </Row>

            <br />

            <Row>
              <Col>
                <h6>What are your hobbies?</h6>

                <Field name="interestesAndHobbies" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                             size={"large"} mode="multiple"
                                                                                                             style={{ width: "100%" }}
                                                                                                             value={field.value}
                                                                                                             placeholder={ 'Painting, running..'}
                                                                                                             onChange={(o) => setFieldValue(field.name, o)}
                                                                                                             tokenSeparators={[",", ":"]}>


                  {defaults.interests_and_hobbies.map(e => <Option key={e} value={e}>{e}</Option>)}

                </Select> } />
              </Col>
            </Row>

            <br />

            <Row>
              <Col>
                <h6>What are your career interests after studying at {props.user.mentorProfile.university}</h6>

                <Field name="careerInterests" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                        size={"large"} mode="multiple"
                                                                                                        style={{ width: "100%" }}
                                                                                                        value={field.value}
                                                                                                        placeholder={ 'Finance, engineering..'}
                                                                                                        onChange={(o) => setFieldValue(field.name, o)}
                                                                                                        tokenSeparators={[",", ":"]}>


                  {defaults.career_interests.map(e => <Option key={e} value={e}>{e}</Option>)}

                </Select> } />
              </Col>
            </Row>

            <br />

            <Row>
              <Col>
                <h6>Congratulations on studying at {props.user.mentorProfile.university}! Besides that, what other universities did you successfully apply for?</h6>

                <Field name="universitiesAppliedFor" render={({ field, form: { touched, errors } }) =>
                  <UniversityPicker approval setFieldValue={setFieldValue} field={field} touched={touched} mentee multiple errors={errors}/>} />
              </Col>
            </Row>

            <br />

            <Row>
              <Col>
                <h6>What year were you born? 🐣</h6>

                <Field name="yearBorn" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                 size={"large"}
                                                                                                 style={{ width: "100%" }}
                                                                                                 value={field.value}
                                                                                                 placeholder={ '1991,1997....'}
                                                                                                 onChange={(o) => setFieldValue(field.name, o)}
                                                                                                 tokenSeparators={[",", ":"]}>


                  {defaults.yearBorn.map(e => <Option key={e} value={e}>{e}</Option>)}

                </Select> } />
              </Col>
              <Col>
                <h6>What year will you graduate (or graduated)? 🎓</h6>

                <Field name="yearGraduate" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                 size={"large"}
                                                                                                 style={{ width: "100%" }}
                                                                                                 value={field.value}
                                                                                                 placeholder={ '2017, 2019..'}
                                                                                                 onChange={(o) => setFieldValue(field.name, o)}
                                                                                                 tokenSeparators={[",", ":"]}>


                  {defaults.yearGraduate.map(e => <Option key={e} value={e}>{e}</Option>)}

                </Select> } />
              </Col>
            </Row>

            <br />


            {/*Not convinced we need, but have to check:
            1) Phone Number
            2) Poste Code
            3) Year born
            4) High school diploma in what system
            5) Funny fact about you
            5) What made you interested in this subject in particular? What parts interest you within your discipline? This is our chance to learn more about what you care about in an informal wa*


            */}

            <Row>
              <Col>
                <h6>Who referred you to us? Because we’d like to send them a thank you 🎁</h6>

                <Field name="referrer" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                 mode={ "multiple"}
                                                                                                 size={"large"}
                                                                                                 style={{ width: "100%" }}
                                                                                                 value={field.value}
                                                                                                 placeholder={ 'Google, Instagram..'}
                                                                                                 onChange={(o) => setFieldValue(field.name, o)}
                                                                                                 tokenSeparators={[",", ":"]}>


                  {defaults.referrer.map(e => <Option key={e} value={e}>{e}</Option>)}

                </Select> } />
              </Col>
            </Row>



            <br />
            <Row>
              <Col>
                <Field name="committment" render={({ field, form: { touched, errors } }) => <span>
                  <Checkbox checked={values.confirmCommittment} onChange={(e) => setFieldValue('confirmCommittment', e.target.checked)}/>
                  <b>{' I am happy to dedicate one hour per month helping my mentee(s)'}</b>
                </span>
                }
                />
              </Col>
            </Row>



          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="success" disabled={isSubmitting || !_.isEmpty(errors)}>
              <span>{"Let's go "} <Icon name="fas fa-arrow-right"/> </span>
            </Button>
          </Modal.Footer>
        </Modal>
      </FormikForm>
    )}/>
};

export default RequestApprovalModal;
