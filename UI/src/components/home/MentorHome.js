import React, { Component } from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import NotReadyYet from "../various/NotReadyYet";
import { Icon } from "react-fa";
import * as _ from "lodash";

class MentorHome extends Component {

  render() {
    let toRender;
    if (!this.props.user.onboarded) {
      toRender = <Button onClick={() => this.props.history.push("/onboard")}>
        Looks like you are not onboarded, go finish
      </Button>;
    } else if (this.props.user.mentorProfile.status === "notYetRequested") {
      toRender = <div>
        <p>
          You can now become a mentor
        </p>
        <Button onClick={() => this.props.changeMentorStatus("requested")}>
          Click here to request approval
        </Button>
      </div>;
    } else if (this.props.user.mentorProfile.status === "requested") {
      toRender = <div>
        <p>You have now requested to be approved
        </p>
        <Button onClick={() => this.props.changeMentorStatus("notYetRequested")}>
          Click here to withdraw your request
        </Button>
      </div>;
    } else if (this.props.user.mentorProfile.status === "rejected") {
      toRender = <div>
        You have been rejected to be a mentor, but you can still help like this
      </div>;
    } else if (this.props.user.mentorProfile.status === "approved") {
      toRender = <div>
        You have been approved to be a mentor, we are now looking for the best match
      </div>;
    } else toRender = <NotReadyYet/>;

    return <Container fluid>

      <Row style={{ marginTop: "10px" }}>
        <Col md={{span: 11 }}>
          <h3>Welcome back, {this.props.user.firstName}! 🤗</h3>
        </Col>
        <Col md={{span: 1 }}>
          <Button onClick={() => this.props.refreshUser()}>
            <Icon name={"fas fa-refresh"}/>
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md={9}>
          {toRender}
        </Col>
        <Col md={3}>
          {_.get(this.props, "user.mentorProfile.relationship.length") > 0 ? <div>You have at least one mentee</div> : <div>No mentee yet</div>}
          <Row>
            {null}
          </Row>
        </Col>
      </Row>
    </Container>;
  }
}

export default MentorHome;
