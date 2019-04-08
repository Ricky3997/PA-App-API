import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import MentorAdminProfile from "../utils/MentorAdminProfile";
import { Icon } from "react-fa";
import MenteeAdminProfile from "../utils/MenteeAdminProfile";

class HoverForDetails extends Component {
  render() {
    return <span>
    <span onMouseEnter={() => {
      this.timer = window.setTimeout(() => this.props.toggleMatchingDetailsModal(this.props[this.props.mentorMode ? "mentor" : "mentee"]._id),
        1000);

    }} onMouseLeave={() => {
      if (this.timer) window.clearTimeout(this.timer);
      // if(!this.props.matching.showDetailsModal) this.props.toggleMatchingDetailsModal(false)
    }}
    >
      <Button variant={"info"} block style={{ marginBottom: "5px" }}><Icon
        name='fas fa-hand-pointer-o'/>{" Hover for preview"}</Button>
    </span>
    <Modal
      size="lg"
      centered
      onHide={() => this.props.toggleMatchingDetailsModal(false)}
      show={this.props.matching.showDetailsModal === this.props[this.props.mentorMode ? "mentor" : "mentee"]._id}
    >
      <Modal.Body>
        {this.props.mentorMode ? <MentorAdminProfile {...this.props} matching/> :
          <MenteeAdminProfile {...this.props} matching/>}
      </Modal.Body>
    </Modal>
  </span>;
  }

}

export default HoverForDetails;
