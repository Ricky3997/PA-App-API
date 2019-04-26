import React from 'react';
import { Container } from 'react-bootstrap';
import * as _ from 'lodash';
import MenteeInRelationshipHome from './Mentee/MenteeInRelationshipHome';
import GettingStartedSteps from './GettingStartedSteps';
import WelcomeHeader from '../various/WelcomeHeader';

const MenteeHome = (props) => {

  return <Container fluid>

    <WelcomeHeader user={props.user} refreshUser={props.refreshUser} />

    {_.get(props.user, "menteeProfile.relationship.status") === "confirmed" ?
      <MenteeInRelationshipHome /> :
      <GettingStartedSteps  mode={"mentee"} />}
  </Container>;
};

export default MenteeHome;
