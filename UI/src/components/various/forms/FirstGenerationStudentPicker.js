import React from "react";
import SelectWithLabel from "./SelectWithLabel";
import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Icon } from "react-fa";

const FirstGenerationStudentPicker = (props) => {
  const options = ["Yes", "No"];
  const label = <span>{"Are you a First Gen Student? "}

    <OverlayTrigger placement="bottom"
                    overlay={<Tooltip placement="bottoom" className="in">
                      {props.user.type === "mentee" ?
                        "Knowing whether your parents went to University will help us find a current university student coming from your same background who will be able to relate to you better!!" :
                        "Knowing whether your parents went to University will help us find a younger student needing your help who, coming from your same background, will be able to relate to you better!!"}
                    </Tooltip>}>
                                    <Badge pill variant="info">
                                        <Icon style={{ color: "white" }} name="fas fa-info-circle"/> Why?
                                    </Badge>
                                </OverlayTrigger>
                    </span>;
  return <SelectWithLabel {...props} label={label} options={options}
                          placeholder="Select if you're a First Generation Student"/>;
};

export default FirstGenerationStudentPicker;