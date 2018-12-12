import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/es/Form";
import React, {Component} from "react";
import * as Yup from "yup";
import * as _ from "lodash"
import { ErrorMessage, Field, Form as FormikForm, Formik } from "formik";
import Loader from "react-loader-spinner";
import ProfilePicture from "./ProfilePicture";
import { toast } from "react-toastify";

class MentorSettings extends Component {
  
  FormControlWithValidationWithFormik = (type, children, label) => {
    return ({ field, form: { touched, errors } }) => {
      const error = touched[field.name] && errors[field.name];
      return <div>
        <h5>
          {label}
        </h5>
        <Form.Control {...field}
                      isValid={!error}
                      isInvalid={error}
                      as={type}>
          {children}
        </Form.Control>
        <ErrorMessage name={field.name}/>
      </div>
    }
  };

  render() {
    const {user, settings, togglePicturePicker, storePictureToCrop, removePictureToCrop, storePictureCropped, saveChanges} = this.props;
    console.log(user);
    return <div>
      <Formik
        validationSchema={Yup.object().shape({
          firstName: Yup.string()
            .required("First name is required."),
          email: Yup.string()
            .email("Invalid Email")
            .required("Email is required."),
          university: Yup.string()
            .required("University is required."),
          subject: Yup.string()
            .required("Subject is required."),
          area: Yup.string()
            .required("Area of study is required."),
          level: Yup.string()
            .required("Degree area of study is required."),
          year: Yup.string()
            .required("Year of study is required."),
          firstGenStudent: Yup.string()
            .required("First Generation Student is required."),
          country: Yup.string()
            .required("Country is required."),
          city: Yup.string()
            .required("City is required."),
          gender: Yup.string()
            .required("Gender is required."),

        })}
        initialValues={{email: user.email, firstName: user.firstName, ...user.mentorProfile}}
        onSubmit={(values , { setSubmitting }) => {
          saveChanges(values).then(r => {
            if (r.success) {
              setSubmitting(false);
              toast.success("Settings updated successfully");
              window.localStorage.setItem("user", JSON.stringify(r.payload));
              this.props.updateUser(r.payload);
            } else toast.error("There was a problem saving your settings")
          })
        }
        }
        render={({ values, touched, errors, isSubmitting }) => (
          <FormikForm>
            <Row>
              <Col md={3}>
                <h5>Profile picture </h5>
                <ProfilePicture user={user} settings={settings}
                                togglePicturePicker={togglePicturePicker}
                                storePictureToCrop={storePictureToCrop}
                                removePictureToCrop={removePictureToCrop}
                                storePictureCropped={storePictureCropped}
                />
              </Col>
              <Col md={6}>
                <Field type="text" name="firstName" render={this.FormControlWithValidationWithFormik("input", null, "Your First Name")} />

                <Field type="email" name="email" render={this.FormControlWithValidationWithFormik("input", null, "Your Email" )} />

                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
                <span>{user.emailConfirmed ? "Email Confirmed" : "Email Not Confirmed"}</span>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Field type="text" name="university" render={this.FormControlWithValidationWithFormik("input", null, "University")}/>
              </Col>
              <Col>
                <Field type="text" name="subject" render={this.FormControlWithValidationWithFormik("input", null, "Subject")}
                />
              </Col>
              <Col>
                <Field name="area" render={this.FormControlWithValidationWithFormik("select", [
                    <option >Natural Sciences</option>,
                    <option>Humanities</option>,
                    <option>Social Sciences</option>,
                    <option>Engineering</option>,
                    <option>Business and Economics</option>], "Area of study")}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Field type="text" name="level" render={this.FormControlWithValidationWithFormik("input", null, "Degree Type")}
                />
              </Col>
              <Col>
                <Field name="area" render={this.FormControlWithValidationWithFormik("select", [
                    <option>1</option>,
                    <option>2</option>,
                    <option>3</option>,
                    <option>4</option>,
                    <option>5</option>,
                    <option>6+</option>], "Area of study")}
                />
              </Col>
              <Col>
                <Field name="firstGenStudent" render={this.FormControlWithValidationWithFormik("select", [
                    <option>Yes</option>,
                    <option>No</option>
                  ], "First Generation Student")}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Field type="text" name="country" render={this.FormControlWithValidationWithFormik("input", null, "Country")}
                />
              </Col>
              <Col>
                <Field type="text" name="city" render={this.FormControlWithValidationWithFormik("input", null, "City")}
                />
              </Col>
              <Col>
                <Field name="gender" render={this.FormControlWithValidationWithFormik("select", [
                    <option>Male</option>,
                    <option>Female</option>,
                    <option>Prefer not to say</option>], "Gender")}
                />
              </Col>
            </Row>
            <br/>
            <Row>
              <Col md={{ size: 2, offset: 8 }}>
                <Button variant="secondary" block onClick={() => this.props.history.push("/")}>
                  Cancel
                </Button>
              </Col>
              <Col md={{ size: 2 }}>
                <Button variant="success" block type="submit" disabled={isSubmitting || !_.isEmpty(errors)}>
                  {isSubmitting ? <Loader type="Oval" color="#ffffff" width="20" height="20"/> : <span>Save</span>}
                </Button>
              </Col>
            </Row>
          </FormikForm>
        )}
      />
    </div>
  }
};

export default MentorSettings;