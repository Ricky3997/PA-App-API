import React from "react";
import SelectWithLabel from "./SelectWithLabel";
import defaults from "./../../../defaults/defaults.json";

const GenderPicker = (props) => {
  return <SelectWithLabel {...props} label="What's your gender?" options={defaults.gender}
                          placeholder="Select your gender"/>;
};

export default GenderPicker;