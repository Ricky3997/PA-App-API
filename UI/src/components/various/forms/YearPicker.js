import React from "react";
import SelectWithLabel from "./SelectWithLabel";

const YearPicker = (props) => {
  const options = props.mentee ? ["Penultimate Year", "Final Year", "Gap Year"] : ["1", "2", "3", "4", "5+"];
  return <SelectWithLabel {...props} label="Year" options={options} placeholder="Select your degree year"/>;
};

export default YearPicker;