import React, { Component } from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import { Icon } from "react-fa";
import { toast } from "react-toastify";
import * as _ from "lodash";
import GettingStartedSteps from "./Mentor/GettingStartedSteps";

class MentorHome extends Component {


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

      {_.get(this.props.user, "mentorProfile.relationship.length") > 0
      && _.get(this.props.user, "mentorProfile.relationship")[0].status === "confirmed" ?
        <div>
          Matched mentor homepage
        </div>:
        <GettingStartedSteps {...this.props} />}


    </Container>;
  }
}

export default MentorHome;
