import React from "react";
import SelectWithLabel from "./SelectWithLabel";

const DegreeLevelPicker = (props) => {
  const options = ["Undergraduate", "Masters", "Postgraduate"];
  const label = props.mentee ? "Applying for" : "Your degree level";
  return <SelectWithLabel {...props} label={label} options={options} placeholder="Select your degree level"/>;
};

export default DegreeLevelPicker;