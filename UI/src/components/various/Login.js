import React, { Component } from "react";
import { Button, Col, Container, Row, Image, Form } from "react-bootstrap";
import Loader from "react-loader-spinner";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as api from "../../api";
import * as queryString from "query-string";
import * as _ from "lodash";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";
import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";

class Login extends Component {
  componentDidMount() {
    const qs = queryString.parse(window.location.search);
    if (qs.token) {
      window.localStorage.setItem("token", qs.token);
      this.props.login()
    }
  }

  render() {
    return this.props.user ? <Redirect to="/"/> : (
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
                onSubmit={({email}, {setSubmitting}) => {
                  api.get(`/auth/login?email=${email}`).then(r => {
                    if(r.success) toast.success(`An email with the sign-in link has been sent to ${email}`);
                    else toast.error("There was an error requesting your magic link, sorry");
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
                          <ErrorMessage name={field.name}/>
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
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </Container>
    );
  }
}

export default Login;
