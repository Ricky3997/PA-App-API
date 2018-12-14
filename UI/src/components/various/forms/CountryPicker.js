import { Select } from "antd";
import React from "react";
import { Form } from "react-bootstrap";
import countries from "svg-country-flags/countries";

const { Option } = Select;
const countryFlags = {};
Object.keys(countries).forEach(key => countryFlags[key] = require(`svg-country-flags/svg/${key.toLowerCase()}.svg`));

const CountryPicker = ({field, touched, errors, setFieldValue}) => {
  return <div>
    <Form.Label>Your country of origin</Form.Label>
    <Select showSearch allowClear size={"large"}
            style={{ width: "100%" }}
            value={field.value}
            placeholder="Select your country"
            onChange={(o) => setFieldValue(field.name, o)}
            tokenSeparators={[",", ":"]}>
      {Object.keys(countries).map((key) => {
        return <Option key={key} value={countries[key]}>
          <img alt={countries[key]} width="15px" src={countryFlags[key]}/> {` ${countries[key]}`}
        </Option>;
      })}
    </Select>
    {touched[field.name] && errors[field.name] ? <p style={{ color: "red" }}>{errors[field.name]}</p> : null}
  </div>;
};

export default CountryPicker;