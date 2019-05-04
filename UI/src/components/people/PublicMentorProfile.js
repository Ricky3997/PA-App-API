import React, { Component } from 'react';
import { Breadcrumb, Col, Container, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ReactLoading from 'react-loading';
import NotFound from '../various/NotFound';
import MentorProfileDetails from './MentorProfileDetails';
import { connect } from 'react-redux';
import { getMentorById } from '../../actions/actionCreator';

class PublicMentorProfile extends Component {

  componentDidMount() {
    if (this.props.publicProfile.profile === null) this.props.getMentorById(this.props.match.params.id);
  }

  render() {
    return (
      <Container style={{ marginBottom: "10px" }}>
        <Breadcrumb>
          <LinkContainer to={"/"}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active href="#">{this.props.publicProfile.profile === null ?
            <ReactLoading type={"spin"} color={"#111111"} height={24} width={24}/> : (
              this.props.publicProfile.profile === undefined ? "Not Found" : this.props.publicProfile.profile.firstName
            )}</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col>
            <br/>
            {this.props.publicProfile.profile === null ?
              <ReactLoading type={"spin"} color={"#111111"} height={64} width={64}/> : (
                this.props.publicProfile.profile === undefined ? <NotFound>
                  <h5>Unfortunately we couldn't find that! <span role={"img"} aria-labelledby={"sick"}>🤒</span></h5>
                </NotFound> : <MentorProfileDetails {...this.props.publicProfile.profile} mentorId={this.props.match.params.id}
                                                    user={this.props.user}/>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
};

export default connect(
  ({ publicProfile, user }) => {
    return { publicProfile, user };
  }, dispatch => {
    return {
      getMentorById: (id) => dispatch(getMentorById(id))
    };
  })(PublicMentorProfile);
