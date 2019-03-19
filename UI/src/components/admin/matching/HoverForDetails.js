import React from "react";
import { Badge, Button, Modal } from "react-bootstrap";
import MentorAdminProfile from "../utils/MentorAdminProfile";
import { Icon } from "react-fa";
import MenteeAdminProfile from "../utils/MenteeAdminProfile";

const HoverForDetails = (props) => {
  return <span>
    <span onMouseEnter={() => props.toggleMatchingDetailsModal(props[props.mentorMode ? "mentor" : "mentee"]._id)}>
      <Button variant={"info"} block style={{ marginBottom: "5px" }}><Icon
        name='fas fa-hand-pointer-o'/>{" Hover for details"}</Button>
    </span>
    <Modal
      size="lg"
      centered
      onHide={() => props.toggleMatchingDetailsModal(false)}
      show={props.matching.showDetailsModal === props[props.mentorMode ? "mentor" : "mentee"]._id}
    >
      <Modal.Body>
        {props.mentorMode ? <MentorAdminProfile {...props} matching/> :
          <MenteeAdminProfile {...props} matching/>}
      </Modal.Body>
    </Modal>
  </span>;
};

export default HoverForDetails;
