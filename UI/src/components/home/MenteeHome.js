import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Icon } from "react-fa";
import { toast } from "react-toastify";
import * as _ from "lodash";
import MenteeInRelationshipHome from "./Mentee/MenteeInRelationshipHome";
import GettingStartedSteps from "./GettingStartedSteps";
import { connect } from "react-redux";
import {
  changeActiveJourneyModule,
  changeMenteeStatus,
  setGettingStartedStepsProgress,
  setMenteeApprovalProperties,
  toggleApprovalModal
} from "../../actions/actionCreator";
import WelcomeHeader from "../various/WelcomeHeader";

const MenteeHome = (props) => {

  const GettingStartedStepsConnected = connect(({ user, gettingStartedSteps, menteeHome }) => {
    return { user, gettingStartedSteps, menteeHome, mode: "mentee" };
  }, dispatch => {
    return {
      setGettingStartedStepsProgress: (progress) => dispatch(setGettingStartedStepsProgress(progress)),
      toggleApprovalModal: () => dispatch(toggleApprovalModal()),
      setMenteeApprovalProperties: (properties) => dispatch(setMenteeApprovalProperties(properties)),
      changeMenteeStatus: (status, properties) => dispatch(changeMenteeStatus(status, properties))
    };
  })(GettingStartedSteps);


  const MenteeInRelationshipHomeConnected = connect(({ user, journey, menteeHome }) => {
    return { user, journey, menteeHome };
  }, dispatch => {
    return {
      changeActiveJourneyModule: (id) => dispatch(changeActiveJourneyModule(id))
    };
  })(MenteeInRelationshipHome);

  return <Container fluid>

    <WelcomeHeader user={props.user} refreshUser={props.refreshUser} />

    {_.get(props.user, "menteeProfile.relationship.status") === "confirmed" ?
      <MenteeInRelationshipHomeConnected/> :
      <GettingStartedStepsConnected/>}
  </Container>;
};

export default MenteeHome;
