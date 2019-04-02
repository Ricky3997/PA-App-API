import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Field, Form as FormikForm, Formik } from "formik";
import { Icon } from "react-fa";
import * as Yup from "yup";
import * as _ from "lodash";
import { Checkbox, Select } from "antd";
import defaults from "../../../defaults/defaults";

const { Option } = Select;

const RequestApprovalMenteeModal = (props) => {
  const { showModal, ...initialValues } = props.menteeHome; //destructure props so you avoid passing down showModal to the values held in formik
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
        .required("hobbiesAndInterests required"),
      careerInterests: Yup.array()
        .required("careerInterests required"),
      yearBorn: Yup.number()
        .required("yearBorn is required."),
      yearApply: Yup.number()
        .required("yearApply is required."),
      referral: Yup.array()
        .required("referral required"),
      examType: Yup.string()
        .required("examType required"),
      notes: Yup.string()
    })}
    initialValues={{ confirmCommittment: false, ...initialValues }}
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
              Request your mentor
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <h4>
              Before we can give you a mentor, we need to check some details and then find one that matches your profile
              to ensure they are the best possible mentor we can find: these questions help us do just that, thanks!
            </h4>

            <Row>
              <Col>
                <h6>What's your ethnic background?</h6>

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
                <h6>Are you from one of the 3 largest cities in {props.user.menteeProfile.country}?</h6>

                <Field name="fromThreeLargestCity" render={({ field, form: { touched, errors } }) => <Select showSearch
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
            </Row>

            <br/>

            <Row>
              <Col>
                <h6>What type of school is {props.user.menteeProfile.school}? <span aria-labelledby={"school"}
                                                                                    role={"img"}>🏫</span></h6>

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
                <h6>What kind of exam are you taking?</h6>

                <Field name="examType" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                 size={"large"}
                                                                                                 style={{ width: "100%" }}
                                                                                                 value={field.value}
                                                                                                 placeholder={"Exam type"}
                                                                                                 onChange={(o) => setFieldValue(field.name, o)}
                                                                                                 tokenSeparators={[",", ":"]}>


                  {defaults.examType.map(e => <Option key={e} value={e}>{e}</Option>)}

                </Select>}/>
              </Col>
            </Row>


            <br/>

            <Row>
              <Col>
                <h6>What year do you expect to apply to University?</h6>

                <Field name="yearApply" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                  size={"large"}
                                                                                                  style={{ width: "100%" }}
                                                                                                  value={field.value}
                                                                                                  placeholder={"1991,1997...."}
                                                                                                  onChange={(o) => setFieldValue(field.name, o)}
                                                                                                  tokenSeparators={[",", ":"]}>


                  {defaults.yearGraduate.map(e => <Option key={e} value={e}>{e}</Option>)}

                </Select>}/>
              </Col>
              <Col>
                <h6>What year were you born? <span aria-labelledby={"newborn"} role={"img"}>🐣</span></h6>

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

            </Row>

            <br/>

            {/*Not convinced we need, but have to check:
            1) Phone Number
            2) Poste Code
            4) High school diploma in what system
            5) Funny fact about you
            5) What made you interested in this subject in particular? What parts interest you within your discipline? This is our chance to learn more about what you care about in an informal wa*
            */}

            <Row>
              <Col>
                <h6>What are your career interests?</h6>

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
                <h6>Who referred you to us? Because we’d like to send them a thank you <span aria-labelledby={"gift"}
                                                                                             role={"img"}>🎁</span></h6>

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

            <br/>

            <Row>
              <Col>
                <h6>What are your hobbies?</h6>

                <Field name="hobbiesAndInterests" render={({ field, form: { touched, errors } }) => <Select showSearch
                                                                                                            size={"large"}
                                                                                                            mode="tags"
                                                                                                            style={{ width: "100%" }}
                                                                                                            value={field.value}
                                                                                                            placeholder={"Painting, running.."}
                                                                                                            onChange={(o) => setFieldValue(field.name, o)}
                                                                                                            tokenSeparators={[",", ":"]}>


                  {defaults.interests_and_hobbies.map(e => <Option key={e} value={e}>{e}</Option>)}

                </Select>}/>
              </Col>
            </Row>

            <br/>

            <Row>
              <Col>
                <h6>Anything else you might want to add?</h6>

                <Field name="notes" render={({ field, form: { touched, errors } }) => <div>

                  <Form.Control {...field} as="textarea" rows="3" placeholder="I also wanted to say that.."/>

                </div>
                }/>
              </Col>
            </Row>

            <br/>
            <Row>
              <Col>
                <Field name="committment" render={({ field, form: { touched, errors } }) => <span>
                  <Checkbox checked={values.confirmCommittment}
                            onChange={(e) => setFieldValue("confirmCommittment", e.target.checked)}/>
                  <b>{" I am committing to being an active mentee and make sure I make the most of my mentor's  help"}</b>
                </span>
                }
                />
              </Col>
            </Row>

            {/*NOT SURE OF:
            1) What's the first thing that someone who's never met you should know about you?
            2) ow let’s get into a bit more detail. What makes you interested in your preferred university course in particular? What are you particularly passionate about? Why are you particularly keen on studying at your first-choice university? This is your chance to demonstrate to us that you’ve done your reading beforehand, and that you’ll use the opportunity to get a mentor well. No need to write too much, but two paragraphs to answer one of these questions will be helpful for us to assess your eligibility.
            3) First vs Second choice

            */}


          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" onClick={() => props.onSubmit(values)} variant="success"
                    disabled={isSubmitting || !_.isEmpty(errors)}>
              <span>{"Let's go "} <Icon name="fas fa-arrow-right"/> </span>
            </Button>
          </Modal.Footer>
        </Modal>
      </FormikForm>
    )}/>;
};

export default RequestApprovalMenteeModal;
