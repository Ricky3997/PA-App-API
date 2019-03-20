import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const ButtonNotReadyYet = ({children}) => {
    return (
      <OverlayTrigger placement="bottom" trigger="hover"
                      overlay={<Tooltip placement="bottom" className="in">Feature not ready yet</Tooltip>}>
            <span className="d-inline-block">
              <LinkContainer to="/message">
                {children}
        </LinkContainer>
            </span>
      </OverlayTrigger>
    );
};

export default ButtonNotReadyYet;
