import React, { Component } from "react";
import NotReadyYet from "../various/NotReadyYet";
import { Col, Row, Container, Button} from "react-bootstrap";
import { Icon } from "react-fa";

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

    let toRender;
    if (!this.props.user.onboarded) {
      toRender = <Button onClick={() => this.props.history.push("/onboard")}>
        Looks like you are not onboarded, go finish
      </Button>;
    } else if (this.props.user.menteeProfile.status === "notYetRequested") {
      toRender = <div>
        <p>
          You can now request approval to have a mentor
        </p>
        <Button onClick={() => this.props.changeMenteeStatus("requested")}>
          Click here to request approval
        </Button>
      </div>;
    } else if (this.props.user.menteeProfile.status === "requested") {
      toRender = <div>
        <p>You have now requested approval to have a mentor
        </p>
        <Button onClick={() => this.props.changeMenteeStatus("notYetRequested")}>
          Click here to withdraw your request
        </Button>
      </div>;
    } else if (this.props.user.menteeProfile.status === "approved") {
      toRender = <div>
        You have been approved to have a mentor, we are now looking for the best match
      </div>;
    } else if (this.props.user.menteeProfile.status === "rejected") {
      toRender = <div>
        You have been rejected to have a mentor, but you can still help like this
      </div>;
    } else toRender = <NotReadyYet/>;


    return <Container fluid>
      <Row style={{ marginTop: "10px" }}>
        <Col md={{ span: 11 }}>
          {toRender}
        </Col>
        <Col md={{ span: 1 }}>
          <Button onClick={() => this.props.refreshUser()}>
            <Icon name={"fas fa-refresh"}/>
          </Button>
        </Col>
      </Row>


      {/*<Row>*/}
      {/*<Col md={2}>*/}
      {/*<ProgressionTimeline milestones={this.state.milestones} active={this.state.active}*/}
      {/*changeSection={(m) => this.setState({ active: m.id })}/>*/}
      {/*</Col>*/}
      {/*<Col md={7}>*/}
      {/*<Milestone milestone={this.state.milestones.filter(m => m.id === this.state.active)[0]}/>*/}
      {/*</Col>*/}
      {/*<Col md={3}>*/}
      {/*{this.props.mentor ? <MentorTile mentor={this.props.mentor}/> : <NoMentorYet/>}*/}
      {/*<Row>*/}
      {/*{null}*/}
      {/*</Row>*/}
      {/*</Col>*/}
      {/*</Row>*/}
    </Container>;
  }
}

export default MenteeHome;
