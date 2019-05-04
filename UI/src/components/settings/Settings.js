import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import MentorSettings from './MentorSettings';
import MenteeSettings from './MenteeSettings';
import * as ReactGA from 'react-ga';
import { connect } from 'react-redux';
import {
  changeMenteeStatus,
  changeMentorStatus,
  removePictureToCrop, saveSettings, sendEmailConfirmationAgain,
  storePictureCropped,
  storePictureToCrop,
  togglePicturePicker,
  updateUser
} from '../../actions/actionCreator';

class Settings extends Component {

  componentDidMount() {
    ReactGA.pageview("/settings");
  }

  render() {
    return this.props.user ?
      <Container>
        <Row>
          <Col>
            <h2>
              Edit Your Profile
            </h2>
          </Col>
        </Row>
        <div>
          {this.props.user.type === "mentor" ? <MentorSettings {...this.props} /> : <MenteeSettings {...this.props}/>}
        </div>
      </Container> : <Redirect to={"/login"}/>;
  }

}

export default connect(({ settings, user }) => {
  return { settings, user };
}, dispatch => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    togglePicturePicker: () => dispatch(togglePicturePicker()),
    storePictureToCrop: (pictureToCrop) => dispatch(storePictureToCrop(pictureToCrop)),
    removePictureToCrop: () => dispatch(removePictureToCrop()),
    storePictureCropped: (pictureCropped) => dispatch(storePictureCropped(pictureCropped)),
    saveSettings: (settings) => dispatch(saveSettings(settings)),
    sendEmailConfirmationAgain: (settings) => dispatch(sendEmailConfirmationAgain(settings)),
    changeMentorStatus: (status, properties) => dispatch(changeMentorStatus(status, properties)),
    changeMenteeStatus: (status, properties) => dispatch(changeMenteeStatus(status, properties))
  };
})(Settings);
