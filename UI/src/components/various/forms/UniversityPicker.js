import React from "react";
import defaults from "./../../../defaults/defaults.json";
import { Form, Image } from "react-bootstrap";
import { Select } from "antd";

const { OptGroup, Option } = Select;

const uniToOption = (u) => {
  return <Option value={u.name} key={u.name}>
          <span>
            <Image src={u.logo}
                   style={{ maxHeight: "30px", maxWidth: "140px" }}
            />
          </span>
  </Option>
}

const UniversityPicker = ({ field, touched, errors, setFieldValue, mentee }) => {
  const label = mentee ? "Applying for" : "Your current university";
  return <div>
    <Form.Label>{label}</Form.Label>
    <Select showSearch
            mode={mentee ? "multiple" : "default"}
            size={"large"}
            style={{ width: "100%" }}
            value={field.value}
            placeholder={label}
            onChange={(o) => setFieldValue(field.name, o)}
            tokenSeparators={[",", ":"]}>

      <OptGroup label="UK">
        {defaults.universities.UK.map(uniToOption)}
      </OptGroup>

      <OptGroup label="US">
        {defaults.universities.US.map(uniToOption)}
      </OptGroup>


    </Select>
    {touched[field.name] && errors[field.name] ?
      <p style={{ color: "red" }}>{errors[field.name]}</p> : null}
  </div>;
};

export default UniversityPicker;