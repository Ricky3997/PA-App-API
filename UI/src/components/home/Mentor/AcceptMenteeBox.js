import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ProfileIcon from "../../various/ProfileIcon";
import Moment from "moment";
import ConfirmAcceptMentee from "./ConfirmAcceptMentee";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Icon } from "react-fa";

const AcceptMenteeBox = (props) => {
  const timeLeft = Moment.duration(new Moment(props.matchedOn).add(5, "d").diff(new Moment()));
  const days = Math.floor(timeLeft.asDays());
  const hours = Math.floor(timeLeft.subtract(days, "d").asHours());

  return (
    <Container style={{ marginBottom: "5px " }}>
      <Row>
        <Col md={props.firstMatch ? 2 : 4}>
          <ProfileIcon pictureUrl={props.mentee.pictureUrl} size={"l"} mentorMode/>
        </Col>
        <Col md={props.firstMatch ? 10 : 8}>
          <Row>
            <Col>
              <h6>
                <Link to={`mentee/${props.mentee._id}`}>{props.mentee.firstName}</Link>
                , studies at <b>{props.mentee.school}</b> in {props.mentee.city}
              </h6>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: props.firstMatch ? 7 : 12 }}>
              <LinkContainer to={`/mentee/${props.mentee._id}`}>
                <Button block><Icon name="fas fa-user"/> See their profile</Button>
              </LinkContainer>
            </Col>
          </Row>
        </Col>
      </Row>
      <br/>
      <div>
        <Row>
          <Col>
            <p>{`Fantastic, you have been matched to help ${props.mentee.firstName}! You have ${days} day${days === 1 ? "" : "s"} and ${hours} hour${hours === 1 ? "" : "s"} left to confirm before
              we will have to match them with another mentor`}</p>
          </Col>
        </Row>
        {(Moment.duration(new Moment(props.matchedOn).add(5, "d").diff(new Moment())) <= 0) ? "Time ran out to confirm, sorry" :
          <ConfirmAcceptMentee relationshipId={props._id} />}
      </div>
    </Container>
  );
};

export default AcceptMenteeBox;
