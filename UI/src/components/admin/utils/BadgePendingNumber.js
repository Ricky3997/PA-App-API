import { Badge, OverlayTrigger, Tooltip } from "react-bootstrap";
import React from "react";
import { Icon } from "react-fa";

const BadgePendingNumber = ({pending}) => {
  return <Badge variant={pending.length === 0 ? 'success' : 'warning'}>{pending.length}</Badge>
};

export default BadgePendingNumber;