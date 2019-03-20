import React from "react";
import { Form } from "react-bootstrap";
import { Select } from "antd";
import defaults from "../../../defaults/defaults";

const { Option } = Select;

const AreaOfDegreePicker = ({ field, touched, errors, setFieldValue, multiple }) => {
  return <div>
    <Form.Label>Field of study</Form.Label>
    <Select mode={multiple ? "multiple" : "default"}
            showSearch
            size={"large"}
            style={{ width: "100%" }}
            value={field.value}
            placeholder="Subjects"
            onChange={(o) => setFieldValue(field.name, o)}
            tokenSeparators={[",", ":"]}>

      {Object.entries(defaults.uni_subjects).map(e => <Option key={e[0]} value={e[0]}>{e[0]}</Option>)}

    </Select>
    {touched[field.name] && errors[field.name] ?
      <p style={{ color: "red" }}>{errors[field.name]}</p> : null}
  </div>;
};

export default AreaOfDegreePicker;