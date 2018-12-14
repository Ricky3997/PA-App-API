import React from "react";
import SelectWithLabel from "./SelectWithLabel";

const YearPicker = (props) => {
  const options = ["1", "2", "3", "4", "5+"];
  return <SelectWithLabel {...props} label="Year of degree" options={options} placeholder="Select your degree year" />;
};

export default YearPicker;