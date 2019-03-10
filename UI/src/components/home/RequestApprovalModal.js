import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Formik, Form as FormikForm, Field } from "formik";
import { Icon } from "react-fa";
import * as Yup from "yup";
import * as _ from "lodash";
import { Checkbox } from "antd";

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
                <Field name="committment" render={({ field, form: { touched, errors } }) => <div>
                  <Checkbox checked={values.confirmCommittment} onChange={(e) => setFieldValue('confirmCommittment', e.target.checked)}/>
                    {' I am happy to dedicate one hour per month helping my mentee(s)'}
                </div>
                }
                />
              </Col>
            </Row>





            {/*What's the first thing that someone who's never met you should know about you?*/}
            {/*What are your interests and hobbies?*/}

          {/*What are your career interests after university?*/}

          {/*PHONE NUMBER?!!?!!!?*/}

          {/*Do you have a LinkedIn link that you'd like to share on your profile?*/}

          {/*Are you from one of the three largest cities in your country?*/}


          {/*. What is your post code?*/}

          {/*What is your ethnic background?
White
Mixed / multiple ethnic groups
Asian
Black African / Caribbean
Other*/}


          {/* In what year were you born???!?!?!??!?!!*/}

          {/*Did you do your high school diploma in one of the following systems?!?!?!?!?*/}

            {/*SUBJECTS IN SCHOOL FOR MENTOR?!?!?!?*/}


            {/*SUNIVERSITIES SUCCESSFULLY APPLIED?!?!?!?*/}


            {/*Thanks! Now, let’s get into a bit more detail. What made you interested in this subject in particular? What parts interest you within your discipline? This is our chance to learn more about what you care about in an informal wa*/}

            {/*What year did you start your university degree?*/}

            {/*What year will you be graduating (did you graduate)?*/}

            {/*What type of high school did you attend?*/}

            {/*Who referred you to us? Because we’d like to send them a thank you ;)*/}

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
