import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Icon } from 'react-fa';
import { toast } from 'react-toastify';
import FacingIssueButton from './FacingIssueButton';

const WelcomeHeader = ({user, refreshUser}) => {
  return (
    <Row style={{ marginTop: "10px" }}>
      <Col md={{ span: 9 }} xs={12}>
        <h3>Welcome {user.emailConfirmed ? "back, " : ""} {user.firstName}! 🤗</h3>
      </Col>
      <Col md={1} xs={4}>
        <Button onClick={() => refreshUser().then(r => {
          if (r.success) toast.success("Refreshed");
          else toast.error("Error refreshing");
        })}>
          <Icon name={"fas fa-refresh"}/>
        </Button>
      </Col>
      <Col md={2} xs={8}>
        <FacingIssueButton/>
      </Col>
    </Row>
  );
};

export default WelcomeHeader;
