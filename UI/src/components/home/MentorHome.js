import React  from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Icon } from "react-fa";
import { toast } from "react-toastify";
import * as _ from "lodash";
import GettingStartedSteps from "./GettingStartedSteps";
import MentoringHome from "./Mentor/MentoringHome";
import { connect } from "react-redux";
import {
  changeMentorStatus,
  setGettingStartedStepsProgress,
  setMentorApprovalProperties,
  toggleApprovalModal
} from "../../actions/actionCreator";

const MentorHome = ({user, refreshUser}) => {
  const GettingStartedStepsConnected = connect(({ user, gettingStartedSteps, mentorHome }) => {
    return { user, gettingStartedSteps, mentorHome,  mode: 'mentor' };
  }, dispatch => {
    return {
      setGettingStartedStepsProgress: (progress) => dispatch(setGettingStartedStepsProgress(progress)),
      toggleApprovalModal: () => dispatch(toggleApprovalModal()),
      setMentorApprovalProperties: (properties) => dispatch(setMentorApprovalProperties(properties)),
      changeMentorStatus: (status, properties) => dispatch(changeMentorStatus(status, properties)),
    };
  })(GettingStartedSteps);

    return <Container fluid>
      <Row style={{ marginTop: "10px" }}>
        <Col md={{ span: 9 }}>
          <h3>Welcome {user.emailConfirmed ? "back, " : ""} {user.firstName}! 🤗</h3>
        </Col>
        <Col md={{ span: 1 }}>
          <Button onClick={() => refreshUser().then(r => {
            if (r.success) toast.success("Refreshed");
            else toast.error("Error refreshing");
          })}>
            <Icon name={"fas fa-refresh"}/>
          </Button>
        </Col>
        <Col md={2}>
          <Button variant={'danger'} onClick={() => window.open('mailto:help@projectaccess.org', '_blank')}>
            <Icon name="fas fa-ticket"/> Issues? Tell us!
          </Button>
        </Col>
      </Row>

      {_.get(user, "mentorProfile.relationship.length") > 0
      && _.get(user, "mentorProfile.relationship")[0].status === "confirmed" ?
        <MentoringHome user={user} refreshUser={refreshUser} /> :
        <GettingStartedStepsConnected />}
    </Container>;
};

export default MentorHome;
