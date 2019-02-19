import React from "react";
import { Col, Image, Row, Breadcrumb, Container } from "react-bootstrap";
import { Icon } from "react-fa";
import ProfileIcon from "../../various/ProfileIcon";
import { LinkContainer } from "react-router-bootstrap";
import MentorAdminProfile from "./MentorAdminProfile";
import MenteeAdminProfile from "./MenteeAdminProfile";

const RelationshipAdminDetail = (props) => {

  return props.relationship ? <Container>
    <Row>
      <Breadcrumb>
        <LinkContainer to={"/admin/dashboard"}>
          <Breadcrumb.Item componentClass="div">Database</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active href="#">{`${props.relationship.mentor.firstName} & ${props.relationship.mentee.firstName}`}</Breadcrumb.Item>
      </Breadcrumb>
    </Row>
      <Row>
        <Col>
          <h4>Mentor</h4>
          <MentorAdminProfile mentor={props.relationship.mentor}/>
        </Col>
        <Col>
          <h4>Mentee</h4>
          <MenteeAdminProfile mentee={props.relationship.mentee}/>
        </Col>
      </Row>
      <Row>
        Relationship Detail
      </Row>
    </Container> :
    <Image src={"https://media.giphy.com/media/6uGhT1O4sxpi8/giphy.gif"}/>;
};

export default RelationshipAdminDetail;
