import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { Field, Form as FormikForm, Formik } from "formik";
import * as _ from "lodash";
import CountryPicker from "../various/forms/CountryPicker";
import TextFieldWithLabel from "../various/forms/TextFieldWithLabel";
import FirstGenerationStudentPicker from "../various/forms/FirstGenerationStudentPicker";
import GenderPicker from "../various/forms/GenderPicker";
import { Icon } from "react-fa";


const AnagraphicInfoStep = (props) => {
  const {user} = props;
  return <Formik
    validationSchema={Yup.object().shape({
      country: Yup.string()
        .required("Country is required."),
      city: Yup.string()
        .min(3)
        .required("City is required."),
      gender: Yup.string()
        .required("Gender is required."),
      firstGenStudent: Yup.string()
        .required("First Generation is required.")
    })}
    initialValues={{ ...props.onboarding }}
    onSubmit={(values, { setSubmitting }) => {
      props.addOnboardingProperties(values);
      props.changeStage(3);
      setSubmitting(false);

    }}
    render={({ values, touched, errors, isSubmitting, setFieldValue }) => (
      <FormikForm>
        <Row style={{ paddingTop: "80px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <p>
              Awesome {user.firstName}!! Now we'll ask you a couple of details so it's easier to find
              the perfect match with
              a {user.type === "mentee" ? "current university student who can help you!" : "younger student needing your help!"}
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 3, offset: 3 }}>
            <Field name="country" render={({ field, form: { touched, errors } }) =>
              <CountryPicker setFieldValue={setFieldValue} field={field} touched={touched} errors={errors}/>
            }
            />

          </Col>
          <Col md={{ span: 3 }}>
            <Field name="city" render={({ field, form: { touched, errors } }) =>
              <TextFieldWithLabel label="What city are you from?" field={field} touched={touched} errors={errors} />}
            />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 3, offset: 3 }}>
            <Field name="gender" render={({ field, form: { touched, errors } }) =>
              <GenderPicker setFieldValue={setFieldValue} field={field} touched={touched} errors={errors} />}
            />
          </Col>
          <Col md={{ span: 3 }}>
            <Field name="firstGenStudent" render={({ field, form: { touched, errors } }) =>
              <FirstGenerationStudentPicker user={user} setFieldValue={setFieldValue} field={field} touched={touched} errors={errors} />}
            />
          </Col>
        </Row>

        <br />
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Button block type="submit" variant="success" disabled={isSubmitting || !_.isEmpty(errors)}>
              <span>{"Next "} <Icon name="fas fa-arrow-right" /> </span>
            </Button>
          </Col>
        </Row>
      </FormikForm>
    )}
  />;
};


export default AnagraphicInfoStep;
