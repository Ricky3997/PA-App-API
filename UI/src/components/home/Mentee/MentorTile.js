import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Icon } from 'react-fa';
import ProfileIcon from '../../various/ProfileIcon';

const MentorTile = (props) => {
  return (
    <Container>
      <Row>
        <Col>
          <h4>
            Your Mentor <span role="img" aria-label="hands raised in celebration">🙌</span>
          </h4>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <ProfileIcon pictureUrl={props.mentor.pictureUrl} size={"l"} mentorMode/>
        </Col>
        <Col md={6}>
          <Row>
            {props.mentor.firstName} studies {props.mentor.subject} at {props.mentor.university} (Year {props.mentor.year})
          </Row>
        </Col>
      </Row>
      <br/>
      <Row>
        <Col>
          <LinkContainer to={`/mentor/${props.mentor._id}`}>
            <Button block><Icon name="fas fa-user"/> Go to your mentor's profile</Button>
          </LinkContainer>
        </Col>

      </Row>

    </Container>
  );
};

export default MentorTile;
