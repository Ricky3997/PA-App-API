import React from "react";
import { Col, Image, Row, Breadcrumb, Container } from "react-bootstrap";
import { Icon } from "react-fa";
import ProfileIcon from "../../various/ProfileIcon";
import { LinkContainer } from "react-router-bootstrap";

const MentorAdminProfile = (props) => {

  const statusToIcon = () => {
    if (props.mentor.status === "notYetRequested") return <Icon name={`fas fa-newspaper-o`} style={{ color: "#03619b" }}/>;
    else if (props.mentor.status === "approved") return <Icon name={`fas fa-check-circle`} style={{ color: "#289b00" }}/>;
    else if (props.mentor.status === "requested") return <Icon name={`fas fa-hourglass`} style={{ color: "#c69200" }}/>;
    else if (props.mentor.status === "rejected") return <Icon name={`fas fa-ban`} style={{ color: "#9b0014" }}/>;
    else return null;
  };

  return props.mentor ? <Container>
      {props.beadcrumbs ? <Row>
        < Breadcrumb>
          < LinkContainer to={"/admin/mentors/database"}>
            <Breadcrumb.Item componentClass="div">Database</Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active href="#">{props.mentor.firstName}</Breadcrumb.Item>
        </Breadcrumb>
      </Row> : null}
      <Row>
        <Col md={2}>
          <ProfileIcon mentorMode pictureUrl={props.mentor.pictureUrl} size={"m"}/>
        </Col>
        <Col>
          {statusToIcon()}
        </Col>
        <Col>
          <h4>{props.mentor.firstName}</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          {props.mentor.relationship.length > 0 ? props.mentor.relationship.map(r =>
            <span>{r.mentee.firstName}</span>) : "No Mentees"}
        </Col>
      </Row>
    </Container> :
    <Image src={"https://media.giphy.com/media/6uGhT1O4sxpi8/giphy.gif"}/>;
};

export default MentorAdminProfile;
