import React from "react";
import { Badge, Modal } from "react-bootstrap";
import MentorAdminProfile from "../utils/MentorAdminProfile";

const MentorMatchingDetailsModal = (props) => {
  return <span>
    <span onMouseEnter={() => props.toggleMatchingDetailsModal(props.mentor._id)}>
      <Badge variant={'info'}>{' details'}</Badge>
    </span>
    <Modal
      size="lg"
      centered
      onHide={() => props.toggleMatchingDetailsModal(false)}
      show={props.matching.showDetailsModal === props.mentor._id}
    >
      <Modal.Body>
        <MentorAdminProfile {...props} matching />
      </Modal.Body>
    </Modal>
  </span>;
};

export default MentorMatchingDetailsModal;
