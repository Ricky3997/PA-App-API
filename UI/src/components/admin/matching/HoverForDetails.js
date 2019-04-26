import React, { Component } from 'react';
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import MentorAdminProfile from '../utils/MentorAdminProfile';
import MenteeAdminProfile from '../utils/MenteeAdminProfile';
import CountryFlag from '../../various/CountryFlag';
import { Link } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import { toggleMatchingDetailsModal } from '../../../actions/actionCreator';

class HoverForDetails extends Component {
  render() {
    return <span>
    <span onMouseEnter={() => {
      this.timer = window.setTimeout(() => this.props.toggleMatchingDetailsModal(this.props[this.props.mentorMode ? "mentor" : "mentee"]._id),
        1700);

    }} onMouseLeave={() => {
      if (this.timer) window.clearTimeout(this.timer);
    }}
    >
      <CountryFlag country={this.props[this.props.mentorMode ? "mentor" : "mentee"].country}/>
          <span>{" "}</span>
          <OverlayTrigger placement="top" trigger="hover"
                          overlay={<Tooltip placement="top" className="in">Click to go to profile, wait for
                            preview</Tooltip>}>
            <Link onClick={() => {
              if (this.timer) window.clearTimeout(this.timer);
            }}
              to={`/admin/${this.props.mentorMode ? "mentors" : "mentees"}/${this.props[this.props.mentorMode ? "mentor" : "mentee"]._id}${this.props.matchingMode ? "?from=matching" : ""}`}
              style={{
                textDecoration: "underline", color: "blue",
                cursor: "pointer"
              }}>
              {`${this.props[this.props.mentorMode ? "mentor" : "mentee"].firstName} ${this.props[this.props.mentorMode ? "mentor" : "mentee"].lastName}`}
            </Link>
          </OverlayTrigger>
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

export default connect(({matching}) => {
  return {
    matching
  }
}, dispatch => {
  return {
    toggleMatchingDetailsModal: (id) => dispatch(toggleMatchingDetailsModal(id))
  };
})(HoverForDetails);
