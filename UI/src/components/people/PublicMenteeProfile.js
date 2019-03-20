import React, { Component } from "react";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class PublicMenteeProfile extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <Container style={{ marginBottom: "10px" }}>
        <Breadcrumb>
          <LinkContainer to={"/"}>
            <Breadcrumb.Item componentClass="div">Home</Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active href="#">{`${this.props.match.params.id}`}</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col>
            Hello world
            <br/>
            ID: {this.props.match.params.id}
          </Col>
        </Row>
      </Container>
    );
  }
};

export default PublicMenteeProfile;
