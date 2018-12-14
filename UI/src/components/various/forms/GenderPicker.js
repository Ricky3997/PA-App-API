import React from "react";
import SelectWithLabel from "./SelectWithLabel";

const GenderPicker = (props) => {
  const options = ["Female", "Male", "Prefer not to say"];
  return <SelectWithLabel {...props} label="What's your gender?" options={options}
                          placeholder="Select your gender"/>;
};

export default GenderPicker;