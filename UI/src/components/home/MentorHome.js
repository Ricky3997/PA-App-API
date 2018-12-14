import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/es/Container";
import Button from "react-bootstrap/es/Button";
import NotReadyYet from "../various/NotReadyYet";

class MentorHome extends Component {
  render() {
    return <Container fluid>
      <Row style={{ marginTop: "10px" }}>
        <Col>
          {!this.props.user.onboarded ?
            <Button onClick={() => this.props.history.push("/onboard")}>
              Looks like you are not onboarded, go finish
            </Button> :
            <div>
              Mentor Home

              <NotReadyYet/>
            </div>}
        </Col>
      </Row>
    </Container>
  }
}

export default MentorHome;
