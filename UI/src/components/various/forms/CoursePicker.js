import React from "react";
import defaults from "./../../../defaults/defaults.json";
import { Form } from "react-bootstrap";
import { Select } from "antd";

const { OptGroup, Option } = Select;


const CoursePicker = ({ field, touched, errors, setFieldValue, multiple }) => {
  return <div>
    <Form.Label>Course</Form.Label>
    <Select showSearch
            mode={multiple ? "multiple" : "default"}
            size={"large"}
            style={{ width: "100%" }}
            value={field.value}
            placeholder={"Course"}
            onChange={(o) => setFieldValue(field.name, o)}
            tokenSeparators={[",", ":"]}>


      {Object.entries(defaults.uni_subjects).map(e => <OptGroup label={e[0]} key={e[0]}>
        {e[1].map(o => <Option key={o} value={o}>{o}</Option>)}
      </OptGroup>)}

    </Select>
    {touched[field.name] && errors[field.name] ?
      <p style={{ color: "red" }}>{errors[field.name]}</p> : null}
  </div>;
};

export default CoursePicker;