import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { ReactTypeformEmbed } from 'react-typeform-embed';
import { connect } from 'react-redux';


const JourneyModule = (props) => {
  const module = props.user.menteeProfile.journey.filter(m => m.typeformID === props.match.params.id)[0];
  return (
    <Row>
      <Col>
        {(module && module.ready) ? <ReactTypeformEmbed
            url={`https://projectaccess.typeform.com/to/${module.typeformID}?` +
            `mentorfirstname=${props.user.firstName}` +
            `&uniqueid=${1532907125}&` +
            `mentoremail=${props.user.email}&` +
            `menteefirstname=${"Emil"}`}
            style={{ "minHeight": "600px" }}/> :
          <div>
            The journey module you are looking for either doesn't exist or you're not allowed to get to it, yet!
          </div>
        }
      </Col>
    </Row>
  );

};


export default connect(({ user }) => {
  return { user };
}, dispatch => {
  return {};
})(JourneyModule);
