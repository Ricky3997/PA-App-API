import { Field, Form as FormikForm, Formik } from "formik";
import { Select } from "antd";
import React from "react";
const {OptGroup, Option} = Select;

const MenteeStep3 = (props) => {
  return <Formik
    // validationSchema={} //TODO
    initialValues={{tags: ["React", "woow"]}}
    onSubmit={(values, { setSubmitting }) => {
      props.addOnboardingProperties(values);
      props.changeStage(3);
      setSubmitting(false);

    }}
    render={({ values, touched, errors, isSubmitting, setFieldValue }) => (
      <FormikForm>
        <Field
          type="text"
          name="tags"
          render={({ field, form: { touched, errors } }) => {
            return <Select mode="tags"
                           style={{ width: "100%" }}
                           value={field.value}
                           placeholder="Tags Mode"
                           onChange={(o) => setFieldValue(field.name, o)}
                           tokenSeparators={[",", ":"]}>
              <OptGroup label="Manager">
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
              </OptGroup>
              <OptGroup label="Engineer">
                <Option value="Yiminghe">yiminghe</Option>
              </OptGroup>
            </Select>;
          }}
        />

      </FormikForm>
    )}
  />;
};


export default MenteeStep3;