import React from "react";
import { Badge, Button, Col, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import * as Yup from "yup";
import * as api from "../../api";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ErrorMessage, Field, Form as FormikForm, Formik } from "formik";
import * as _ from "lodash";

const MentorOnboarding = (props) => {
  return <div>
    <Formik
      validationSchema={Yup.object().shape({
        country: Yup.string()
          .min(3)
          .required("Country is required."),
        city: Yup.string()
          .min(3)
          .required("City is required.")
      })}
      initialValues={{ country: "", city: "" }}
      onSubmit={({ email, userType, firstName }, { setSubmitting }) => {
        if(props.onboarding.step !== 4) props.changeStage(1);
        else api.post().then(r => {
          if (r.success) {
            window.localStorage.setItem("token", r.payload.token);
            props.updateUser(r.payload.user);
            props.changeStage(1);
          } else toast.error("There was an error registering you");
          setSubmitting(false);
        });
        return
      }}
      render={({ values, touched, errors, isSubmitting }) => (
        <FormikForm>

          {props.onboarding.step === 2 ? <div>
            <Row style={{ paddingTop: "80px" }}>
              <Col md={{ span: 6, offset: 3 }}>
                <p>
                  Awesome {props.user.firstName}!! Now we'll ask you a couple of details so it's easier to find
                  the perfect match with
                  a {props.user.type === "mentee" ? "current university student who can help you!" : "younger student needing your help!"}
                </p>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 3, offset: 3 }}>
                <Field
                  type="text"
                  name="country"
                  render={({ field, form: { touched, errors } }) => {
                    return <div>
                      <Form.Label>Your country of origin</Form.Label>
                      <Form.Control {...field}
                                    isInvalid={touched[field.name] && errors[field.name]}/>
                      <ErrorMessage name={field.name}/>
                    </div>;
                  }}
                />

              </Col>
              <Col md={{ span: 3 }}>
                <Field
                  type="text"
                  name="city"
                  render={({ field, form: { touched, errors } }) => {
                    return <div>
                      <Form.Label>Your city of origin</Form.Label>
                      <Form.Control {...field}
                                    isInvalid={touched[field.name] && errors[field.name]}/>
                      <ErrorMessage name={field.name}/>
                    </div>;
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 3, offset: 3 }}>
                <Field
                  type="select"
                  name="gender"
                  render={({ field, form: { touched, errors } }) => {
                    return <div>
                      <Form.Label>Your gender</Form.Label>
                      <Form.Control {...field}
                                    isInvalid={touched[field.name] && errors[field.name]}
                                    as="select">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Prefer not to say</option>
                      </Form.Control>
                      <ErrorMessage name={field.name}/>
                    </div>;
                  }}
                />

              </Col>
              <Col md={{ span: 3 }}>

                <Field
                  type="select"
                  name="gender"
                  render={({ field, form: { touched, errors } }) => {
                    return <div>
                      <Form.Label>
                <span>{"First generation student? "}

                  <OverlayTrigger placement="bottom"
                                  overlay={<Tooltip placement="bottoom" className="in">
                                    {props.user.type === "mentee" ?
                                      "Knowing whether your parents went to University will help us find a current university student coming from your same background who will be able to relate to you better!!" :
                                      "Knowing whether your parents went to University will help us find a younger student needing your help who, coming from your same background, will be able to relate to you better!!"}
                                  </Tooltip>}>
                                    <Badge pill variant="info">
                                        Why?
                                    </Badge>
                                </OverlayTrigger>
                    </span></Form.Label>
                      <Form.Control {...field}
                                    isInvalid={touched[field.name] && errors[field.name]}
                                    as="select">
                        <option>Yes</option>
                        <option>No</option>
                      </Form.Control>
                      <ErrorMessage name={field.name}/>
                    </div>;
                  }}
                />
              </Col>
            </Row>
          </div> : null}

          {props.onboarding.step === 3 ? <div>
            Third step
          </div> : null}

          {props.onboarding.step === 4 ? <div>
            Fourth step
          </div> : null}

          <Form.Row>
            {props.onboarding.step !== 4 && props.onboarding.step !== 2 ? <Col md={{ span: 3, offset: 3 }}>
              <Button block onClick={() => props.changeStage(-1)}>
                Previous
              </Button>
            </Col> : null}
            <Col md={{ span: props.onboarding.step === 4 ? 6 : 3, offset: 3 }}>
              <Button block type="submit" variant="success" disabled={isSubmitting || !_.isEmpty(errors)}>
                {props.onboarding.step === 4 ? "Looks good, let's go!" : " Next"}
              </Button>
            </Col>
          </Form.Row>
        </FormikForm>
      )}
    />
    <ToastContainer/>
  </div>;
};


export default MentorOnboarding;
