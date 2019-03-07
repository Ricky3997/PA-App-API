import React, { Component } from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
import { Icon } from "react-fa";
import ProgressionTimeline from "./ProgressionTimeline";
import Module from "./Module";
import MentorTile from "../people/MentorTile";
import NoMentorYet from "./NoMentorYet";
import * as _ from "lodash";

class MenteeHome extends Component {
  render() {
    return <Container fluid>
      <Row style={{ marginTop: "10px" }}>
        <Col md={{ span: 11 }}>
          <h3>Welcome back, {this.props.user.firstName}! 🤗</h3>
        </Col>
        <Col md={{ span: 1 }}>
          <Button onClick={() => this.props.refreshUser()}>
            <Icon name={"fas fa-refresh"}/>
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md={2}>
          <ProgressionTimeline modules={this.props.journey.modules} active={this.props.journey.active}
                               changeSection={(m) => alert({ active: m.id })}/>
        </Col>
        <Col md={7}>
          <Module module={this.props.journey.modules.filter(m => m.id === this.props.journey.active)[0]}/>
        </Col>
        <Col md={3}>
          {_.get(this.props, "user.menteeProfile.relationship.mentor") ?
            <MentorTile mentor={this.props.user.menteeProfile.relationship.mentor}/>
            : <NoMentorYet changeMenteeStatus={this.props.changeMenteeStatus} user={this.props.user}/>}
          <Row>
            {null}
          </Row>
        </Col>
      </Row>
    </Container>;
  }
}

export default MenteeHome;
