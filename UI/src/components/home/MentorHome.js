import React from "react";
import { Container } from "react-bootstrap";
import * as _ from "lodash";
import GettingStartedSteps from "./GettingStartedSteps";
import MentoringHome from "./Mentor/MentoringHome";
import WelcomeHeader from "../various/WelcomeHeader";

const MentorHome = ({ user, refreshUser, history }) => {
  return <Container fluid>
    <WelcomeHeader user={user} refreshUser={refreshUser}/>
    {_.get(user, "mentorProfile.relationship.length") === 0
    || (_.get(user, "mentorProfile.relationship.length") === 1 && _.get(user, "mentorProfile.relationship")[0].status === "awaitingConfirmation") ?
      <GettingStartedSteps mode={"mentor"} history={history}/> : <MentoringHome user={user} refreshUser={refreshUser}/> }
  </Container>;
};

export default MentorHome;
