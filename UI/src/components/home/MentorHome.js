import React, { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Icon } from "react-fa";
import { toast } from "react-toastify";
import * as _ from "lodash";
import GettingStartedSteps from "./GettingStartedSteps";
import MentoringHome from "./Mentor/MentoringHome";
import { connect } from "react-redux";
import {
  changeMenteeStatus,
  setGettingStartedStepsProgress,
  setMenteeApprovalProperties, setMentorApprovalProperties,
  toggleApprovalModal
} from "../../actions/actionCreator";

const MentorHome = (props) => {

  const GettingStartedStepsConnected = connect(({ user, gettingStartedSteps, mentorHome }) => {
    return { user, gettingStartedSteps, mentorHome,  mode: 'mentor' };
  }, dispatch => {
    return {
      setGettingStartedStepsProgress: (progress) => dispatch(setGettingStartedStepsProgress(progress)),
      toggleApprovalModal: () => dispatch(toggleApprovalModal()),
      setMentorApprovalProperties: (properties) => dispatch(setMentorApprovalProperties(properties))
    };
  })(GettingStartedSteps);

    return <Container fluid>
      <Row style={{ marginTop: "10px" }}>
        <Col md={{ span: 11 }}>
          <h3>Welcome {props.user.emailConfirmed ? "back, " : ""} {props.user.firstName}! 🤗</h3>
        </Col>
        <Col md={{ span: 1 }}>
          <Button onClick={() => props.refreshUser().then(r => {
            if (r.success) toast.success("Refreshed");
            else toast.error("Error refreshing");
          })}>
            <Icon name={"fas fa-refresh"}/>
          </Button>
        </Col>
      </Row>

      {_.get(props.user, "mentorProfile.relationship.length") > 0
      && _.get(props.user, "mentorProfile.relationship")[0].status === "confirmed" ?
        <MentoringHome {...props} /> :
        <GettingStartedStepsConnected />}
    </Container>;
};

export default MentorHome;
