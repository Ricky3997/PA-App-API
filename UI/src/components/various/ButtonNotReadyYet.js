import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import NotReadyYet from "./NotReadyYet";

const ButtonNotReadyYet = ({ children }) => {
  return (
    <OverlayTrigger placement="bottom" trigger="hover"
                    overlay={<Tooltip placement="bottom" className="in"><NotReadyYet/></Tooltip>}>
            <span className="d-inline-block">
              <LinkContainer to="/message">
                {children}
        </LinkContainer>
            </span>
    </OverlayTrigger>
  );
};

export default ButtonNotReadyYet;
