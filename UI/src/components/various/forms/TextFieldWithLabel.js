import React from "react";
import { Form } from "react-bootstrap";

const TextFieldWithLabel = ({ field, touched, errors, label }) => {
  return <div>
    <Form.Label>{label}</Form.Label>
    <Form.Control {...field}
                  isInvalid={touched[field.name] && errors[field.name]}/>
    {touched[field.name] && errors[field.name] ?
      <p style={{ color: "red" }}>{errors[field.name]}</p> : null}
  </div>;
};

export default TextFieldWithLabel;