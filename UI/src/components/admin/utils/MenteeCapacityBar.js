import { ProgressBar } from "react-bootstrap";
import React from "react";

const MenteeCapacityBar = ({ current, capacity }) => {
  return <ProgressBar style={current === 0 ? { color: "black" } : {}}
                      variant={(current === 0) ? "success" : (capacity - current) === 0 ? "danger" : ((capacity - current) === 1 ? "warning" : null)}
                      now={current - capacity === 0 ? 100 : (100 - (current / capacity * 100))}
                      label={`Mentees: ${current}/${capacity}`}/>;
};

export default MenteeCapacityBar;