import React from 'react';
import { Button, CardColumns, CardDeck, Col, Row } from 'react-bootstrap';
import * as _ from 'lodash';
import MenteeTile from './MenteeTile';
import AcceptMenteeBox from './AcceptMenteeBox';
import CountryPartner from '../../advertising/CountryPartner';
import ReferAFriend from '../../various/ReferAFriend';
import AppointmentCard from './AppointmentCard';
import EventHappening from './EventHappening';
import { Icon } from 'react-fa';
import { LinkContainer } from 'react-router-bootstrap';
import moment from 'moment';
import Events from './Events';
import LookingForInternships from './LookingForInternships';
import Appointments from './Appointments';

const MentoringHome = (props) => {

  let toRender;
  if (!props.user.onboarded) {
    toRender = <Button onClick={() => props.history.push('/onboard')}>
      Looks like you are not onboarded, go finish
    </Button>;
  } else if (props.user.mentorProfile.status === 'rejected') { //TODO
    toRender = <div>
      Unfortunately you have been rejected, and this was indicated as the reason:
      <blockquote>
        {props.user.mentorProfile.rejectionReason}
      </blockquote>
    </div>;
  }

  return (
    <div>
      <Row>
        <Col md={9}>
          <Row>
            <Col>
              <Appointments/>
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
