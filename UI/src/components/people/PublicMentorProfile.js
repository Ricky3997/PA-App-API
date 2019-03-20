import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const PublicMentorProfile = ({ match }) => {

  return (
    <Container style={{ marginBottom: "10px" }}>
      <Row>
        <Col>
          Hello world
          <br/>
          ID: {match.params.id}
        </Col>
      </Row>
    </Container>
  );
};

export default PublicMentorProfile;
