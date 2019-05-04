import React from 'react';
import { Container } from 'react-bootstrap';
import * as _ from 'lodash';
import GettingStartedSteps from './GettingStartedSteps';
import MentoringHome from './Mentor/MentoringHome';
import WelcomeHeader from '../various/WelcomeHeader';

const MentorHome = ({ user }) => {
  return <Container fluid>
    <WelcomeHeader user={user}/>
    {_.get(user, "mentorProfile.relationship.length") === 0 || !_.get(user, "onboarded")
    || (_.get(user, "mentorProfile.relationship.length") === 1 && _.get(user, "mentorProfile.relationship")[0].status === "awaitingConfirmation") ?
      <GettingStartedSteps mode={"mentor"} /> : <MentoringHome/> }
  </Container>;
};

export default MentorHome;
