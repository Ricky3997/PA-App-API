import React, { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Icon } from "react-fa";
import { toast } from "react-toastify";
import * as _ from "lodash";
import MenteeInRelationshipHome from "./Mentee/MenteeInRelationshipHome";
import GettingStartedSteps from "./GettingStartedSteps";

class MenteeHome extends Component {
  render() {
    return <Container fluid>
      <Row style={{ marginTop: "10px" }}>
        <Col md={{ span: 11 }}>
          <h3>Welcome {this.props.user.emailConfirmed ? "back, " : ""} {this.props.user.firstName}! 🤗</h3>
        </Col>
        <Col md={{ span: 1 }}>
          <Button onClick={() => this.props.refreshUser().then(r => {
            if (r.success) toast.success("Refreshed");
            else toast.error("Error refreshing");
          })}>
            <Icon name={"fas fa-refresh"}/>
          </Button>
        </Col>
      </Row>

      {_.get(this.props.user, "menteeProfile.relationship") ?
        <MenteeInRelationshipHome {...this.props} /> :
        <GettingStartedSteps {...this.props} mode="mentee"/>}
    </Container>;
  }
}

export default MenteeHome;
