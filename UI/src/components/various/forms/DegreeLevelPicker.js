import React from "react";
import SelectWithLabel from "./SelectWithLabel";

const DegreeLevelPicker = (props) => {
  const options = ["Undergraduate", "Masters", "Postgraduate"];
  return <SelectWithLabel {...props} label="Degree level" options={options} placeholder="Select your degree level" />;
};

export default DegreeLevelPicker;