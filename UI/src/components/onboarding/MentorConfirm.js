import React from 'react';
import { Badge, Button, Col, Form, Image, ProgressBar, Row } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import { Icon } from 'react-fa';
import defaults from './../../defaults/defaults.json';
import { toast } from 'react-toastify';
import CountryFlag from '../various/CountryFlag';

const MentorConfirm = (props) => {
  return <div style={{ fontSize: "16px" }}>
    <Row style={{ paddingTop: "80px" }}>
      <Col md={{ span: 6, offset: 3 }}>
        <p>
          Fantastic {props.user.firstName}, thanks for completing this!! Let's recap all your information to make sure
          it's right and then you'll be ready to go
        </p>
      </Col>
    </Row>

    <Row>
      <Col md={{ span: 2, offset: 3 }}>
        <Badge variant="info">{"From"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.onboarding.city}, ${props.onboarding.country}`} <CountryFlag
          country={props.onboarding.country}/>
        </Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={{ span: 2, offset: 3 }}>
        <Badge variant="info">{"Gender Identity"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.onboarding.gender}`} </Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={{ span: 2, offset: 3 }}>
        <Badge variant="info">{"First Generation"}</Badge>
      </Col>
      <Col md={{ span: 1 }}>
        <Form.Label>{`${props.onboarding.firstGenStudent ? "Yes" : "No"}`} </Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={{ span: 2, offset: 3 }}>
        <Badge variant="info">{"Currently studying"}</Badge>
      </Col>
      <Col md={{ span: 4 }}>
        <Form.Label>{`${props.onboarding.subject}`}</Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={{ span: 2, offset: 3 }}>
        <Badge variant="info">{"University"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Image
          src={[...defaults.universities.US, ...defaults.universities.UK].filter(u => u.name === props.onboarding.university)[0].logo}
          style={{ maxHeight: "60px", maxWidth: "130px" }}/>
      </Col>
    </Row>

    <Row>
      <Col md={{ span: 2, offset: 3 }}>
        <Badge variant="info">{"Level"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.onboarding.level}`}</Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={{ span: 2, offset: 3 }}>
        <Badge variant="info">{"Year"}</Badge>
      </Col>
      <Col md={{ span: 3 }}>
        <Form.Label>{`${props.onboarding.year}`}</Form.Label>
      </Col>
    </Row>

    <Row>
      <Col md={{ span: 2, offset: 3 }}>
        <Button block onClick={() => props.changeStage(3)}>
          <span><Icon name="fas fa-arrow-left"/>{" Previous"}  </span>
        </Button>
      </Col>
      <Col md={{ span: 2 }} style={{ paddingTop: "10px" }}>
        <ProgressBar striped now={100} label={`${100}%`}/>
      </Col>
      <Col md={{ span: 2 }}>
        <Button variant="success" block disabled={props.onboarding.registering} onClick={() => {
          props.registerMentor().then(r => {
            if (r.success) toast.success("Registered successfully!");
          });
        }}>
          {props.onboarding.registering ? <Loader type="Oval" color="#ffffff" width="20" height="20"/> :
            <span>Perfect, let's go!</span>}
        </Button>
      </Col>
    </Row>
  </div>;
};

export default MentorConfirm;
