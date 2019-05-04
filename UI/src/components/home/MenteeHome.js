import React from 'react';
import { Container } from 'react-bootstrap';
import * as _ from 'lodash';
import MenteeInRelationshipHome from './Mentee/MenteeInRelationshipHome';
import GettingStartedSteps from './GettingStartedSteps';
import WelcomeHeader from '../various/WelcomeHeader';

const MenteeHome = (user) => {
  return <Container fluid>
    <WelcomeHeader user={user}/>
    {_.get(user, 'menteeProfile.relationship.status') === 'confirmed' ?
      <MenteeInRelationshipHome/> :
      <GettingStartedSteps mode={'mentee'}/>}
  </Container>;
};

export default MenteeHome;
