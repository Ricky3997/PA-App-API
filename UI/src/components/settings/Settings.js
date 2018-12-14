import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import MentorSettings from "./MentorSettings";
import MenteeSettings from "./MenteeSettings";

class Settings extends Component {
  render() {
    return this.props.user ?
      <Container>
        <Row>
          <Col>
            <h2>
              Edit Your Profile
            </h2>
          </Col>
        </Row>
        <div>
          {this.props.user.type === "mentor" ? <MentorSettings {...this.props} /> : <MenteeSettings {...this.props}/>}
        </div>
      </Container> : <Redirect to={"/login"}/>;
  }

}

export default Settings;
