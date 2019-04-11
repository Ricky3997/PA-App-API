import React from "react";
import defaults from "./../../../defaults/defaults.json";
import { Form } from "react-bootstrap";
import { Select } from "antd";
import UniWithLogoSpan from "../UniWithLogoSpan";

const { OptGroup, Option } = Select;

const UniversityPicker = ({ field, touched, errors, setFieldValue, multiple, mentee, admin, approval, overrideLabel }) => {
  const label = mentee ? "Applying for" : "Your current university";
  return <div>
    {admin || approval ? "" : <Form.Label>{overrideLabel || label}</Form.Label>}
    <Select showSearch
            mode={multiple ? "multiple" : "default"}
            size={"large"}
            style={{ width: "100%" }}
            value={field.value}
            allowClear
            placeholder={admin ? "University" : (approval ? "Received offers from.." : label)}
            onChange={(o) => setFieldValue(field.name, o)}
            tokenSeparators={[",", ":"]}>

      <OptGroup label="UK">
        {defaults.universities.UK.map(u => <Select.Option key={u.name} value={u.name}><UniWithLogoSpan {...u} /></Select.Option>)}
      </OptGroup>
      <OptGroup label="US">
        {defaults.universities.US.map(u => <Select.Option key={u.name} value={u.name}><UniWithLogoSpan {...u} /></Select.Option>)}
      </OptGroup>
    </Select>
    {touched[field.name] && errors[field.name] ?
      <p style={{ color: "red" }}>{errors[field.name]}</p> : null}
  </div>;
};

export default UniversityPicker;