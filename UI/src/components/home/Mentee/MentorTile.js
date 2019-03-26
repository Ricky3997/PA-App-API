import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Icon } from "react-fa";
import ProfileIcon from "../../various/ProfileIcon";
import { Link } from "react-router-dom";

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
            <Link to={`mentor/${props.mentor._id}`}>{props.mentor.firstName}</Link>
          </Row>
          <Row>
            {props.mentor.subject}
          </Row>
          <Row>
            {props.mentor.university}
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row style={{ marginTop: "10px" }}>
            <LinkContainer to="/message">
              <Button block><Icon name="fas fa-commenting"/> Message</Button>
            </LinkContainer>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <LinkContainer to="/call">
              <Button block><Icon name="fas fa-phone"/> Call</Button>
            </LinkContainer>
          </Row>
        </Col>
      </Row>

    </Container>
  );
};

export default MentorTile;
