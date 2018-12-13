import React from "react";
import { Badge, Button, Col, Form, Image, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import PALogo from "../../assets/pa_key.png";
import * as Yup from "yup";
import { ErrorMessage, Field, Form as FormikForm, Formik } from "formik";
import * as _ from "lodash";
import Loader from "react-loader-spinner";
import * as api from "../../api";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const RegisterNewUser = (props) => {
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
            userType: Yup.string()
          })}
          initialValues={{ email: "", firstName: "", userType: "High School Student" }}
          onSubmit={({ email, userType, firstName}, { setSubmitting }) => {

            api.post("/auth/register", {
              email: email,
              firstName: firstName,
              type: userType === "High School Student" ? "mentee" : "mentor"
            }).then(r => {
              if(r.success) {
                window.localStorage.setItem("token", r.payload.token);
                props.updateUser(r.payload.user);
                props.changeStage(1);
              }
              else toast.error("There was an error requesting your magic link, sorry");
              setSubmitting(false);
            });
          }}
          render={({ values, touched, errors, isSubmitting }) => (
            <FormikForm>

              <Field
                type="select"
                name="userType"
                render={({ field, form: { touched, errors } }) => {

                  return <div>
                    <Form.Label>Your are a</Form.Label>
                    <Form.Control {...field}

                                  isInvalid={touched[field.name] && errors[field.name]}
                                  as="select"
                    >
                      <option>High School Student</option>
                      <option>University Student</option>
                    </Form.Control>
                    <ErrorMessage name={field.name}/>
                  </div>;
                }}
              />

              <Field
                type="text"
                name="firstName"
                render={({ field, form: { touched, errors } }) => {

                  return <div>
                    <Form.Label>Your First Name</Form.Label>
                    <Form.Control {...field}

                                  isInvalid={touched[field.name] && errors[field.name]}/>
                    <ErrorMessage name={field.name}/>
                  </div>;
                }}
              />

              <Field
                type="email"
                name="email"
                render={({ field, form: { touched, errors } }) => {

                  return <div>
                    <Form.Label>
                      <span>Your <b>{values.userType === "High School Student" ? "" : "University"}</b> Email Address</span>
                      {values.userType === "High School Student" ? null :
                        <OverlayTrigger placement="bottom"
                                        overlay={<Tooltip placement="bottoom" className="in">We need
                                          this to verify the university you attend!</Tooltip>}>
                          <Badge pill variant="info">
                            Why?
                          </Badge>
                        </OverlayTrigger>
                      }
                    </Form.Label>
                    <Form.Control {...field}

                                  isInvalid={touched[field.name] && errors[field.name]}/>
                    <ErrorMessage name={field.name}/>
                  </div>;
                }}
              />
              <Button block type="submit" variant="success" disabled={isSubmitting || !_.isEmpty(errors)}>
                {isSubmitting ? <Loader type="Oval" color="#ffffff" width="20" height="20"/> :
                  (props.type === "High School Student" ? "Find your mentor!" : "Help a mentee!")}
              </Button>
            </FormikForm>
          )}
        />
      </Col>
      <ToastContainer/>
    </Row>
  );
};

export default RegisterNewUser;
