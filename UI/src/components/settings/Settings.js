import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import MentorSettings from "./MentorSettings";
import MenteeSettings from "./MenteeSettings";
import * as api from "../../api";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.saveChanges = this.saveChanges.bind(this);
  }

  saveChanges(values) {
    const formData = new FormData();
    const {pictureCropped} = this.props.settings;
    if (pictureCropped) formData.append("file", pictureCropped);
    formData.append("data", JSON.stringify(values));
    return api.postForm("/api/users/edit", formData)
  }

  render() {
    return this.props.user ? <div>
      <Container>
        <Row>
          <Col>
            <h2>
              Edit Your Profile
            </h2>
          </Col>
        </Row>
        <div>
          {this.props.user.type === "mentor" ? <MentorSettings {...this.props} saveChanges={this.saveChanges} /> : <MenteeSettings/>}
        </div>
      </Container>
    </div> : <Redirect to={"/login"}/>;
  }

}

export default Settings;
