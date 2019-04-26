import React from 'react';
import { Form } from 'react-bootstrap';
import { Select } from 'antd';

const { OptGroup, Option } = Select;

const UnisApplyingFor = ({ field, touched, errors, setFieldValue }) => {
  return <div>
    <Form.Label>Universities you may apply for</Form.Label>
    <Select mode="multiple" showSearch
            size={"large"}
            style={{ width: "100%" }}
            value={field.value}
            placeholder="Select Universities you may apply for"
            onChange={(o) => setFieldValue(field.name, o)}
            tokenSeparators={[",", ":"]}>

      <OptGroup label="UK">
        <Option value="Oxford">Oxford</Option>
        <Option value="Cambridge">Cambridge</Option>
        <Option value="LSE">LSE</Option>
        <Option value="King's College">King's College</Option>
        <Option value="UCL">UCL</Option>
        <Option value="Durham">Durham</Option>
        <Option value="Warwick">Warwick</Option>
        <Option value="Bath">Bath</Option>
      </OptGroup>

      <OptGroup label="US">
        <Option value="Harvard">Harvard</Option>
        <Option value="Cornell">Cornell</Option>
        <Option value="Yale">Yale</Option>
        <Option value="Carnagie">Carnagie</Option>
        <Option value="UPenn">UPenn</Option>
        <Option value="Stanford">Stanford</Option>
        <Option value="Princeton">Princeton</Option>
        <Option value="Brown">Brown</Option>
        <Option value="Columbia">Columbia</Option>
        <Option value="Dartmouth">Dartmouth</Option>
      </OptGroup>

    </Select>
    {touched[field.name] && errors[field.name] ?
      <p style={{ color: "red" }}>{errors[field.name]}</p> : null}
  </div>;
};

export default UnisApplyingFor;