import React, { Component } from "react";
import { Button, Col, Container, Row, Alert, Image, Form } from "react-bootstrap";
import Loader from "react-loader-spinner";
import * as EmailValidator from "email-validator";
import * as api from "../../api";
import * as queryString from "query-string";
import * as _ from "lodash";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.login = this.login.bind(this);
  };

  componentDidMount() {
    this.checkIfToken();
  }

  checkIfToken() {
    const qs = queryString.parse(window.location.search);
    if (qs.token) {
      window.localStorage.setItem("token", qs.token);
      this.login();
    }
  }

  login() {
    api.get("/api/users/profile").then(r => {
      if (r.success) this.props.setUser(r.payload);
      else {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
      }
    });

  }

  requestLoginToken(event) {
    const { email } = this.state;
    if (!EmailValidator.validate(email)) {
      this.setState({ alert: <Alert variant="danger">Invalid email address</Alert> });
      return;
    }
    this.setState({ loading: true }, () => api.get(`/auth/login?email=${email}`)
      .then(r => {
        let alert;
        if (r.success) {
          alert = <Alert variant="success">An email with the sign-in link has been sent to {email}</Alert>;
          window.localStorage.setItem("email", email);
        } else alert = <Alert variant="danger">There was a problem logging you in, sorry</Alert>;
        this.setState({ loading: false, alert: alert });
      }));
  }

  //TODO Consider Formik to improve

  render() {
    return this.props.user ? <Redirect to={_.get(this.props, "location.state.from") || "/"}/> : (
      <Container fluid>
        <Container className="onboarding">
          <Row className="justify-content-md-center">
            <Col md={6} style={{ paddingTop: "130px" }}>
              <h2>Sign In</h2>
              <h6>We'll send you an email with a login code, just click on the link!</h6>
              <Formik
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email("Invalid Email")
                    .required("Email is required.")
                })}
                initialValues={{ email: "" }}
                onSubmit={(values, actions) => {
                  //this.requestLoginToken();
                  console.log(values)
                  alert(values)
                }}
                render={({ values, touched, errors, isSubmitting}) => (
                  <FormikForm>
                    <Field
                      type="email"
                      name="email"
                      label="Your Email"
                      render={({ field, form: { touched, errors } }) => {
                        const error = touched[field.name] && errors[field.name];
                        console.log(errors[field.name])
                        return <div>
                          <Form.Control {...field}
                                       isValid={!error}
                                       isInvalid={error} />
                          <ErrorMessage name={field.name}/>
                        </div>
                      }}
                    />

                    <br />

                    <Button block type="submit" variant="success" disabled={isSubmitting || !_.isEmpty(errors)}>
                      {isSubmitting ? <Loader type="Oval" color="#ffffff" width="20" height="20"/> :
                        <span>Send me a magic link! <Image
                          src={"https://cdn3.iconfinder.com/data/icons/object-emoji/50/MagicWand-512.png"}
                          width="30"/></span>}
                    </Button>
                  </FormikForm>

                )}
              />
            </Col>
          </Row>
        </Container>

      </Container>
    );
  }
}

export default Login;
