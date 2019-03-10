import React, { Component } from "react";
import { Col, Row, Container, Button, Image } from "react-bootstrap";
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
          <ProgressionTimeline modules={this.props.user.menteeProfile.journey} activeId={this.props.journey.activeId}
                               changeSection={(m) => this.props.changeActiveJourneyModule( m.typeformID )}/>
        </Col>
        <Col md={7}>
          <Module module={this.props.user.menteeProfile.journey.filter(m => m.typeformID === this.props.journey.activeId)[0]}/>
        </Col>
        <Col md={3}>
          <Row>
          {_.get(this.props, "user.menteeProfile.relationship.mentor") ?
            <MentorTile mentor={this.props.user.menteeProfile.relationship.mentor}/>
            : <NoMentorYet changeMenteeStatus={this.props.changeMenteeStatus} user={this.props.user}/>}
          </Row>
          <br />
          <Row>
            <h5>{'McKinsey & Co.'} is Project Access {this.props.user.mentorProfile.country}'s Platinum Partner, providing the essential financing to make this happen </h5>
            <Image src={'https://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/lg/public/2014/05/28/mckinsey-logo.png'} style={{maxWidth: '300px', maxHeight: '150px'}} />
          </Row>
        </Col>
      </Row>

    </Container>;
  }
}

export default MenteeHome;
