import React from "react";
import SelectWithLabel from "./SelectWithLabel";

const AreaOfDegreePicker = (props) => {
  const options = [ "Natural Sciences", "Humanities", "Social Sciences", "Engineering", "Business and Economics"];
  return <SelectWithLabel {...props} label="Area of your degree" options={options} placeholder="Select your area" />;
};

export default AreaOfDegreePicker;