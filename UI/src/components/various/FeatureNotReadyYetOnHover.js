import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import NotReadyYet from "./NotReadyYet";

const FeatureNotReadyYetOnHover = ({ children }) => {
  return (
    <OverlayTrigger placement="bottom" trigger="hover"
                    overlay={<Tooltip placement="bottom" className="i n"><NotReadyYet/></Tooltip>}>
            <span className="d-inline-block">
                {children}
            </span>
    </OverlayTrigger>
  );
};

export default FeatureNotReadyYetOnHover;
