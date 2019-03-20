import { Badge } from "react-bootstrap";
import React from "react";

const BadgePendingNumber = ({ pending }) => {
  return <Badge variant={pending.length === 0 ? "success" : "warning"}>{pending.length}</Badge>;
};

export default BadgePendingNumber;