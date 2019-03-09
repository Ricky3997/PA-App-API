import React from "react";
import { Form } from "react-bootstrap";
import { Select } from "antd";
const {OptGroup, Option} = Select;

const SubjectsInSchoolPicker = ({field, touched, errors, setFieldValue}) => {
  return <div>
    <Form.Label>Subjects you study in school</Form.Label>
    <Select mode="multiple" showSearch
            size={"large"}
            style={{ width: "100%" }}
            value={field.value}
            placeholder="Subjects"
            onChange={(o) => setFieldValue(field.name, o)}
            tokenSeparators={[",", ":"]}>

      <OptGroup label="Natual Sciences">
        <Option value="Biology">Biology</Option>
        <Option value="Chemistry">Chemistry</Option>
        <Option value="Physics">Physics</Option>
        <Option value="Mathematics">Mathematics</Option>
        <Option value="Computer Science">Computer Science</Option>
      </OptGroup>

      <OptGroup label="Languages">
        <Option value="Spanish">Spanish</Option>
        <Option value="Dutch">Dutch</Option>
        <Option value="Danish">Danish</Option>
        <Option value="Finnish">Finnish</Option>
        <Option value="Swedish">Swedish</Option>
        <Option value="Chinese">Chinese</Option>
        <Option value="Japanese">Japanese</Option>
        <Option value="English">English</Option>
        <Option value="Italian">Italian</Option>
        <Option value="German">German</Option>
        <Option value="Portuguese">Portuguese</Option>
        <Option value="Other language">Other language</Option>
      </OptGroup>

      <OptGroup label="Social Sciences">
        <Option value="History">History</Option>
        <Option value="Psychology">Psychology</Option>
        <Option value="Philosophy">Philosophy</Option>
        <Option value="Economics">Economics</Option>
        <Option value="Business">Business</Option>
      </OptGroup>


      <OptGroup label="Other">
        <Option value="Religion">Religion</Option>
        <Option value="Physical Education">Physical Education</Option>
        <Option value="Theatre">Theatre</Option>
        <Option value="Music">Music</Option>
        <Option value="Dance">Dance</Option>
      </OptGroup>

    </Select>
    {touched[field.name] && errors[field.name] ?
      <p style={{ color: "red" }}>{errors[field.name]}</p> : null}
  </div>;
};

export default SubjectsInSchoolPicker;