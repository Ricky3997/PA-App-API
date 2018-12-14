import React from "react";
import SelectWithLabel from "./SelectWithLabel";

const AreaOfDegreePicker = (props) => {
  const options = [ "Arts", "Humanities", "Social Sciences", "Natural Sciences", "Medicine", "Technology", "Engineering", "Business", "Law"];
  return <SelectWithLabel {...props} label="Area of degree" options={options} placeholder="Select area of degree" />;
};

export default AreaOfDegreePicker;