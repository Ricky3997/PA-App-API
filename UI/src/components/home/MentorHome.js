import React from "react";
import { Container } from "react-bootstrap";
import * as _ from "lodash";
import GettingStartedSteps from "./GettingStartedSteps";
import MentoringHome from "./Mentor/MentoringHome";
import WelcomeHeader from '../various/WelcomeHeader'
import { connect } from "react-redux";
import {
  changeMentorStatus,
  setGettingStartedStepsProgress,
  setMentorApprovalProperties,
  toggleApprovalModal
} from "../../actions/actionCreator";

const MentorHome = ({ user, refreshUser }) => {
  const GettingStartedStepsConnected = connect(({ user, gettingStartedSteps, mentorHome }) => {
    return { user, gettingStartedSteps, mentorHome, mode: "mentor" };
  }, dispatch => {
    return {
      setGettingStartedStepsProgress: (progress) => dispatch(setGettingStartedStepsProgress(progress)),
      toggleApprovalModal: () => dispatch(toggleApprovalModal()),
      setMentorApprovalProperties: (properties) => dispatch(setMentorApprovalProperties(properties)),
      changeMentorStatus: (status, properties) => dispatch(changeMentorStatus(status, properties))
    };
  })(GettingStartedSteps);

  return <Container fluid>
    <WelcomeHeader user={user} refreshUser={refreshUser} />

    {_.get(user, "mentorProfile.relationship.length") > 0
    && _.get(user, "mentorProfile.relationship")[0].status === "confirmed" ?
      <MentoringHome user={user} refreshUser={refreshUser}/> :
      <GettingStartedStepsConnected/>}
  </Container>;
};

export default MentorHome;
