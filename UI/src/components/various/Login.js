import React, { Component } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import Loader from "react-loader-spinner";
import * as queryString from "query-string";
import * as _ from "lodash";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import { Field, Form as FormikForm, Formik } from "formik";
import LoginEmailSent from "./../../assets/emailSent.png";


class Login extends Component {
  componentDidMount() {
    const qs = queryString.parse(this.props.location.search);
    if (qs.token) {
      window.localStorage.setItem("token", qs.token);
      this.props.getUser();
    }
  }

  render() {
    return this.props.user ? <Redirect to="/"/> : (
      <Container className="onboarding">
        <Row className="justify-content-md-center">
          <Col md={6}>
            {this.props.login.emailSent ? <div className="center-block">
              <Image src={LoginEmailSent} height='200px'/>
              <h3>An email is on its way! </h3>
              <p>
                We sent an email to <b>{this.props.login.emailSentTo}</b>
                <br/>
                In there, you'll find a magic link: just click on it and you'll be signed in!
                <br/>
              </p>
              <h3>Go check your email!</h3>
              <p>Didn't get it? <Button style={{ color: "white" }} variant="link"
                                        onClick={() => this.props.unsetLoginEmailSent()}>
                Click here to send a new one
              </Button>
              </p>


            </div> : <div style={{ paddingTop: "130px" }}>
              <h2>Sign In</h2>
              <h6>We'll send you an email with a login code, just click on the link!</h6>
              <Formik
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email("Invalid Email")
                    .required("Email is required.")
                })}
                initialValues={{ email: "" }}
                onSubmit={({ email }, { setSubmitting }) => {

                  this.props.sendLoginEmail(email).then(r => {
                    setSubmitting(false);
                  });
                }}
                render={({ values, touched, errors, isSubmitting }) => (
                  <FormikForm>
                    <Field
                      type="email"
                      name="email"
                      label="Your Email"
                      render={({ field, form: { touched, errors } }) => {

                        return <div>
                          <Form.Control {...field}

                                        isInvalid={touched[field.name] && errors[field.name]}/>
                          {touched[field.name] && errors[field.name] ?
                            <p style={{ color: "red" }}>{errors[field.name]}</p> : null}
                        </div>;
                      }}
                    />
                    <br/>
                    <Button block type="submit" variant="success" disabled={isSubmitting || !_.isEmpty(errors)}>
                      {isSubmitting ? <Loader type="Oval" color="#ffffff" width="20" height="20"/> :
                        <span>Send me a magic link! <Image
                          src={"https://cdn3.iconfinder.com/data/icons/object-emoji/50/MagicWand-512.png"}
                          width="30"/></span>}
                    </Button>
                  </FormikForm>

                )}
              />
            </div>}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
