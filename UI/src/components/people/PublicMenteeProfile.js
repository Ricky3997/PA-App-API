import React, { Component } from "react";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ReactLoading from "react-loading";

class PublicMenteeProfile extends Component {

  componentDidMount() {
    if(this.props.publicProfile.profile === null) this.props.getMenteeById(this.props.match.params.id);
  }

  render() {
    return (
      <Container style={{ marginBottom: "10px" }}>
        <Breadcrumb>
          <LinkContainer to={"/"}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active href="#">{`${this.props.match.params.id}`}</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col>
            <br/>
            {this.props.publicProfile.profile === null ? <ReactLoading type={"spin"} color={"#111111"} height={64} width={64}/> : (
              this.props.publicProfile.profile === undefined ? 'NOT FOUND' : 'FOUND'
            )}
          </Col>
        </Row>
      </Container>
    );
  }
};

export default PublicMenteeProfile;
