import React from "react";
import { Badge, Button, Col, Form, Row } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { Icon } from "react-fa";

const MentorConfirm = (props) => {
  return <div>

    <Row style={{ paddingTop: "80px" }}>
      <Col md={{ span: 6, offset: 3 }}>
        <p>
          Fantastic {props.user.firstName}, thanks for completing this!! Let's recap all your information to make sure
          it's right and then you'll be ready to go
        </p>
      </Col>
    </Row>

    <Row>
      <Col md={{ span: 4, offset: 2 }}>
        <Badge variant="info">{"You are"}</Badge>
        <Form.Label>{`${props.onboarding.gender} and ${props.onboarding.firstGenStudent ? "First Generation" : "Not First Generation"}`} </Form.Label>
      </Col>

      <Col md={4}>
        <Badge variant="info">{"You are from"}</Badge>
        <Form.Label>{`${props.onboarding.city}, ${props.onboarding.country}`} </Form.Label>
      </Col>
    </Row>
    <Row>
      <Col md={{ span: 4, offset: 2 }}>
        <Badge variant="info">{"Currently studying"}</Badge>
        <Form.Label>{`${props.onboarding.subject} at ${props.onboarding.university}`}</Form.Label>
      </Col>

      <Col md={4}>
        <Badge variant="info">{"In Year"}</Badge>
        <Form.Label>{`${props.onboarding.year} of your ${props.onboarding.level} degree`} </Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={{ span: 4, offset: 2 }}>
        <Button block onClick={() => props.changeStage(3)}>
          <span><Icon name="fas fa-arrow-left" />{" Previous"}  </span>
        </Button>
      </Col>
      <Col md={{ span: 4 }}>
        <Button variant="success" block disabled={props.onboarding.registering} onClick={() => {
          props.registerMentor();
        }}>
          {props.onboarding.registering ? <Loader type="Oval" color="#ffffff" width="20" height="20"/> : <span>Looks good, let's go!</span>}
        </Button>
      </Col>
    </Row>
  </div>;
};

export default MentorConfirm;
