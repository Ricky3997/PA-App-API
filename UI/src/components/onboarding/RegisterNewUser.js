import React from "react";
import { Badge, Button, Col, Form, Image, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import PALogo from "../../assets/pa_key.png";
import * as Yup from "yup";
import { Field, Form as FormikForm, Formik } from "formik";
import * as _ from "lodash";
import Loader from "react-loader-spinner";
import * as api from "../../api";
import { toast } from "react-toastify";
import * as queryString from "query-string";
import { Icon } from "react-fa";
import defaults from "./../../defaults/defaults.json";

const RegisterNewUser = (props) => {

  const qs = queryString.parse(props.location.search);
  let typeFromUrl;
  if (qs.type) {
    if (qs.type === "mentee") typeFromUrl = defaults.onboarding.mentee;
    if (qs.type === "mentor") typeFromUrl = defaults.onboarding.mentor;
  }

  return (
    <Row>
      <Col md={7} style={{ paddingTop: "160px" }}>
        <Image width="100px" src={PALogo}/>
        <h1>
          Where passion and potential define your future.
        </h1>
        <p>At Project Access we help disadvantaged students reach a Top University</p>
      </Col>
      <Col md={{ size: 2, offset: 1 }} style={{ paddingTop: "130px" }}>

        <Formik
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Invalid Email")
              .required("Email is required."),
            firstName: Yup.string()
              .min(3)
              .required("First name is required."),
            lastName: Yup.string()
              .min(3)
              .required("Last name is required."),
            userType: Yup.string()
          })}
          initialValues={{ email: "", firstName: "", lastName: '', userType: typeFromUrl || defaults.onboarding.mentee }}
          onSubmit={({ email, userType, firstName }, { setSubmitting }) => {

            api.post("/auth/register", {
              email: email,
              firstName: firstName,
              lastName: firstName,
              type: userType === defaults.onboarding.mentee ? "mentee" : "mentor"
            }).then(r => {

              if (r.success && !r.payload.error) {
                window.localStorage.setItem("token", r.payload.token);
                window.localStorage.setItem("user", JSON.stringify(r.payload.user));
                props.updateUser(r.payload.user);
                props.changeStage(2);
              } else if (r.success && r.payload.error === 11000) {
                toast.error("User with that email exists already");
                props.history.push("/login");
              } else toast.error("There was an error requesting your magic link, sorry");
              setSubmitting(false);
            });
          }}
          render={({ values, touched, errors, isSubmitting }) => (
            <FormikForm>

              <Field
                type="select"
                name="userType"
                render={({ field, form: { touched, errors } }) => {

                  return <Row>
                    <Col>
                      <Form.Label>Your are a</Form.Label>
                      <Form.Control {...field}

                                    isInvalid={touched[field.name] && errors[field.name]}
                                    as="select"
                      >
                        <option>{defaults.onboarding.mentee}</option>
                        <option>{defaults.onboarding.mentor}</option>
                      </Form.Control>
                      {touched[field.name] && errors[field.name] ?
                        <p style={{ color: "red" }}>{errors[field.name]}</p> : null}
                    </Col>
                  </Row>;
                }}
              />

              <Row>
                <Col>
                  <Field
                    type="text"
                    name="firstName"
                    render={({ field, form: { touched, errors } }) => {

                      return <div>
                        <Form.Label>Your First Name</Form.Label>
                        <Form.Control {...field}

                                      isInvalid={touched[field.name] && errors[field.name]}/>
                        {touched[field.name] && errors[field.name] ?
                          <p style={{ color: "red" }}>{errors[field.name]}</p> : null}
                      </div>;
                    }}
                  />
                </Col>
                <Col>
                  <Field
                    type="text"
                    name="lastName"
                    render={({ field, form: { touched, errors } }) => {

                      return <div>
                        <Form.Label>Your Last Name</Form.Label>
                        <Form.Control {...field}

                                      isInvalid={touched[field.name] && errors[field.name]}/>
                        {touched[field.name] && errors[field.name] ?
                          <p style={{ color: "red" }}>{errors[field.name]}</p> : null}
                      </div>;
                    }}
                  />
                </Col>
              </Row>

              <Field
                type="email"
                name="email"
                render={({ field, form: { touched, errors } }) => {

                  return <Row>
                    <Col>
                      <Form.Label>
                        <span>Your <b>{values.userType === defaults.onboarding.mentee ? "" : "University"}</b> {"Email Address "}</span>
                        {values.userType === defaults.onboarding.mentee ? null :
                          <OverlayTrigger placement="bottom"
                                          overlay={<Tooltip placement="bottoom" className="in">We need
                                            this to verify the university you attend!</Tooltip>}>
                            <Badge pill variant="info">
                              <span><Icon style={{ color: "white" }} name="fas fa-info-circle"/>{" Why?"}</span>
                            </Badge>
                          </OverlayTrigger>
                        }
                      </Form.Label>
                      <Form.Control {...field}

                                    isInvalid={touched[field.name] && errors[field.name]}/>
                      {touched[field.name] && errors[field.name] ?
                        <p style={{ color: "red" }}>{errors[field.name]}</p> : null}
                    </Col>
                  </Row>;
                }}
              />
              <br/>
              <Button block type="submit" variant="success" disabled={isSubmitting || !_.isEmpty(errors)}>
                {isSubmitting ? <Loader type="Oval" color="#ffffff" width="20" height="20"/> :
                  (values.userType === defaults.onboarding.mentee ? "Find your mentor!" : "Help a mentee!")}
              </Button>
            </FormikForm>
          )}
        />
        <Button block style={{ color: "white" }} variant="link" onClick={() => props.history.push("/login")}>Already
          registered? Sign in instead</Button>
      </Col>
    </Row>
  );
};

export default RegisterNewUser;
