import React, { Component } from "react";
import NotReadyYet from "../various/NotReadyYet";
import { Col, Row, Container, Button } from "react-bootstrap";
import { Icon } from "react-fa";
import JourneyHome from "../journey/JourneyHome";
import ProgressionTimeline from "./ProgressionTimeline";
import Milestone from "./Milestone";
import MentorTile from "../people/MentorProfile";
import NoMentorYet from "./NoMentorYet";

class MenteeHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 2,
      milestones: [{
        id: 1,
        title: "Subject choice",
        description: "The choice of a subject bla bla bla",
        progress: 10,
        date: "June/July",
        completed: "12 June '18",
        ready: true,
        typeformID: "MDHUre"
      }, {
        id: 2,
        title: "Personal Statement",
        description: "Preparing your personal statement involves bla bla",
        progress: 30,
        date: "September",
        completed: false,
        ready: true,
        typeformID: "MDHUre"

      }, {
        id: 3,
        title: "Oxbridge deadline",
        description: "The deadline for Obridge bla bla bla",
        progress: 50,
        date: "15 October",
        completed: false,
        ready: false,
        typeformID: "MDHUre"

      }, {
        id: 4,
        title: "Interviews",
        description: "Preparing your interviews bla bla",
        progress: 70,
        date: "December",
        completed: false,
        ready: false,
        typeformID: "MDHUre"
      }, {
        id: 5,
        title: "Offer",
        description: "Receiving the offer bla bla bla",
        progress: 90,
        date: "January",
        completed: false,
        ready: false,
        typeformID: "MDHUre"
      }, {
        id: 6,
        title: "Ready, start!",
        description: "Ready to start bla bla",
        progress: 100,
        date: "September",
        completed: false,
        ready: false,
        typeformID: "MDHUre"
      }]
    };
    //TODO Move to API
  }

  render() {

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
        <Col md={2}>
          <ProgressionTimeline milestones={this.state.milestones} active={this.state.active}
                               changeSection={(m) => this.setState({ active: m.id })}/>
        </Col>
        <Col md={7}>
          <Milestone milestone={this.state.milestones.filter(m => m.id === this.state.active)[0]}/>
        </Col>
        <Col md={3}>
          {this.props.mentor ? <MentorTile mentor={this.props.mentor}/> : <NoMentorYet changeMenteeStatus={this.props.changeMenteeStatus} user={this.props.user}/>}
          <Row>
            {null}
          </Row>
        </Col>
      </Row>
    </Container>;
  }
}

export default MenteeHome;
