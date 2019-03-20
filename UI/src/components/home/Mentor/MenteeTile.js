import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Icon } from "react-fa";
import ProfileIcon from "../../various/ProfileIcon";
import Moment from "moment";
import ConfirmAcceptMentee from "./ConfirmAcceptMentee";
import connect from "react-redux/es/connect/connect";
import { mentorDecisionRelationship, toggleMentorConfirmDecision } from "../../../actions/actionCreator";
import { Link } from "react-router-dom";

const MenteeTile = (props) => {
  const timeLeft = Moment.duration(new Moment(props.matchedOn).add(5, "d").diff(new Moment()));
  const days = Math.floor(timeLeft.asDays());
  const hours = Math.floor(timeLeft.subtract(days, "d").asHours());

  const ConfirmAcceptMenteeButton = connect(({ mentorHome }) => {
    return { mentorHome, relationshipId: props._id };
  }, dispatch => {
    return {
      toggleMentorConfirmDecision: (showConfirmDecision) => dispatch(toggleMentorConfirmDecision(showConfirmDecision)),
      mentorDecisionRelationship: (accept) => dispatch(mentorDecisionRelationship(props._id, accept))
    };
  })(ConfirmAcceptMentee);


  return (
    <Container style={{ marginBottom: "10px" }}>
      <Row>
        <Col md={4}>
          <ProfileIcon pictureUrl={props.mentee.pictureUrl} size={"l"} mentorMode/>
        </Col>
        <Col md={6}>
          <Row>
            <h6>
              <Link to={`mentee/${props.mentee._id}`}>{props.mentee.firstName}</Link>
              , studies at <b>{props.mentee.school}</b> in {props.mentee.city}
            </h6>
          </Row>
        </Col>
      </Row>
      <br/>
      {props.status === "awaitingConfirmation" ? <div>
          <Row>
            <Col>
              <p>{`Fantastic, you have been matched to help ${props.mentee.firstName}! You have ${days} day${days === 1 ? "" : "s"} and ${hours} hour${hours === 1 ? "" : "s"} left to confirm before
              we will have to match them with another mentor`}</p>
            </Col>
          </Row>
          {(Moment.duration(new Moment(props.matchedOn).add(5, "d").diff(new Moment())) <= 0) ? "Time ran out to confirm, sorry" :
            <ConfirmAcceptMenteeButton/>}
        </div> :
        <Row>
          <Col>
            <LinkContainer to="/message">
              <Button block><Icon name="fas fa-commenting"/> Message</Button>
            </LinkContainer>
          </Col>
          <Col>
            <LinkContainer to="/call">
              <Button block><Icon name="fas fa-phone"/> Call</Button>
            </LinkContainer>
          </Col>
        </Row>}
    </Container>
  );
};

export default MenteeTile;
