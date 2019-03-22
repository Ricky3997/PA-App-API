import React, { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Icon } from "react-fa";
import ProgressionTimeline from "./Mentee/ProgressionTimeline";
import Module from "./Mentee/Module";
import MentorTile from "./Mentee/MentorTile";
import NoMentorYet from "./Mentee/NoMentorYet";
import * as _ from "lodash";
import RequestApprovalMenteeModal from "./Mentee/RequestApprovalMenteeModal";
import { toast } from "react-toastify";
import CountryPartner from "../advertising/CountryPartner";

class MenteeHome extends Component {
  render() {
    return <Container fluid>
      <Row style={{ marginTop: "10px" }}>
        <Col md={{ span: 11 }}>
          <h3>Welcome back, {this.props.user.firstName}! 🤗</h3>
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

      <Row>
        <Col md={2}>
          {this.props.user.onboarded ?
            <ProgressionTimeline modules={this.props.user.menteeProfile.journey} activeId={this.props.journey.activeId}
                                 changeSection={(m) => this.props.changeActiveJourneyModule(m.typeformID)}/>
            : null}
        </Col>

        <Col md={7}>
          {this.props.user.onboarded ?
            <Module
              module={this.props.user.menteeProfile.journey.filter(m => m.typeformID === this.props.journey.activeId)[0]}/>
            : null}
        </Col>
        <Col md={3}>
          <Row>
            {_.get(this.props, "user.menteeProfile.relationship.status") === "confirmed" ?
              <MentorTile mentor={this.props.user.menteeProfile.relationship.mentor}/>
              : <NoMentorYet toggleMenteeHomeModal={this.props.toggleMenteeHomeModal}
                             changeMenteeStatus={this.props.changeMenteeStatus} user={this.props.user}/>}
          </Row>
          <br/>
          <Row>
            <CountryPartner country={this.props.user.menteeProfile.country} index={Math.floor(Math.random() * 3)}/>
          </Row>
        </Col>
      </Row>

      {this.props.user.onboarded && this.props.user.emailConfirmed ?
        <RequestApprovalMenteeModal show={this.props.menteeHome.showModal} user={this.props.user}
                                    menteeHome={this.props.menteeHome} onHide={(properties) => {
          this.props.setMenteeApprovalProperties(properties);
          this.props.toggleMenteeHomeModal();
        }} onSubmit={(properties) => this.props.changeMenteeStatus("requested", properties).then(r => {
          if (r.success) {
            this.props.toggleMenteeHomeModal();
            toast.success("Request sent");
          }
        })
        }
        /> : null}
    </Container>;
  }
}

export default MenteeHome;
