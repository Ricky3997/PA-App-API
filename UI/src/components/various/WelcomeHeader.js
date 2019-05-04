import React from 'react';
import { Col, Row } from 'react-bootstrap';

const WelcomeHeader = ({ user }) => {
  return (
    <Row>
      <Col md={{ span: 9 }} xs={12}>
        <h3>Welcome {user.emailConfirmed ? 'back, ' : ''} {user.firstName}! 🤗</h3>
      </Col>
    </Row>
  );
};

export default WelcomeHeader;
