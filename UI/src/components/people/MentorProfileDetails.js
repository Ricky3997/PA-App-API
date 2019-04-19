import React from "react";
import { Badge, Button, Col, Form, Image, Row } from 'react-bootstrap';
import CountryFlag from "../various/CountryFlag";
import ProfileIcon from "../various/ProfileIcon";
import defaults from "../../defaults/defaults";
import * as _ from 'lodash';
import { LinkContainer } from 'react-router-bootstrap';
import { Icon } from 'react-fa';
import FeatureNotReadyYetOnHover from '../various/FeatureNotReadyYetOnHover';

const MentorProfileDetails = ({
                                firstName, yearBorn, city, country, subject, university,
                                careerInterests, interestedIn, hobbiesAndInterests, pictureUrl,
                                yearGraduation, user, mentorId
                              }) => {
  return (<div>
      <Row>
        <Col md={2}>
          <ProfileIcon mentorMode pictureUrl={pictureUrl} size={"l"}/>
        </Col>
        <Col md={2}>
          <h4>{firstName}</h4>
        </Col>
      </Row>
      <Row>
        <Col md={2}>
          <Badge variant="info">{"From"}</Badge>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Label>{`${city}, ${country}`} <CountryFlag country={country}/>
          </Form.Label>
        </Col>
        <Col md={{ span: 2 }}>
          <Badge variant="info">{"Year of Birth"}</Badge>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Label>{`${yearBorn}`}</Form.Label>
        </Col>
      </Row>

      <Row>
        <Col md={2}>
          <Badge variant="info">{"Currently studying"}</Badge>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Label>{`${subject}`}</Form.Label>
        </Col>
        <Col md={2}>
          <Badge variant="info">{"University"}</Badge>
        </Col>
        <Col md={{ span: 3 }}><Image
          src={[...defaults.universities.US, ...defaults.universities.UK].filter(u => u.name === university)[0].logo}
          style={{ maxHeight: "60px", maxWidth: "130px" }}/>
        </Col>
      </Row>

      <Row>
        <Col md={2}>
          <Badge variant="info">{"Expected Graduation"}</Badge>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Label>{`${yearGraduation}`}</Form.Label>
        </Col>
        <Col md={2}>
          <Badge variant="info">{"Hobbies & Interests"}</Badge>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Label>{`${hobbiesAndInterests.join(", ")}`}</Form.Label>
        </Col>
      </Row>

      <Row>
        <Col md={2}>
          <Badge variant="info">{"Career Interests"}</Badge>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Label>{`${careerInterests.join(", ")}`}</Form.Label>
        </Col>
      </Row>

      {user.type === "mentee" && _.get(user, "menteeProfile.relationship.mentor._id") === mentorId && _.get(user, "menteeProfile.relationship.status") === "confirmed" ?
        <Row>
          <Col>
            <LinkContainer to="/message">
              <Button block><Icon name="fas fa-commenting"/> Message</Button>
            </LinkContainer>
          </Col>
          <Col>
            <LinkContainer to="/call">
              <Button block><Icon name="fas fa-phone"/> Call</Button>
            </LinkContainer>
          </Col>
          <Col>
            <FeatureNotReadyYetOnHover>
              <LinkContainer to="/call">
                <Button block disabled>
                  <Icon name="fas fa-calendar"/> Schedule Call</Button>
              </LinkContainer>
            </FeatureNotReadyYetOnHover>
          </Col>
        </Row> : null}
    </div>
  );
};

export default MentorProfileDetails;
