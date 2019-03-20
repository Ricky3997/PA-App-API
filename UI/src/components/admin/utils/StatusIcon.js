import { OverlayTrigger, Tooltip } from "react-bootstrap";
import React from "react";
import { Icon } from "react-fa";

const StatusIcon = (props) => {
  if (props.status === "notYetRequested") return <OverlayTrigger placement="bottom"
                                                                 overlay={<Tooltip placement="bottoom" className="in">Not
                                                                   Yet Requested</Tooltip>}>
    <Icon name={`fas fa-newspaper-o`} style={{ color: "#03619b" }}/>
  </OverlayTrigger>;
  else if (props.status === "approved") return <OverlayTrigger placement="bottom" overlay={<Tooltip placement="bottoom"
                                                                                                    className="in">Approved</Tooltip>}>
    <Icon name={`fas fa-check-circle`} style={{ color: "#289b00" }}/>
  </OverlayTrigger>;
  else if (props.status === "requested") return <OverlayTrigger placement="bottom"
                                                                overlay={<Tooltip placement="bottoom" className="in">Pending
                                                                  Approval</Tooltip>}>
    <Icon name={`fas fa-hourglass`} style={{ color: "#c69200" }}/>
  </OverlayTrigger>;
  else if (props.status === "rejected") return <OverlayTrigger placement="bottom" overlay={<Tooltip placement="bottoom"
                                                                                                    className="in">Rejected {props.reason ? ` because: ${props.reason}` : ""}</Tooltip>}>
    <Icon name={`fas fa-ban`} style={{ color: "#9b0014" }}/>
  </OverlayTrigger>;
  else return null;
};

export default StatusIcon;