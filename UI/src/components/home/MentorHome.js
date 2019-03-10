import React, { Component } from "react";
import { Col, Row, Container, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import NotReadyYet from "../various/NotReadyYet";
import { Icon } from "react-fa";
import * as _ from "lodash";
import MenteeTile from "../people/MenteeTile";
import { Bookmark, Timeline } from "react-vertical-timeline";
import ModuleBox from "../journey/ModuleBox";
import { LinkContainer } from "react-router-bootstrap";
import RequestApprovalModal from "./RequestApprovalModal";

class MentorHome extends Component {

  confirmEmailModule = {
    title: "Confirm your email address",
    description: "Why? Because your email address is your only way to log in, we need to make sure you can come back! 📧",
    ready: true,
    completed: this.props.user.emailConfirmed
  };

  requestApprovallModule = {
    title: "Request approval to mentor",
    description: "Before we can give you a mentee to help, we first need to check a couple of details! 🔎",
    ready: this.props.user.emailConfirmed,
    completed: this.props.user.mentorProfile.status !== "notYetRequested"
  };


  uploadPersonalStatementModule = {
    title: "Upload your Personal Statement",
    description: "While you wait, you can help us by sending us your PS, we will add it to an anonymised database for all mentees! 📚",
    ready: this.props.user.mentorProfile.status !== "notYetRequested",
    completed: false
  };

  render() {
    let toRender;
    if (!this.props.user.onboarded) {
      toRender = <Button onClick={() => this.props.history.push("/onboard")}>
        Looks like you are not onboarded, go finish
      </Button>;
    } else if (this.props.user.mentorProfile.status === "notYetRequested") {
      toRender = <div>
        <p>To be able to help a mentee, you first need to request approval
        </p>

        {/*changeMentorStatus("requested")*/}

        {this.props.user.emailConfirmed ? <Button onClick={() => this.props.toggleMentorHomeModal()}>
            Click here to request approval
          </Button> :
          <OverlayTrigger placement="bottom" trigger="hover"
                          overlay={<Tooltip placement="bottom" className="in">You need to confirm your email
                            first</Tooltip>}>
            <span className="d-inline-block">
              <Button disabled style={{ pointerEvents: "none" }}>
                Click here to request approval
              </Button>
            </span>
          </OverlayTrigger>
        }
      </div>;
    } else if (this.props.user.mentorProfile.status === "requested") {
      toRender = <div>
        <p>You have now requested to be approved. What happens next? <LinkContainer to="/about?type=mentor" style={{
          cursor: "pointer",
          textDecoration: "underline"
        }}><span
        >Find out here</span></LinkContainer>
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
          <Timeline height={300} progress={this.props.mentorHome.progress}>
            <Bookmark key={"confirm"} progress={10} onSelect={() => this.props.setMentorHomeProgress(10)}>
              <h6 style={{ cursor: "pointer" }}>{this.confirmEmailModule.title}</h6>
            </Bookmark>
            <Bookmark key={"approval"} progress={40} onSelect={() => this.props.setMentorHomeProgress(40)}>
              <h6 style={{ cursor: "pointer" }}>{this.requestApprovallModule.title}</h6>
            </Bookmark>
            <Bookmark key={"ps"} progress={70} onSelect={() => this.props.setMentorHomeProgress(70)}>
              <h6 style={{ cursor: "pointer" }}>{this.uploadPersonalStatementModule.title}</h6>
            </Bookmark>
            <Bookmark key={"mentee"} progress={100}>
              <h6>Start mentoring!</h6>
            </Bookmark>
          </Timeline>
        </Col>
        <Col md={7}>
          {this.props.mentorHome.progress === 10 ? <ModuleBox module={this.confirmEmailModule}/> : null}
          {this.props.mentorHome.progress === 40 ? <ModuleBox module={this.requestApprovallModule}/> : null}
          {this.props.mentorHome.progress === 70 ? <ModuleBox module={this.uploadPersonalStatementModule}/> : null}
        </Col>
        <Col md={3}>
          <h4>Your Mentees <span role="img" aria-labelledby={"angel emoji"}>😇</span></h4>
          {_.get(this.props, "user.mentorProfile.relationship.length") > 0 ?
            this.props.user.mentorProfile.relationship.map(r => <MenteeTile key={r._id} mentee={r.mentee}/>) :
            <div>
              <div>{toRender}</div>
            </div>}
        </Col>
        <RequestApprovalModal user={this.props.user} show={this.props.mentorHome.showModal} onHide={this.props.toggleMentorHomeModal}/>
      </Row>
    </Container>;
  }
}

export default MentorHome;
