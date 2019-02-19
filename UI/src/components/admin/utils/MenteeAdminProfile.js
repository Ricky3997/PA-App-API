import React from "react";
import { Col, Image, Row, Breadcrumb, Container } from "react-bootstrap";
import { Icon } from "react-fa";
import ProfileIcon from "../../various/ProfileIcon";
import { LinkContainer } from "react-router-bootstrap";

const MenteeAdminProfile = (props) => {

  const statusToIcon = () => {
    if (props.status === "notYetRequested") return <Icon name={`fas fa-newspaper-o`} style={{ color: "#03619b" }}/>;
    else if (props.status === "approved") return <Icon name={`fas fa-check-circle`} style={{ color: "#289b00" }}/>;
    else if (props.status === "requested") return <Icon name={`fas fa-hourglass`} style={{ color: "#c69200" }}/>;
    else if (props.status === "rejected") return <Icon name={`fas fa-ban`} style={{ color: "#9b0014" }}/>;
    else return null;
  };

  return props.mentee ? <Container>
      <Row>
        <Breadcrumb>
          <LinkContainer to={"/admin/mentors/database"}>
            <Breadcrumb.Item componentClass="div">Database</Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active href="#">{props.mentee.firstName}</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row>
        <Col md={1}>
          <ProfileIcon mentorMode pictureUrl={props.mentee.pictureUrl} size={"m"}/>
        </Col>
        <Col>
          <h4>{props.mentee.firstName}</h4>
        </Col>
      </Row>
      <Row>
        <Col>
        </Col>
        <Col>
          {props.mentee.relationship ? <span>{props.mentee.relationship.mentor.firstName}</span> : <span>No Mentor</span>}
        </Col>
      </Row>
    </Container> :
    <Image src={"https://media.giphy.com/media/6uGhT1O4sxpi8/giphy.gif"}/>;
};

export default MenteeAdminProfile;
