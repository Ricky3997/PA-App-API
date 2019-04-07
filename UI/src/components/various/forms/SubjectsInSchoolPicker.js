import React from "react";
import { Form } from "react-bootstrap";
import { Select } from "antd";
import defaults from "../../../defaults/defaults.json";

const { OptGroup, Option } = Select;

const SubjectsInSchoolPicker = ({ field, touched, errors, setFieldValue, approval }) => {
  return <div>
    {approval ? null : <Form.Label>Subjects you study in school</Form.Label>}
    <Select mode="tags" showSearch
            size={"large"}
            style={{ width: "100%" }}
            value={field.value}
            placeholder="Subjects"
            onChange={(o) => setFieldValue(field.name, o)}
            tokenSeparators={[",", ":"]}>

      {Object.entries(defaults.school_subjects).map(e => <OptGroup label={e[0]} key={e[0]}>
        {e[1].map(o => <Option key={o} value={o}>{o}</Option>)}
      </OptGroup>)}

    </Select>
    {touched[field.name] && errors[field.name] ?
      <p style={{ color: "red" }}>{errors[field.name]}</p> : null}
  </div>;
};

export default SubjectsInSchoolPicker;