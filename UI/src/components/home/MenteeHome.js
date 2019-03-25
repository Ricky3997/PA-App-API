import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Icon } from "react-fa";
import { toast } from "react-toastify";
import * as _ from "lodash";
import MenteeInRelationshipHome from "./Mentee/MenteeInRelationshipHome";
import GettingStartedSteps from "./GettingStartedSteps";
import { connect } from "react-redux";
import {
  setGettingStartedStepsProgress,
  toggleApprovalModal, setMenteeApprovalProperties, changeMenteeStatus
} from "../../actions/actionCreator";

const MenteeHome = (props) => {

  const GettingStartedStepsConnected = connect(({ user, gettingStartedSteps, menteeHome }) => {
    return { user, gettingStartedSteps, menteeHome,  mode: 'mentee' };
  }, dispatch => {
    return {
      setGettingStartedStepsProgress: (progress) => dispatch(setGettingStartedStepsProgress(progress)),
      toggleApprovalModal: () => dispatch(toggleApprovalModal()),
      setMenteeApprovalProperties: (properties) => dispatch(setMenteeApprovalProperties(properties)),
      changeMenteeStatus: (status) => dispatch(changeMenteeStatus(status)),
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

    {_.get(props.user, "menteeProfile.relationship") ?
      <MenteeInRelationshipHome {...props} /> :
      <GettingStartedStepsConnected />}
  </Container>;
};

export default MenteeHome;
