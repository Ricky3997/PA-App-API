import React from 'react';
import { Badge, Button, Col, Form, Image, Row } from 'react-bootstrap';
import defaults from '../../defaults/defaults';
import CountryFlag from '../various/CountryFlag';
import ProfileIcon from '../various/ProfileIcon';
import { LinkContainer } from 'react-router-bootstrap';
import { Icon } from 'react-fa';
import * as _ from 'lodash';
import FeatureNotReadyYetOnHover from '../various/FeatureNotReadyYetOnHover';

const MenteeProfileDetails = ({
                                menteeId, user,
                                firstName, yearBorn, city, country, subjects, school,
                                careerInterests, interestedIn, hobbiesAndInterests, pictureUrl,
                                yearApply, unisApplyingFor, coursesApplyingFor, year, level
                              }) => {
  return (<div>
      <Row>
        <Col md={2}>
          <ProfileIcon pictureUrl={pictureUrl} size='xl'/>
        </Col>
        <Col md={4}>
          <h1>
            {firstName}
          </h1>
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
          <Form.Label>{`${subjects.join(", ")}`}</Form.Label>
        </Col>
        <Col md={2}>
          <Badge variant="info">{"School"}</Badge>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Label>{`${school}, ${year}`}</Form.Label>
        </Col>
      </Row>

      <Row>


      </Row>

      <Row>
        <Col md={2}>
          <Badge variant="info">{"Level"}</Badge>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Label>{`${level}`}</Form.Label>
        </Col>
        <Col md={2}>
          <Badge variant="info">{"Career Interests"}</Badge>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Label>{`${careerInterests.join(", ")}`}</Form.Label>
        </Col>
      </Row>

      <Row>
        <Col md={2}>
          <Badge variant="info">{"Expected Start"}</Badge>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Label>{`${yearApply}`}</Form.Label>
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
          <Badge variant="info">{"Applying for"}</Badge>
        </Col>
        <Col md={{ span: 3 }}>
          <Form.Label>{`${interestedIn.join(", ")}`}</Form.Label>
        </Col>
        <Col md={2}>
          <Badge variant="info">{"Courses"}</Badge>
        </Col>
        <Col>
          <Form.Label>{`${coursesApplyingFor.join(", ")}`}</Form.Label>
        </Col>

      </Row>


      <Row>
        <Col md={2}>
          <Badge variant="info">{"Unis interested"}</Badge>
        </Col>
        <Col>
          {unisApplyingFor.map(uni => <Image
            key={uni}
            src={[...defaults.universities.US, ...defaults.universities.UK].filter(u => u.name === uni)[0].logo}
            style={{ maxHeight: "60px", maxWidth: "130px", marginLeft: "10px" }}/>)}
        </Col>
      </Row>

      <br/>

      {user.type === "mentor" && _.some(_.get(user, "mentorProfile.relationship") || [], r => r.mentee._id === menteeId && r.status === "confirmed") ?
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

export default MenteeProfileDetails;
