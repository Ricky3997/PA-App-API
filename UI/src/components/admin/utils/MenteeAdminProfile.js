import React from "react";
import { Col, Image, Row, Breadcrumb, Container } from "react-bootstrap";
import ProfileIcon from "../../various/ProfileIcon";
import { LinkContainer } from "react-router-bootstrap";
import StatusIcon from "./StatusIcon";

const MenteeAdminProfile = (props) => {
  return props.mentee ? <Container>
    {props.beadcrumbs ? <Row>
        <Breadcrumb>
          <LinkContainer to={"/admin/mentors/database"}>
            <Breadcrumb.Item componentClass="div">Database</Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active href="#">{props.mentee.firstName}</Breadcrumb.Item>
        </Breadcrumb>
      </Row> : null}
      <Row>
        <Col md={2}>
          <ProfileIcon mentorMode pictureUrl={props.mentee.pictureUrl} size={"m"}/>
        </Col>
        <Col>
          <StatusIcon status={props.mentee.status} />
        </Col>
        <Col>
          <h4>{props.mentee.firstName}</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          {props.mentee.relationship ? <span>{props.mentee.relationship.mentor.firstName}</span> : <span>No Mentor</span>}
        </Col>
      </Row>
    </Container> :
    <Image src={"https://media.giphy.com/media/6uGhT1O4sxpi8/giphy.gif"}/>;
};

export default MenteeAdminProfile;