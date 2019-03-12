import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Formik, Form as FormikForm, Field } from "formik";
import { Icon } from "react-fa";
import * as Yup from "yup";
import * as _ from "lodash";
import { toast } from "react-toastify";

const RejectionReasonModal = (props) => {
  return <Formik
    validationSchema={Yup.object().shape({
      rejectionReason: Yup.string()
        .required("Reason is required.")
        .min(10)
    })}
    initialValues={{ rejectionReason: "" }}
    onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);
    }}
    render={({ values, touched, errors, isSubmitting }) => (
      <FormikForm>
        <Modal
          size="small"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop="static"
          show={props.showModal}
          onHide={props.onHide}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Why are you rejecting {props.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <h6>Rejecting an applicant can be very demoralising, can you explain them the reason for your
                  decision?</h6>

                <Field name="rejectionReason" render={({ field, form: { touched, errors } }) => <div>

                  <Form.Control {...field} as="textarea" rows="3" placeholder="The decision was taken because..."
                                isInvalid={touched[field.name] && errors[field.name]}/>
                  {touched[field.name] && errors[field.name] ?
                    <p style={{ color: "red" }}>{errors[field.name]}</p> : null}
                </div>
                }/>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={props.onHide}>Cancel</Button>
            <Button variant="danger"
                    onClick={() => {
                      props.onHide();
                      props.changeStatus(props.id, "rejected", values.rejectionReason).then(r => {
                        if (r.success) {
                          toast.success("Rejected");
                        } else toast.error("There was an error")
                      })
                    }} disabled={isSubmitting || !_.isEmpty(errors) || _.isEmpty(touched)}>
              <span>{"Reject "} <Icon name="fas fa-ban"/> </span>
            </Button>
          </Modal.Footer>
        </Modal>
      </FormikForm>
    )}/>;
};

export default RejectionReasonModal;
