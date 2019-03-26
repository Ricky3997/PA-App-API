import React from "react";
import SelectWithLabel from "./SelectWithLabel";
import {yearGraduate} from '../../../defaults/defaults'

const YearPicker = (props) => {
  const options = props.mentee ? yearGraduate : ["1", "2", "3", "4", "5+"];
  return <SelectWithLabel {...props} label={props.mentee ? "School graduation year" : "Year"} options={options} placeholder="Select your degree year"/>;
};

export default YearPicker;