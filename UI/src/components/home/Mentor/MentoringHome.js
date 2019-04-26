import React from 'react';
import { Col, Row } from 'react-bootstrap';
import * as _ from 'lodash';
import MenteeTile from './MenteeTile';
import AcceptMenteeBox from './AcceptMenteeBox';
import CountryPartner from '../../advertising/CountryPartner';
import ReferAFriend from '../../various/ReferAFriend';
import Events from './Events';
import LookingForInternships from './LookingForInternships';
import Appointments from './Appointments';

const MentoringHome = (props) => {

   // if (props.user.mentorProfile.status === 'rejected') { //TODO Handle Rejection

  return (
    <div>
      <Row>
        <Col md={9}>
          <Row>
            <Col>
              <Appointments mentees={props.user.mentorProfile.relationship.map(r => r.mentee)}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <Events uni={_.get(props, 'user.mentorProfile.university')}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <LookingForInternships />
            </Col>
          </Row>
        </Col>
        <Col md={3}>
          <Row>
            <h4>Your Mentees 😇</h4>
            {props.user.mentorProfile.relationship.sort((a, b) => a.status === 'awaitingConfirmation' ? -1 : 1)
                .map(r => r.status === 'awaitingConfirmation' ? <AcceptMenteeBox {...r} /> : <MenteeTile key={r._id} {...r} />)}
          </Row>
          <br/>
          <Row>
            <ReferAFriend mentorMode/>
          </Row>
          <br/>
          <Row>
            <CountryPartner country={props.user.mentorProfile.country} index={props.user._id.toLowerCase().split('').reduce((result, ch) => result * 16 + '0123456789abcdefgh'.indexOf(ch), 0) % 4}/>
          </Row>

        </Col>
      </Row>
    </div>
  );
};

export default MentoringHome;
