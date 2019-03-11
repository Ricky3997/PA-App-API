import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Formik, Form as FormikForm, Field } from "formik";
import { Icon } from "react-fa";
import * as Yup from "yup";
import * as _ from "lodash";
import { Checkbox, Select } from "antd";
import defaults from "../../defaults/defaults";
const { Option } = Select;

const RequestApprovalMenteeModal = (props) => {
  const {showModal, ...initialValues} = props.menteeHome; //destrucutre props so you avoid passing down showModal to the values held in formik
  return <Formik
    validationSchema={Yup.object().shape({
      confirmCommittment: Yup.mixed().oneOf([true])
        .required("Commitment is required."),

      ethnicBackground: Yup.string()
        .required("ethnicBackground is required."),
      typeOfHighSchool: Yup.string()
        .required("typeOfHighSchool is required."),
      fromThreeLargestCity: Yup.number()
        .required("fromThreeLargestCity is required."),
      hobbiesAndInterests: Yup.array()
        .required('hobbiesAndInterests required'),
      careerInterests: Yup.array()
        .required('careerInterests required'),
      yearBorn: Yup.string()
        .required("yearBorn is required."),
      referral: Yup.array()
      .required('referral required'),
    })}
    initialValues={{confirmCommittment: false, initialValues}}
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
          onHide={() => props.onHide(values)}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              We just need a couple more questions
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Row>
              <Col>
                <h6>What's your ethnic background?</h6>

                <Field name="ethnicBackground" render={({ field, form: { touched, errors } }) => <Select showSearch
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
                <h6>What type of school is {props.user.menteeProfile.school}? <span aria-labelledby={'school'} role={'img'}>🏫</span></h6>

                <Field name="typeOfHighSchool" render={({ field, form: { touched, errors } }) => <Select showSearch
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
                <h6>Are you from one of the 3 largest cities in {props.user.menteeProfile.country}?</h6>

                <Field name="fromThreeLargestCity" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                           size={"large"}
                                                                                                           style={{ width: "100%" }}
                                                                                                           value={field.value}
                                                                                                           placeholder={ 'Yes, No'}
                                                                                                           onChange={(o) => setFieldValue(field.name, o)}
                                                                                                           tokenSeparators={[",", ":"]}>


                  <Option value={1}>Yes</Option>
                  <Option value={0}>No</Option>

                </Select> } />
              </Col>
            </Row>

            <br />

            <Row>
              <Col>
                <h6>What are your hobbies?</h6>

                <Field name="hobbiesAndInterests" render={({ field, form: { touched, errors } }) => <Select showSearch
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
                <h6>What are your career interests after studying at {props.user.menteeProfile.university}</h6>

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

              <Col md={4}>
                <h6>What year were you born? <span aria-labelledby={'newborn'} role={'img'}>🐣</span></h6>

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

            </Row>

            {/*Not convinced we need, but have to check:
            1) Phone Number
            2) Poste Code
            4) High school diploma in what system
            5) Funny fact about you
            5) What made you interested in this subject in particular? What parts interest you within your discipline? This is our chance to learn more about what you care about in an informal wa*
            */}

            <br />

            <Row>
              <Col>
                <h6>Who referred you to us? Because we’d like to send them a thank you <span aria-labelledby={'gift'} role={'img'}>🎁</span></h6>

                <Field name="referral" render={({ field, form: { touched, errors } }) => <Select showSearch
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
                  <b>{' I am committing to being an active mentee and make sure I make the most of my mentor\'s  help'}</b>
                </span>
                }
                />
              </Col>
            </Row>



          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" onClick={() => props.onSubmit(values)} variant="success" disabled={isSubmitting || !_.isEmpty(errors)} >
              <span>{"Let's go "} <Icon name="fas fa-arrow-right"/> </span>
            </Button>
          </Modal.Footer>
        </Modal>
      </FormikForm>
    )}/>
};

export default RequestApprovalMenteeModal;
